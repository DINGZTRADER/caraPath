import "server-only";

import { SignJWT, importPKCS8 } from "jose";

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const DATASTORE_SCOPE = "https://www.googleapis.com/auth/datastore";

type ServiceAccount = {
  client_email: string;
  private_key: string;
  project_id: string;
};

let cachedAccessToken: { token: string; expiresAt: number } | null = null;

function serviceAccount(): ServiceAccount {
  const raw = process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON;
  if (!raw) throw new Error("Firebase admin service account is not configured.");

  const parsed = JSON.parse(raw) as Partial<ServiceAccount>;
  if (!parsed.client_email || !parsed.private_key || !parsed.project_id) {
    throw new Error("Firebase admin service account is incomplete.");
  }

  return parsed as ServiceAccount;
}

async function getAccessToken() {
  if (cachedAccessToken && cachedAccessToken.expiresAt - Date.now() > 60_000) {
    return cachedAccessToken.token;
  }

  const account = serviceAccount();
  const now = Math.floor(Date.now() / 1000);
  const key = await importPKCS8(account.private_key, "RS256");
  const assertion = await new SignJWT({ scope: DATASTORE_SCOPE })
    .setProtectedHeader({ alg: "RS256", typ: "JWT" })
    .setIssuer(account.client_email)
    .setSubject(account.client_email)
    .setAudience(TOKEN_URL)
    .setIssuedAt(now)
    .setExpirationTime(now + 3600)
    .sign(key);

  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
    cache: "no-store",
  });

  if (!response.ok) throw new Error(`Firebase admin token request failed with ${response.status}.`);
  const payload = (await response.json()) as { access_token?: string; expires_in?: number };
  if (!payload.access_token) throw new Error("Firebase admin token response was incomplete.");

  cachedAccessToken = {
    token: payload.access_token,
    expiresAt: Date.now() + Math.max(300, payload.expires_in ?? 3600) * 1000,
  };
  return cachedAccessToken.token;
}

export async function createFreeResourceLead(input: {
  email: string;
  marketingOptIn: boolean;
  guide: string;
  source: string;
}) {
  const account = serviceAccount();
  const accessToken = await getAccessToken();
  const documentId = crypto.randomUUID();
  const url = `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(account.project_id)}/databases/(default)/documents/freeResourceLeads?documentId=${encodeURIComponent(documentId)}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fields: {
        email: { stringValue: input.email },
        marketingOptIn: { booleanValue: input.marketingOptIn },
        guide: { stringValue: input.guide },
        source: { stringValue: input.source },
        createdAt: { timestampValue: new Date().toISOString() },
        privacyVersion: { stringValue: "2026-08-25" },
      },
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Lead capture failed with ${response.status}${body ? `: ${body.slice(0, 180)}` : ""}`);
  }

  return documentId;
}
