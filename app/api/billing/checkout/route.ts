import { NextResponse } from "next/server";
import { getMemberEntitlement } from "../../../../lib/auth/entitlements";
import { getMemberSession, getSignedInSession } from "../../../../lib/auth/session";
import { proposedCommercialSettings } from "../../../../lib/commercial-readiness";
import { CARERS_CIRCLE_PRICE_ID, stripePostForm, type StripeCheckoutSession } from "../../../../lib/stripe/server";

export const runtime = "nodejs";

function memberOrigin(request: Request) {
  const url = new URL(request.url);
  return `${url.protocol}//${url.host}`;
}

export async function POST(request: Request) {
  if (!proposedCommercialSettings.membershipSalesEnabled) {
    return NextResponse.json(
      { error: "Carer’s Circle membership terms are being finalised. Checkout is not currently available." },
      { status: 503 },
    );
  }

  const signedIn = await getSignedInSession();
  if (!signedIn) return NextResponse.redirect(new URL("/sign-in?redirect_url=/join", request.url), 303);

  const existingMember = await getMemberSession();
  if (existingMember) return NextResponse.redirect(new URL("/members", request.url), 303);

  const entitlement = await getMemberEntitlement(signedIn.sub, signedIn.idToken).catch(() => null);
  const origin = memberOrigin(request);
  const form = new URLSearchParams();
  form.set("mode", "subscription");
  form.set("line_items[0][price]", CARERS_CIRCLE_PRICE_ID);
  form.set("line_items[0][quantity]", "1");
  form.set("client_reference_id", signedIn.sub);
  form.set("success_url", `${origin}/join?checkout=success`);
  form.set("cancel_url", `${origin}/join?checkout=cancelled`);
  form.set("allow_promotion_codes", "true");
  form.set("metadata[firebase_uid]", signedIn.sub);
  form.set("subscription_data[metadata][firebase_uid]", signedIn.sub);

  if (entitlement?.stripeCustomerId) form.set("customer", entitlement.stripeCustomerId);
  else if (signedIn.email) form.set("customer_email", signedIn.email);

  try {
    const session = await stripePostForm<StripeCheckoutSession>("/v1/checkout/sessions", form);
    if (!session.url) throw new Error("Stripe Checkout did not return a redirect URL.");
    return NextResponse.redirect(session.url, 303);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Checkout could not be started.";
    return NextResponse.json({ error: message }, { status: 503 });
  }
}
