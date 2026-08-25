import { NextResponse } from "next/server";
import { createFreeResourceLead } from "../../../lib/firebase/admin-rest";

export const runtime = "nodejs";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const requestOrigin = new URL(request.url).origin;
  if (origin && origin !== requestOrigin) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!payload || typeof payload !== "object") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const body = payload as Record<string, unknown>;
  const honeypot = typeof body.website === "string" ? body.website.trim() : "";
  if (honeypot) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!email || email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const marketingOptIn = body.marketingOptIn === true;

  try {
    await createFreeResourceLead({
      email,
      marketingOptIn,
      guide: "care-assessment-starter",
      source: "/free-care-assessment-guide",
    });
  } catch (error) {
    console.error("Free guide lead capture failed", error instanceof Error ? error.message : "unknown error");
    return NextResponse.json({ error: "The guide cannot be unlocked right now. Please try again shortly." }, { status: 503 });
  }

  return NextResponse.json({
    ok: true,
    downloadUrl: "/free-downloads/care-assessment-starter",
  });
}
