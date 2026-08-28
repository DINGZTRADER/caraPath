import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { writeMemberEntitlement } from "../../../../lib/google/firestore-admin";
import {
  retrieveStripeSubscription,
  updateStripeCustomerMetadata,
  type StripeCheckoutSession,
  type StripeSubscription
} from "../../../../lib/stripe/server";

export const runtime = "nodejs";

const SIGNATURE_TOLERANCE_SECONDS = 5 * 60;

type StripeEvent = {
  id: string;
  type: string;
  data: { object: Record<string, unknown> };
};

function webhookSecret() {
  const value = process.env.STRIPE_WEBHOOK_SECRET;
  if (!value) throw new Error("Stripe webhook signing secret is not configured.");
  return value;
}

function verifyStripeSignature(body: string, signatureHeader: string | null) {
  if (!signatureHeader) return false;
  const parts = signatureHeader.split(",").map((part) => part.trim());
  const timestamp = parts.find((part) => part.startsWith("t="))?.slice(2);
  const signatures = parts.filter((part) => part.startsWith("v1=")).map((part) => part.slice(3));
  if (!timestamp || signatures.length === 0) return false;

  const timestampNumber = Number(timestamp);
  if (!Number.isFinite(timestampNumber) || Math.abs(Date.now() / 1000 - timestampNumber) > SIGNATURE_TOLERANCE_SECONDS) return false;

  const expected = createHmac("sha256", webhookSecret()).update(`${timestamp}.${body}`, "utf8").digest("hex");
  const expectedBuffer = Buffer.from(expected, "hex");
  return signatures.some((signature) => {
    if (!/^[a-f0-9]{64}$/i.test(signature)) return false;
    const actual = Buffer.from(signature, "hex");
    return actual.length === expectedBuffer.length && timingSafeEqual(actual, expectedBuffer);
  });
}

async function syncSubscription(subscription: StripeSubscription, fallbackUid?: string | null) {
  const uid = subscription.metadata?.firebase_uid || fallbackUid || null;
  if (!uid) throw new Error(`Stripe subscription ${subscription.id} has no Firebase UID.`);

  const renewalAt = subscription.current_period_end ? new Date(subscription.current_period_end * 1000) : null;

  if (subscription.status === "past_due") {
    // Stripe Smart Retries remains authoritative during recovery; do not revoke access on the first failed payment.
    return;
  }

  if (subscription.status === "active" || subscription.status === "trialing") {
    await writeMemberEntitlement(uid, {
      status: subscription.status === "trialing" ? "trial" : "active",
      renewalAt,
      stripeCustomerId: subscription.customer,
      stripeSubscriptionId: subscription.id
    });
    return;
  }

  if (["canceled", "unpaid", "incomplete_expired"].includes(subscription.status)) {
    await writeMemberEntitlement(uid, {
      status: "expired",
      renewalAt,
      stripeCustomerId: subscription.customer,
      stripeSubscriptionId: subscription.id
    });
  }
}

function stringField(object: Record<string, unknown>, name: string) {
  const value = object[name];
  return typeof value === "string" ? value : null;
}

export async function POST(request: Request) {
  const body = await request.text();
  let signatureValid = false;
  try {
    signatureValid = verifyStripeSignature(body, request.headers.get("stripe-signature"));
  } catch {
    signatureValid = false;
  }
  if (!signatureValid) return NextResponse.json({ error: "Invalid Stripe signature." }, { status: 400 });

  let event: StripeEvent;
  try {
    event = JSON.parse(body) as StripeEvent;
  } catch {
    return NextResponse.json({ error: "Invalid webhook payload." }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as unknown as StripeCheckoutSession;
      const uid = session.client_reference_id || session.metadata?.firebase_uid || null;
      if (session.subscription) {
        const subscription = await retrieveStripeSubscription(session.subscription);
        if (session.customer && uid) await updateStripeCustomerMetadata(session.customer, { firebase_uid: uid });
        await syncSubscription(subscription, uid);
      }
    } else if (["customer.subscription.created", "customer.subscription.updated", "customer.subscription.deleted"].includes(event.type)) {
      await syncSubscription(event.data.object as unknown as StripeSubscription);
    } else if (event.type === "invoice.paid") {
      const subscriptionId = stringField(event.data.object, "subscription");
      if (subscriptionId) await syncSubscription(await retrieveStripeSubscription(subscriptionId));
    } else if (event.type === "invoice.payment_failed") {
      // Access is not revoked here. Stripe Smart Retries and the later subscription status decide the final entitlement state.
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook entitlement sync failed", event.id, event.type, error);
    return NextResponse.json({ error: "Webhook processing failed." }, { status: 500 });
  }
}
