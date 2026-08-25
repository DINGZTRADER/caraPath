import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Member Resource Vault",
  robots: { index: false, follow: false }
};

const downloads = [
  {
    title: "Care Assessment Preparation Guide",
    detail: "A branded fillable PDF to help you think through your caring role, impact on wellbeing, support gaps and questions for an assessor.",
    href: "/members/downloads/care-assessment-preparation-guide"
  },
  {
    title: "Benefit Decision Preparation Template",
    detail: "A fillable PDF for organising the decision, points you disagree with, evidence, real-life examples and questions before seeking advice or review.",
    href: "/members/downloads/benefit-decision-preparation-template"
  },
  {
    title: "CHC Review Preparation Template",
    detail: "Prepare questions and evidence around nature, intensity, complexity and unpredictability before a CHC review or discussion.",
    href: "/members/downloads/chc-review-preparation-template"
  },
  {
    title: "EHCP Review Preparation Template",
    detail: "A fillable structure for reviewing current needs, provision, changes, evidence and questions before an EHCP meeting.",
    href: "/members/downloads/ehcp-review-preparation-template"
  },
  {
    title: "DFG Preparation Checklist",
    detail: "Organise the practical problem, proposed adaptation, supporting information and questions before approaching your Local Authority.",
    href: "/members/downloads/dfg-preparation-checklist"
  },
  {
    title: "Care Decision Challenge Preparation Template",
    detail: "A general fillable template for questioning or challenging another care-related decision, including reasons, evidence, chronology and the outcome sought.",
    href: "/members/downloads/care-decision-challenge-template"
  }
];

const officialSources = [
  {
    title: "Find your Local Authority",
    detail: "Search all English councils and use the official postcode lookup to confirm which authority normally handles adult social care.",
    href: "https://www.theclarapath.org/local-authorities",
    source: "The Clara Path + GOV.UK"
  },
  {
    title: "Care terms explained",
    detail: "Plain-English explanations of DFG, CHC, EHCP, Direct Payments, PIP and Attendance Allowance with official-source links.",
    href: "https://www.theclarapath.org/care-terms",
    source: "The Clara Path"
  },
  {
    title: "PIP mandatory reconsideration",
    detail: "Understand the official process for asking for a benefit decision to be looked at again.",
    href: "https://www.gov.uk/mandatory-reconsideration",
    source: "GOV.UK"
  },
  {
    title: "NHS Continuing Healthcare framework",
    detail: "Read the national framework and related public information on CHC and NHS-funded nursing care.",
    href: "https://www.gov.uk/government/publications/national-framework-for-nhs-continuing-healthcare-and-nhs-funded-nursing-care",
    source: "Department of Health and Social Care"
  }
];

export default function MemberResourcesPage() {
  return (
    <main className="member-main">
      <div className="container">
        <header className="member-page-head">
          <p className="eyebrow">Member Resource Vault</p>
          <h1>Practical tools for difficult care-system conversations.</h1>
          <p className="lede">Download branded fillable PDFs, save your own working copy, and use the official-source library to check current rules and routes.</p>
        </header>

        <div className="notice">These materials are educational tools. They help you organise information and questions but do not replace legal, clinical, welfare-rights or financial advice. Complete them on your own device; do not upload private records to this site.</div>

        <section aria-labelledby="downloads-heading">
          <div className="member-page-head">
            <p className="eyebrow">Member downloads</p>
            <h2 id="downloads-heading">Fill them in digitally or print them.</h2>
          </div>
          <div className="resource-grid">
            {downloads.map((resource, index) => (
              <article className="resource-card" key={resource.title}>
                <span className="step-number">{String(index + 1).padStart(2, "0")}</span>
                <p className="eyebrow">Protected fillable PDF</p>
                <h3>{resource.title}</h3>
                <p>{resource.detail}</p>
                <a href={resource.href}>Download PDF</a>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="sources-heading" style={{ marginTop: "3rem" }}>
          <div className="member-page-head">
            <p className="eyebrow">Trusted starting points</p>
            <h2 id="sources-heading">Check the current official route.</h2>
          </div>
          <div className="resource-grid">
            {officialSources.map((resource, index) => (
              <article className="resource-card" key={resource.title}>
                <span className="step-number">{String(index + 1).padStart(2, "0")}</span>
                <p className="eyebrow">{resource.source}</p>
                <h3>{resource.title}</h3>
                <p>{resource.detail}</p>
                <a href={resource.href} target="_blank" rel="noreferrer">Open resource</a>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
