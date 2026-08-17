import { NextResponse } from "next/server";
import { getFirebaseAdminAuth } from "../../../../lib/firebase/admin";

const SESSION_COOKIE = "carapath_session";
const SESSION_MAX_AGE_MS = 1000 * 60 * 60 * 24 * 5;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { idToken?: string };
    if (!body.idToken) return NextResponse.json({ error: "Missing sign-in token." }, { status: 400 });

    const auth = getFirebaseAdminAuth();
    const decoded = await auth.verifyIdToken(body.idToken, true);
    const allowed = (process.env.FIREBASE_MEMBER_EMAILS ?? "")
      .split(",")
      .map((value) => value.trim().toLowerCase())
      .filter(Boolean);
    const email = decoded.email?.toLowerCase();

    if (!email || (allowed.length > 0 && !allowed.includes(email))) {
      return NextResponse.json({ error: "This email is not registered for Member Area access." }, { status: 403 });
    }

    const sessionCookie = await auth.createSessionCookie(body.idToken, { expiresIn: SESSION_MAX_AGE_MS });
    const response = NextResponse.json({ ok: true });
    response.cookies.set(SESSION_COOKIE, sessionCookie, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_MAX_AGE_MS / 1000
    });
    return response;
  } catch (error) {
    const message = error instanceof Error && error.message.includes("not configured")
      ? "Member authentication is finishing its secure server configuration."
      : "We could not complete your sign-in.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
