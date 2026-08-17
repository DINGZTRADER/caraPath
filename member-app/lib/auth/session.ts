import { cookies } from "next/headers";
import { getFirebaseAdminAuth } from "../firebase/admin";

export async function getMemberSession() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("carapath_session")?.value;
    if (!session) return null;
    const decoded = await getFirebaseAdminAuth().verifySessionCookie(session, true);
    return { uid: decoded.uid, email: decoded.email ?? null };
  } catch {
    return null;
  }
}
