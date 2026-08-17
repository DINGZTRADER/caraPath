import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyFirebaseIdToken } from "./token";

export const MEMBER_COOKIE = "carapath_member_token";

export async function getMemberSession() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(MEMBER_COOKIE)?.value;
    if (!token) return null;
    const claims = await verifyFirebaseIdToken(token);
    return {
      uid: String(claims.sub),
      email: typeof claims.email === "string" ? claims.email : null,
      name: typeof claims.name === "string" ? claims.name : null
    };
  } catch {
    return null;
  }
}

export async function requireMember() {
  const session = await getMemberSession();
  if (!session) redirect("/sign-in?redirect_url=/members");
  return session;
}
