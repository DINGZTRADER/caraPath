import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { verifyFirebaseIdToken, type FirebaseTokenPayload } from "../firebase/verify-token";

export const SESSION_COOKIE_NAME = "the_clara_path_session";
export const SESSION_DURATION_SECONDS = 55 * 60;

function allowedEmails() {
  const configured = (process.env.FIREBASE_MEMBER_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

  return new Set(configured.length ? configured : ["wachaexperience@gmail.com"]);
}

export function isAllowedMember(email: string | undefined) {
  return Boolean(email && allowedEmails().has(email.toLowerCase()));
}

export const getMemberSession = cache(async (): Promise<FirebaseTokenPayload | null> => {
  const token = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const session = await verifyFirebaseIdToken(token);
    return session.email_verified && isAllowedMember(session.email) ? session : null;
  } catch {
    return null;
  }
});

export async function requireMember() {
  const session = await getMemberSession();
  if (!session) redirect("/sign-in?redirect_url=/members");
  return session;
}
