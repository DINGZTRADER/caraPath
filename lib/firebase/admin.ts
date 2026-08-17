import "server-only";

import type { ServiceAccount } from "firebase-admin/app";

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

export async function getFirebaseAdminAuth() {
  const { cert, getApp, getApps, initializeApp } = await import("firebase-admin/app");
  const { getAuth } = await import("firebase-admin/auth");
  const app = getApps().length
    ? getApp()
    : initializeApp({ credential: cert(getServiceAccount()) });

  return getAuth(app);
}
