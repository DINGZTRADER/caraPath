import "server-only";

const FIREBASE_PROJECT_ID = "carapath-73955";

export type MembershipStatus = "active" | "trial" | "cancelled" | "expired";
export type MembershipRole = "member" | "publisher" | "moderator" | "admin";

export type MemberEntitlement = {
  status: MembershipStatus;
  role: MembershipRole;
  renewalAt?: Date | null;
};

function stringValue(field: unknown) {
  if (!field || typeof field !== "object") return undefined;
  const value = (field as { stringValue?: unknown }).stringValue;
  return typeof value === "string" ? value : undefined;
}

function timestampValue(field: unknown) {
  if (!field || typeof field !== "object") return null;
  const value = (field as { timestampValue?: unknown }).timestampValue;
  return typeof value === "string" ? new Date(value) : null;
}

export async function getMemberEntitlement(uid: string, idToken: string): Promise<MemberEntitlement | null> {
  const url = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/memberEntitlements/${encodeURIComponent(uid)}`;
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${idToken}` },
    cache: "no-store"
  });

  if (response.status === 404 || response.status === 403) return null;
  if (!response.ok) throw new Error(`Entitlement lookup failed with ${response.status}.`);

  const payload = (await response.json()) as { fields?: Record<string, unknown> };
  const status = stringValue(payload.fields?.status) as MembershipStatus | undefined;
  const role = stringValue(payload.fields?.role) as MembershipRole | undefined;

  if (!status || !["active", "trial", "cancelled", "expired"].includes(status)) return null;
  if (!role || !["member", "publisher", "moderator", "admin"].includes(role)) return null;

  return {
    status,
    role,
    renewalAt: timestampValue(payload.fields?.renewalAt)
  };
}

export function entitlementAllowsAccess(entitlement: MemberEntitlement | null) {
  if (!entitlement) return false;
  if (entitlement.status === "active") return true;
  if (entitlement.status !== "trial") return false;
  return !entitlement.renewalAt || entitlement.renewalAt.getTime() > Date.now();
}
