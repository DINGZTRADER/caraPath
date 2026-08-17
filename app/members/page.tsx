import { currentUser } from "@clerk/nextjs/server";

export default async function MemberHomePage() {
  const user = await currentUser();
  const firstName = user?.firstName || "Member";

  return (
    <main className="member-main">
      <div className="container">
        <section className="member-hero">
          <p className="eyebrow">Carer’s Circle Member Area</p>
          <h1>Welcome, {firstName}.</h1>
          <p>Your protected space for reliable starting points, practical preparation and upcoming learning updates. Please keep all content general—this area does not collect case or health information.</p>
        </section>
        <section className="member-grid" aria-label="Member options">
          <article className="member-card"><span className="step-number">01</span><h3>Resource library</h3><p>Use trusted public sources and clear preparation prompts for assessments, PIP and NHS Continuing Healthcare.</p><a href="/members/resources">Open resources</a></article>
          <article className="member-card"><span className="step-number">02</span><h3>Learning events</h3><p>See upcoming Carer’s Circle learning sessions and the process for receiving booking information.</p><a href="/members/events">View events</a></article>
          <article className="member-card"><span className="step-number">03</span><h3>Your privacy</h3><p>Keep personal stories and identifying information out of discussion spaces and use secure professional channels for case-specific support.</p><a href="/">Read the standards</a></article>
        </section>
      </div>
    </main>
  );
}
