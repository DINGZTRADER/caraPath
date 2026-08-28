import "server-only";

export const CARERS_CIRCLE_PRICE_ID = "price_1U8QvEJpjvyGR5nProEB97UB";

export type StripeSubscription = {
  id: string;
  customer: string;
  status: string;
  cancel_at_period_end?: boolean;
  current_period_end?: number;
  metadata?: Record<string, string>;
};

export type StripeCheckoutSession = {
  id: string;
  url?: string | null;
  mode?: string;
  customer?: string | null;
  subscription?: string | null;
  client_reference_id?: string | null;
  metadata?: Record<string, string>;
};

function stripeSecret() {
  const value = process.env.STRIPE_SECRET_KEY;
  if (!value) throw new Error("Stripe billing is not configured on this deployment.");
  return value;
}

async function stripeRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`https://api.stripe.com${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${stripeSecret()}`,
      ...(init?.headers ?? {})
    },
    cache: "no-store"
  });

  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    const message = payload?.error?.message ?? `Stripe request failed with ${response.status}.`;
    throw new Error(message);
  }
  return payload as T;
}

export async function stripePostForm<T>(path: string, form: URLSearchParams): Promise<T> {
  return stripeRequest<T>(path, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: form.toString()
  });
}

export async function retrieveStripeSubscription(subscriptionId: string) {
  return stripeRequest<StripeSubscription>(`/v1/subscriptions/${encodeURIComponent(subscriptionId)}`);
}

export async function updateStripeCustomerMetadata(customerId: string, metadata: Record<string, string>) {
  const form = new URLSearchParams();
  for (const [key, value] of Object.entries(metadata)) form.set(`metadata[${key}]`, value);
  return stripePostForm(`/v1/customers/${encodeURIComponent(customerId)}`, form);
}
