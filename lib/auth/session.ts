import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { verifyFirebaseIdToken, type FirebaseTokenPayload } from "../firebase/verify-token";
import { entitlementAllowsAccess, getMemberEntitlement, type MemberEntitlement } from "./entitlements";

export const SESSION_COOKIE_NAME = "the_clara_path_session";
export const SESSION_DURATION_SECONDS = 55 * 60;

const GRANDFATHERED_MEMBER_EMAILS = new Set([
  "wachaexperience@gmail.com",
  "victoriaolok@gmail.com"
]);

export type SignedInSession = FirebaseTokenPayload & { idToken: string };

export type MemberSession = FirebaseTokenPayload & {
  entitlement: MemberEntitlement | null;
  accessSource: "entitlement" | "grandfathered";
};

export async function resolveMemberAccess(session: FirebaseTokenPayload, idToken: string): Promise<MemberSession | null> {
  if (!session.email_verified || !session.email) return null;

  const entitlement = await getMemberEntitlement(session.sub, idToken).catch(() => null);
  if (entitlementAllowsAccess(entitlement)) {
    return { ...session, entitlement, accessSource: "entitlement" };
  }

  if (GRANDFATHERED_MEMBER_EMAILS.has(session.email.toLowerCase())) {
    return { ...session, entitlement, accessSource: "grandfathered" };
  }

  return null;
}

export const getSignedInSession = cache(async (): Promise<SignedInSession | null> => {
  const idToken = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
  if (!idToken) return null;

  try {
    const session = await verifyFirebaseIdToken(idToken);
    if (!session.email_verified || !session.email) return null;
    return { ...session, idToken };
  } catch {
    return null;
  }
});

export const getMemberSession = cache(async (): Promise<MemberSession | null> => {
  const signedIn = await getSignedInSession();
  if (!signedIn) return null;
  const { idToken, ...session } = signedIn;
  return resolveMemberAccess(session, idToken);
});

export async function requireSignedIn() {
  const session = await getSignedInSession();
  if (!session) redirect("/sign-in?redirect_url=/join");
  return session;
}

export async function requireMember() {
  const session = await getMemberSession();
  if (!session) redirect("/sign-in?redirect_url=/members");
  return session;
}
