import { getMemberSession } from "../../lib/auth/session";

const options = [
  ["Resource Vault", "Download preparation guides and templates for assessments, benefit decisions, CHC, EHCP and DFG conversations.", "/members/resources"],
  ["Member Prompts", "Use Victoria’s regular conversation prompts to share small wins, questions, local knowledge and carer experiences.", "/members/prompts"],
  ["Private Community", "Join protected Carer’s Circle discussions and use the community standards that keep the space safe and useful.", "/members/community"],
  ["Trusted Recommendations", "Explore the developing directory for care providers, daily-living aids, assistive technology and planning tools.", "/members/recommendations"],
  ["Calendar", "See the member calendar and confirmed Carer’s Circle dates as they are added.", "/members/calendar"],
  ["Learning Events", "See upcoming learning sessions and booking information.", "/members/events"],
];

export default async function MemberHomePage() {
  const user = await getMemberSession();
  const firstName = user?.name?.split(" ")[0] || "Member";
  const stripeManaged = Boolean(user?.entitlement?.stripeCustomerId);

  return (
    <main className="member-main">
      <div className="container">
        <section className="member-hero">
          <p className="eyebrow">Carer’s Circle Member Area</p>
          <h1>Welcome, {firstName}.</h1>
          <p>Your protected space for practical preparation, downloadable tools, community learning and trusted starting points. Please keep content general—this area is not a case-management system and should not contain health records or identifying case information.</p>
          {stripeManaged ? (
            <form action="/api/billing/portal" method="post" style={{ marginTop: "1rem" }}>
              <button className="button button-secondary" type="submit">Manage membership &amp; billing</button>
            </form>
          ) : null}
        </section>

        <section className="member-grid" aria-label="Member options">
          {options.map(([title, detail, href], index) => (
            <article className="member-card" key={title}>
              <span className="step-number">{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{detail}</p>
              <a href={href}>Open</a>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
