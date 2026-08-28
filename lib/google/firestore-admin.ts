import "server-only";

import { getVercelOidcToken } from "@vercel/oidc";
import { ExternalAccountClient } from "google-auth-library";

const FIREBASE_PROJECT_ID = "carapath-73955";

type EntitlementWrite = {
  status: "active" | "trial" | "cancelled" | "expired";
  role?: "member" | "publisher" | "moderator" | "admin";
  renewalAt?: Date | null;
  stripeCustomerId?: string | null;
  stripeSubscriptionId?: string | null;
};

function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not configured.`);
  return value;
}

async function googleAccessToken() {
  const projectNumber = requiredEnv("GCP_PROJECT_NUMBER");
  const poolId = requiredEnv("GCP_WORKLOAD_IDENTITY_POOL_ID");
  const providerId = requiredEnv("GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID");
  const serviceAccountEmail = requiredEnv("GCP_SERVICE_ACCOUNT_EMAIL");
  const audience = `https://iam.googleapis.com/projects/${projectNumber}/locations/global/workloadIdentityPools/${poolId}/providers/${providerId}`;

  const authClient = ExternalAccountClient.fromJSON({
    type: "external_account",
    audience,
    subject_token_type: "urn:ietf:params:oauth:token-type:jwt",
    token_url: "https://sts.googleapis.com/v1/token",
    service_account_impersonation_url: `https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/${serviceAccountEmail}:generateAccessToken`,
    subject_token_supplier: {
      getSubjectToken: () => getVercelOidcToken({ audience })
    }
  });

  if (!authClient) throw new Error("Google workload identity client could not be created.");
  const result = await authClient.getAccessToken();
  const token = typeof result === "string" ? result : result?.token;
  if (!token) throw new Error("Google workload identity did not return an access token.");
  return token;
}

function firestoreFields(input: EntitlementWrite) {
  const fields: Record<string, unknown> = {
    status: { stringValue: input.status },
    role: { stringValue: input.role ?? "member" },
    source: { stringValue: "stripe" },
    updatedAt: { timestampValue: new Date().toISOString() }
  };
  if (input.renewalAt) fields.renewalAt = { timestampValue: input.renewalAt.toISOString() };
  if (input.stripeCustomerId) fields.stripeCustomerId = { stringValue: input.stripeCustomerId };
  if (input.stripeSubscriptionId) fields.stripeSubscriptionId = { stringValue: input.stripeSubscriptionId };
  return fields;
}

export async function writeMemberEntitlement(uid: string, input: EntitlementWrite) {
  const token = await googleAccessToken();
  const url = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/memberEntitlements/${encodeURIComponent(uid)}`;
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ fields: firestoreFields(input) }),
    cache: "no-store"
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Firestore entitlement write failed with ${response.status}: ${detail.slice(0, 300)}`);
  }
}
