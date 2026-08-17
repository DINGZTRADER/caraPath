import { decodeProtectedHeader, importX509, jwtVerify, type JWTPayload } from "jose";

const PROJECT_ID = "carapath-73955";
const CERT_URL = "https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com";

type CertMap = Record<string, string>;
let cachedCerts: CertMap | null = null;
let certsExpireAt = 0;

async function getCerts() {
  if (cachedCerts && Date.now() < certsExpireAt) return cachedCerts;

  const response = await fetch(CERT_URL, { cache: "no-store" });
  if (!response.ok) throw new Error("Unable to load Firebase signing certificates.");
  const certs = (await response.json()) as CertMap;
  const cacheControl = response.headers.get("cache-control") ?? "";
  const maxAge = Number(cacheControl.match(/max-age=(\d+)/)?.[1] ?? 3600);
  cachedCerts = certs;
  certsExpireAt = Date.now() + Math.max(60, maxAge) * 1000;
  return certs;
}

export async function verifyFirebaseIdToken(token: string): Promise<JWTPayload> {
  const header = decodeProtectedHeader(token);
  if (header.alg !== "RS256" || !header.kid) throw new Error("Invalid Firebase token header.");

  const certs = await getCerts();
  const certificate = certs[header.kid];
  if (!certificate) throw new Error("Unknown Firebase signing key.");

  const key = await importX509(certificate, "RS256");
  const { payload } = await jwtVerify(token, key, {
    algorithms: ["RS256"],
    audience: PROJECT_ID,
    issuer: `https://securetoken.google.com/${PROJECT_ID}`
  });

  if (!payload.sub) throw new Error("Firebase token is missing a subject.");
  const authTime = Number(payload.auth_time ?? 0);
  if (!authTime || authTime > Math.floor(Date.now() / 1000)) throw new Error("Invalid Firebase authentication time.");
  return payload;
}
