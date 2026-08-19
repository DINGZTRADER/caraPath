import "server-only";

import { decodeProtectedHeader, importX509, jwtVerify } from "jose";

const FIREBASE_PROJECT_ID = "carapath-73955";
const FIREBASE_ISSUER = `https://securetoken.google.com/${FIREBASE_PROJECT_ID}`;
const CERT_URL = "https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com";

export type FirebaseTokenPayload = {
  sub: string;
  email?: string;
  email_verified?: boolean;
  auth_time?: number;
  name?: string;
};

export async function verifyFirebaseIdToken(idToken: string): Promise<FirebaseTokenPayload> {
  const header = decodeProtectedHeader(idToken);
  if (header.alg !== "RS256" || !header.kid) throw new Error("Invalid Firebase token header.");

  const response = await fetch(CERT_URL, { cache: "no-store" });
  if (!response.ok) throw new Error("Unable to retrieve Firebase signing certificates.");

  const certificates = (await response.json()) as Record<string, string>;
  const certificate = certificates[header.kid];
  if (!certificate) throw new Error("Unknown Firebase signing key.");

  const key = await importX509(certificate, "RS256");
  const { payload } = await jwtVerify(idToken, key, {
    algorithms: ["RS256"],
    audience: FIREBASE_PROJECT_ID,
    issuer: FIREBASE_ISSUER
  });

  if (typeof payload.sub !== "string") throw new Error("Firebase token has no subject.");

  return {
    sub: payload.sub,
    email: typeof payload.email === "string" ? payload.email : undefined,
    email_verified: payload.email_verified === true,
    auth_time: typeof payload.auth_time === "number" ? payload.auth_time : undefined,
    name: typeof payload.name === "string" ? payload.name : undefined
  };
}
