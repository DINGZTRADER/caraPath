import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Carer’s Circle Community",
  robots: { index: false, follow: false }
};

export default function CommunityPage() {
  return (
    <main className="member-main">
      <div className="container">
        <header className="member-page-head">
          <p className="eyebrow">Private community</p>
          <h1>A quieter place for people who understand.</h1>
          <p className="lede">The Carer’s Circle community is being prepared as a private, low-cost space away from public social media where carers can share practical experience and support one another.</p>
        </header>

        <div className="resource-grid">
          <article className="resource-card">
            <span className="step-number">01</span>
            <h3>Ask practical questions</h3>
            <p>Share general questions about navigating assessments, forms, local services and everyday caring without posting private case information.</p>
          </article>
          <article className="resource-card">
            <span className="step-number">02</span>
            <h3>Exchange local knowledge</h3>
            <p>Members can compare general experiences of council processes, Direct Payments, respite routes and useful local resources.</p>
          </article>
          <article className="resource-card">
            <span className="step-number">03</span>
            <h3>Celebrate small wins</h3>
            <p>Caring is demanding. The Circle should also make room for progress, encouragement and the moments that make a difficult week easier.</p>
          </article>
          <article className="resource-card">
            <span className="step-number">04</span>
            <h3>Protect one another’s privacy</h3>
            <p>No screenshots, reposting or sharing another member’s story outside the community. Identifying records and case documents should never be posted.</p>
          </article>
        </div>

        <div className="notice" style={{ marginTop: "2rem" }}>
          <strong>Coming soon:</strong> We are evaluating the best private community platform before opening paid membership. The community will complement—not replace—emergency services, statutory safeguarding, clinical care, legal advice or regulated professional support.
        </div>
      </div>
    </main>
  );
}
