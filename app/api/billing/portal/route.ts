import { NextResponse } from "next/server";
import { getMemberSession } from "../../../../lib/auth/session";
import { stripePostForm } from "../../../../lib/stripe/server";

export const runtime = "nodejs";

type PortalSession = { url?: string | null };

export async function POST(request: Request) {
  const member = await getMemberSession();
  if (!member) return NextResponse.redirect(new URL("/sign-in?redirect_url=/members", request.url), 303);

  const customerId = member.entitlement?.stripeCustomerId;
  if (!customerId) {
    return NextResponse.json({ error: "No Stripe billing profile is attached to this membership yet." }, { status: 409 });
  }

  const url = new URL(request.url);
  const form = new URLSearchParams();
  form.set("customer", customerId);
  form.set("return_url", `${url.protocol}//${url.host}/members`);

  try {
    const portal = await stripePostForm<PortalSession>("/v1/billing_portal/sessions", form);
    if (!portal.url) throw new Error("Stripe did not return a Customer Portal URL.");
    return NextResponse.redirect(portal.url, 303);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Billing management could not be opened.";
    return NextResponse.json({ error: message }, { status: 503 });
  }
}
