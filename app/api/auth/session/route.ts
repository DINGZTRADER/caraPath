import { NextResponse } from "next/server";
import { MEMBER_COOKIE } from "../../../../lib/auth/session";
import { verifyFirebaseIdToken } from "../../../../lib/auth/token";

const TOKEN_MAX_AGE_SECONDS = 55 * 60;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { idToken?: string };
    if (!body.idToken) return NextResponse.json({ error: "Missing sign-in token." }, { status: 400 });

    const claims = await verifyFirebaseIdToken(body.idToken);
    const email = typeof claims.email === "string" ? claims.email.toLowerCase() : "";
    const allowed = (process.env.FIREBASE_MEMBER_EMAILS ?? "")
      .split(",")
      .map((value) => value.trim().toLowerCase())
      .filter(Boolean);

    if (!email || (allowed.length > 0 && !allowed.includes(email))) {
      return NextResponse.json({ error: "This email is not registered for Member Area access." }, { status: 403 });
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set(MEMBER_COOKIE, body.idToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: TOKEN_MAX_AGE_SECONDS
    });
    return response;
  } catch {
    return NextResponse.json({ error: "We could not complete your sign-in." }, { status: 401 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(MEMBER_COOKIE, "", { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 0 });
  return response;
}
