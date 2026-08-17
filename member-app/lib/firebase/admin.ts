import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

export function getFirebaseAdminAuth() {
  const raw = process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON;
  if (!raw) throw new Error("Firebase Admin is not configured.");
  const serviceAccount = JSON.parse(raw);
  const app = getApps().length ? getApps()[0]! : initializeApp({ credential: cert(serviceAccount) });
  return getAuth(app);
}
