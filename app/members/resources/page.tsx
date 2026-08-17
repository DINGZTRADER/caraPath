import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Member resources",
  robots: { index: false, follow: false }
};

const resources = [
  {
    title: "Preparing for a carer’s assessment",
    detail: "Organise what support you provide, how caring affects your wellbeing, and the questions you want to discuss.",
    href: "https://www.surreycc.gov.uk/adults/carers/assessing-your-needs",
    source: "Surrey County Council"
  },
  {
    title: "PIP mandatory reconsideration",
    detail: "Use official government information to understand the process for asking for a benefit decision to be looked at again.",
    href: "https://www.gov.uk/mandatory-reconsideration",
    source: "GOV.UK"
  },
  {
    title: "NHS Continuing Healthcare framework",
    detail: "Read the national framework and related public information on CHC and NHS-funded nursing care.",
    href: "https://www.gov.uk/government/publications/national-framework-for-nhs-continuing-healthcare-and-nhs-funded-nursing-care",
    source: "Department of Health and Social Care"
  },
  {
    title: "Finding regulated care services",
    detail: "Use the Care Quality Commission service finder to check registered providers and inspection information.",
    href: "https://www.cqc.org.uk/care-services",
    source: "Care Quality Commission"
  }
];

export default function MemberResourcesPage() {
  return (
    <main className="member-main">
      <div className="container">
        <header className="member-page-head">
          <p className="eyebrow">Member resource library</p>
          <h1>Reliable starting points for your next step.</h1>
          <p className="lede">These sources support preparation and understanding. They do not provide a diagnosis, legal opinion or guarantee of eligibility, funding or service availability.</p>
        </header>
        <div className="notice">Do not upload case notes, health records, benefit letters or identifying information here. This Member Area is intentionally not a case-management system.</div>
        <section className="resource-grid" aria-label="Member resources">
          {resources.map((resource, index) => (
            <article className="resource-card" key={resource.title}>
              <span className="step-number">{String(index + 1).padStart(2, "0")}</span>
              <p className="eyebrow">{resource.source}</p>
              <h3>{resource.title}</h3>
              <p>{resource.detail}</p>
              <a href={resource.href} target="_blank" rel="noreferrer">Open official source</a>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
