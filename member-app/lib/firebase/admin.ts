import "server-only";

import { cert, getApp, getApps, initializeApp, type ServiceAccount } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

function getServiceAccount() {
  const rawServiceAccount = process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON;

  if (!rawServiceAccount) {
    throw new Error("Firebase server configuration is incomplete.");
  }

  try {
    return JSON.parse(rawServiceAccount) as ServiceAccount;
  } catch {
    throw new Error("Firebase server configuration is invalid.");
  }
}

export function getFirebaseAdminAuth() {
  const app = getApps().length
    ? getApp()
    : initializeApp({ credential: cert(getServiceAccount()) });

  return getAuth(app);
}
