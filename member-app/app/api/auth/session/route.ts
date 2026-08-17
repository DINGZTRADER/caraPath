import { NextResponse } from "next/server";
import {
  isAllowedMember,
  SESSION_COOKIE_NAME,
  SESSION_DURATION_MS
} from "../../../../lib/auth/session";
import { getFirebaseAdminAuth } from "../../../../lib/firebase/admin";

export const runtime = "nodejs";

function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  return origin === new URL(request.url).origin;
}

function sessionCookieOptions() {
  return {
    httpOnly: true,
    maxAge: SESSION_DURATION_MS / 1000,
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
    const auth = getFirebaseAdminAuth();
    const decodedToken = await auth.verifyIdToken(idToken);
    const signedInRecently = Date.now() - decodedToken.auth_time * 1000 < 5 * 60 * 1000;

    if (!signedInRecently || !decodedToken.email_verified || !isAllowedMember(decodedToken.email)) {
      return NextResponse.json({ error: "This email has not been invited to the Member Area." }, { status: 403 });
    }

    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn: SESSION_DURATION_MS
    });
    const response = NextResponse.json({ ok: true });
    response.cookies.set(SESSION_COOKIE_NAME, sessionCookie, sessionCookieOptions());
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
  response.cookies.set(SESSION_COOKIE_NAME, "", { ...sessionCookieOptions(), maxAge: 0 });
  return response;
}
