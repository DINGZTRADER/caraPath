import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "AIzaSyBB8DvmSPMLs9Ri2H6nTTFIlqKCUlHUlNc",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "carapath-73955.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "carapath-73955",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "1:630001259769:web:c0d0414e43dbe24196be28"
};

export function hasFirebaseClientConfig() {
  return Object.values(firebaseConfig).every(Boolean);
}

function getFirebaseClientApp() {
  if (!hasFirebaseClientConfig()) {
    throw new Error("Firebase web configuration is incomplete.");
  }
  return getApps().length ? getApp() : initializeApp(firebaseConfig);
}

export function getFirebaseClientAuth() {
  return getAuth(getFirebaseClientApp());
}

export function getFirebaseClientFirestore() {
  return getFirestore(getFirebaseClientApp());
}
