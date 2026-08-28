import type { Metadata } from "next";
import { getMemberSession, requireSignedIn } from "../../lib/auth/session";

export const metadata: Metadata = {
  title: "Join Carer’s Circle | The Clara Path",
  robots: { index: false, follow: false }
};

type Props = { searchParams: Promise<{ checkout?: string }> };

export default async function JoinPage({ searchParams }: Props) {
  const signedIn = await requireSignedIn();
  const existingMember = await getMemberSession();
  const { checkout } = await searchParams;

  return (
    <main className="member-main">
      <div className="container" style={{ maxWidth: 840 }}>
        <section className="member-hero">
          <p className="eyebrow">Carer’s Circle Membership</p>
          <h1>{existingMember ? "Your membership is active." : "Join Carer’s Circle for £15/month."}</h1>
          <p>Protected resources, practical preparation tools, private community discussions, official-source shortcuts, member prompts and an expanding Resource Vault for family carers navigating UK health and social care.</p>
        </section>

        {checkout === "cancelled" ? <div className="notice">Checkout was cancelled. No subscription was created.</div> : null}
        {checkout === "success" && !existingMember ? <div className="notice">Payment was received by Stripe. Your access is being activated securely; refresh this page shortly if the Member Area button has not appeared yet.</div> : null}

        <section className="resource-grid" aria-label="Membership details" style={{ marginTop: "2rem" }}>
          <article className="resource-card">
            <p className="eyebrow">Monthly membership</p>
            <h2>£15 per month</h2>
            <p>Charged securely by Stripe. No free trial. You can manage your payment method and cancellation through Stripe’s secure Customer Portal once your membership is active.</p>
          </article>
          <article className="resource-card">
            <p className="eyebrow">Included</p>
            <h2>Member-only support tools</h2>
            <p>Fillable downloads, assessment-preparation resources, community access, official-source references, practical prompts, events and an expanding set of member benefits.</p>
          </article>
        </section>

        <div className="notice" style={{ marginTop: "2rem" }}>
          <strong>Non-care service:</strong> The Clara Path provides administrative support, advocacy, evidence preparation and system navigation. We do not provide medical diagnosis, clinical treatment decisions, regulated personal care, legal representation or regulated financial advice.
        </div>

        <div className="hero-actions" style={{ marginTop: "2rem" }}>
          {existingMember ? (
            <a className="button button-primary" href="/members">Open Member Area</a>
          ) : (
            <form action="/api/billing/checkout" method="post">
              <button className="button button-primary" type="submit">Continue to secure £15/month checkout</button>
            </form>
          )}
          <a className="button button-secondary" href="https://www.theclarapath.org">Back to The Clara Path</a>
        </div>

        <p className="footer-note" style={{ marginTop: "2rem" }}>Signed in as {signedIn.email}. Membership access is activated only after Stripe confirms the subscription.</p>
      </div>
    </main>
  );
}
