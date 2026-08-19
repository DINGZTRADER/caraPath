import "server-only";

import type { DecodedIdToken } from "firebase-admin/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { getFirebaseAdminAuth } from "../firebase/admin";

export const SESSION_COOKIE_NAME = "the_clara_path_session";
export const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 5;

function allowedEmails() {
  return new Set(
    (process.env.FIREBASE_MEMBER_EMAILS ?? "")
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean)
  );
}

export function isAllowedMember(email: string | undefined) {
  if (!email) return false;
  return allowedEmails().has(email.toLowerCase());
}

export const getMemberSession = cache(async (): Promise<DecodedIdToken | null> => {
  const sessionCookie = (await cookies()).get(SESSION_COOKIE_NAME)?.value;

  if (!sessionCookie) return null;

  try {
    const auth = await getFirebaseAdminAuth();
    const session = await auth.verifySessionCookie(sessionCookie, true);
    return session.email_verified && isAllowedMember(session.email) ? session : null;
  } catch {
    return null;
  }
});

export async function requireMember() {
  const session = await getMemberSession();

  if (!session) {
    redirect("/sign-in?redirect_url=/members");
  }

  return session;
}
