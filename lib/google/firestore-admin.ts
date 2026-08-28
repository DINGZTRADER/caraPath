import "server-only";

import { getVercelOidcToken } from "@vercel/oidc";
import { ExternalAccountClient } from "google-auth-library";

const FIREBASE_PROJECT_ID = "carapath-73955";
const GCP_PROJECT_NUMBER = "630001259769";
const VALID_ROLES = new Set(["member", "publisher", "moderator", "admin"]);

type MembershipRole = "member" | "publisher" | "moderator" | "admin";

type EntitlementWrite = {
  status: "active" | "trial" | "cancelled" | "expired";
  role?: MembershipRole;
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
  const poolId = requiredEnv("GCP_WORKLOAD_IDENTITY_POOL_ID");
  const providerId = requiredEnv("GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID");
  const serviceAccountEmail = requiredEnv("GCP_SERVICE_ACCOUNT_EMAIL");
  const audience = `https://iam.googleapis.com/projects/${GCP_PROJECT_NUMBER}/locations/global/workloadIdentityPools/${poolId}/providers/${providerId}`;

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

function stringValue(field: unknown) {
  if (!field || typeof field !== "object") return undefined;
  const value = (field as { stringValue?: unknown }).stringValue;
  return typeof value === "string" ? value : undefined;
}

async function existingRole(url: string, token: string): Promise<MembershipRole | null> {
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store"
  });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Firestore entitlement read failed with ${response.status}.`);
  const payload = (await response.json()) as { fields?: Record<string, unknown> };
  const role = stringValue(payload.fields?.role);
  return role && VALID_ROLES.has(role) ? (role as MembershipRole) : null;
}

function firestoreFields(input: EntitlementWrite, role: MembershipRole) {
  const fields: Record<string, unknown> = {
    status: { stringValue: input.status },
    role: { stringValue: role },
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
  const role = input.role ?? (await existingRole(url, token)) ?? "member";

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ fields: firestoreFields(input, role) }),
    cache: "no-store"
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Firestore entitlement write failed with ${response.status}: ${detail.slice(0, 300)}`);
  }
}
