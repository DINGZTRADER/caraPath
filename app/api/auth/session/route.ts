import { NextResponse } from "next/server";
import { resolveMemberAccess, SESSION_COOKIE_NAME, SESSION_DURATION_SECONDS } from "../../../../lib/auth/session";
import { verifyFirebaseIdToken } from "../../../../lib/firebase/verify-token";

export const runtime = "nodejs";

function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  return origin === new URL(request.url).origin;
}

function cookieOptions() {
  return {
    httpOnly: true,
    maxAge: SESSION_DURATION_SECONDS,
    path: "/",
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production"
  };
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const idToken = body?.idToken;
  if (typeof idToken !== "string") {
    return NextResponse.json({ error: "Invalid sign-in request." }, { status: 400 });
  }

  try {
    const decoded = await verifyFirebaseIdToken(idToken);
    const signedInRecently = typeof decoded.auth_time === "number" && Date.now() / 1000 - decoded.auth_time < 5 * 60;
    if (!signedInRecently || !decoded.email_verified || !decoded.email) {
      return NextResponse.json({ error: "Please sign in again to continue securely." }, { status: 401 });
    }

    const memberAccess = await resolveMemberAccess(decoded, idToken);
    const response = NextResponse.json({ ok: true, hasMemberAccess: Boolean(memberAccess) });
    response.cookies.set(SESSION_COOKIE_NAME, idToken, cookieOptions());
    return response;
  } catch {
    return NextResponse.json({ error: "We could not complete your sign-in. Please try again." }, { status: 401 });
  }
}

export async function DELETE(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE_NAME, "", { ...cookieOptions(), maxAge: 0 });
  return response;
}
