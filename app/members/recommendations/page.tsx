import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trusted Recommendations",
  robots: { index: false, follow: false }
};

const categories = [
  ["Independent care providers", "A future directory of appropriately registered or otherwise suitable providers, with clear checks and disclosures."],
  ["Daily-living aids", "Practical products that may support everyday independence, comfort or safer routines."],
  ["Assistive technology", "Technology that may help with reminders, communication, monitoring or accessibility."],
  ["Planning tools", "Calendars, medication planners, care organisers and software that may reduce administrative pressure."],
];

export default function RecommendationsPage() {
  return (
    <main className="member-main">
      <div className="container">
        <header className="member-page-head">
          <p className="eyebrow">Trusted recommendations</p>
          <h1>Useful products and services for everyday caring.</h1>
          <p className="lede">We are building a carefully selected directory of organisations, services and products that may make caring easier.</p>
        </header>

        <div className="resource-grid">
          {categories.map(([title, detail], index) => (
            <article className="resource-card" key={title}>
              <span className="step-number">{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{detail}</p>
              <span className="eyebrow">Directory coming soon</span>
            </article>
          ))}
        </div>

        <div className="notice" style={{ marginTop: "2rem" }}>
          <strong>Affiliate transparency:</strong> Some future recommendations may contain affiliate links. Where that happens, the commercial relationship will be clearly disclosed. A recommendation will never mean that a product or provider is suitable for every individual, and members should still consider their own circumstances and seek appropriate professional advice where necessary.
        </div>
      </div>
    </main>
  );
}
