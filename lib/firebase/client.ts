import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBB8DvmSPMLs9Ri2H6nTTFIlqKCUlHUlNc",
  authDomain: "carapath-73955.firebaseapp.com",
  projectId: "carapath-73955",
  appId: "1:630001259769:web:c0d0414e43dbe24196be28"
};

export function getFirebaseClientAuth() {
  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  return getAuth(app);
}
