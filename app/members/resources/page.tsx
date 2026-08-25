import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Member Resource Vault",
  robots: { index: false, follow: false }
};

const downloads = [
  {
    title: "The UK Care Assessment Prep Guide",
    detail: "Member edition: A Plain-English Guide & Fillable Logbook to help families prepare evidence, questions and practical records before a care assessment. The Daily Care Log will be expanded when Victoria supplies the final table layout.",
    href: "/members/downloads/care-assessment-preparation-guide"
  },
  {
    title: "Benefit Decision Preparation Template",
    detail: "A fillable PDF for organising a PIP, Attendance Allowance or other benefit decision, the points you disagree with, evidence, real-life examples and questions before seeking advice or review.",
    href: "/members/downloads/benefit-decision-preparation-template"
  },
  {
    title: "CHC Review Preparation Template",
    detail: "Prepare questions and evidence around nature, intensity, complexity and unpredictability before an NHS Continuing Healthcare review or discussion.",
    href: "/members/downloads/chc-review-preparation-template"
  },
  {
    title: "EHCP Review Preparation Template",
    detail: "A fillable structure for reviewing current needs, provision, changes, evidence and questions before an EHCP meeting.",
    href: "/members/downloads/ehcp-review-preparation-template"
  },
  {
    title: "DFG Preparation Checklist",
    detail: "Organise the practical problem, proposed adaptation, supporting information and questions before approaching your Local Authority about a Disabled Facilities Grant.",
    href: "/members/downloads/dfg-preparation-checklist"
  },
  {
    title: "Care Decision Challenge Preparation Template",
    detail: "A general fillable template for questioning or challenging another care-related decision, including reasons, evidence, chronology and the outcome sought.",
    href: "/members/downloads/care-decision-challenge-template"
  }
];

const guideRoadmap = [
  {
    title: "Eligibility Outcomes Checklist",
    detail: "A plain-English checklist built around all 10 adult Care Act eligibility outcomes, including nutrition, hygiene, toilet needs, clothing, a habitable home, safe use of the home, relationships, work or education, community access and caring responsibilities."
  },
  {
    title: "Fillable Daily Care Log",
    detail: "A two-week evidence diary for recording what support was needed, how long it took, prompting or supervision, night-time interruptions, incidents and what happened on difficult days. Final table layout is awaiting Victoria’s supplied table."
  },
  {
    title: "Social Work Meeting Cheat Sheet",
    detail: "A concise meeting-prep page covering three key questions: whether an NHS CHC Checklist referral may be appropriate, how Direct Payments and the local hourly rate work, and arranging an independent Carer’s Assessment where applicable."
  },
  {
    title: "PIP / Attendance Allowance Reconsideration Pack",
    detail: "Planned premium pack: structured letter-building templates, evidence checklist, chronology and real-life example prompts for a Mandatory Reconsideration or decision review."
  },
  {
    title: "Hiring a Personal Assistant Toolkit",
    detail: "Planned premium pack for families using Direct Payments: sample job-description prompts, interview questions, onboarding checklist and timesheet structure."
  }
];

const officialSources = [
  {
    title: "Care Act assessment and adult eligibility",
    detail: "Care and Support Statutory Guidance, chapter 6. For the adult eligibility test, start at paragraphs 6.102–6.112; the 10 outcomes are explained at 6.105–6.106.",
    href: "https://www.gov.uk/government/publications/care-act-statutory-guidance/care-and-support-statutory-guidance",
    source: "Department of Health and Social Care"
  },
  {
    title: "Carer’s Assessment",
    detail: "Care and Support Statutory Guidance, chapter 6, especially paragraphs 6.16–6.18 on when a Local Authority must carry out a carer’s assessment and what it should consider.",
    href: "https://www.gov.uk/government/publications/care-act-statutory-guidance/care-and-support-statutory-guidance",
    source: "Department of Health and Social Care"
  },
  {
    title: "Direct Payments",
    detail: "Care and Support Statutory Guidance, chapter 12. Paragraphs 12.1–12.10 explain the purpose of Direct Payments and the route for requesting them.",
    href: "https://www.gov.uk/government/publications/care-act-statutory-guidance/care-and-support-statutory-guidance",
    source: "Department of Health and Social Care"
  },
  {
    title: "NHS Continuing Healthcare Checklist",
    detail: "Official CHC screening guidance and forms. A positive Checklist indicates that a full assessment may be required; it does not itself establish CHC eligibility.",
    href: "https://www.gov.uk/government/publications/nhs-continuing-healthcare-checklist",
    source: "Department of Health and Social Care"
  },
  {
    title: "PIP mandatory reconsideration",
    detail: "Official route for asking for a benefit decision to be looked at again, including how to request reconsideration and where to check current deadlines.",
    href: "https://www.gov.uk/mandatory-reconsideration",
    source: "GOV.UK"
  },
  {
    title: "Find your Local Authority",
    detail: "Use The Clara Path council finder and the official postcode lookup to confirm which authority normally handles adult social care in your area.",
    href: "https://www.theclarapath.org/local-authorities",
    source: "The Clara Path + GOV.UK"
  }
];

export default function MemberResourcesPage() {
  return (
    <main className="member-main">
      <div className="container">
        <header className="member-page-head">
          <p className="eyebrow">The Classroom</p>
          <h1>Resource Vault</h1>
          <p className="lede">Use the classroom for simple downloadable tools, short learning guides and direct links to the official rules behind care-system decisions.</p>
        </header>

        <div className="notice">These materials are educational preparation tools. They help you organise information and questions but do not determine eligibility, guarantee funding, or replace legal, clinical, welfare-rights or financial advice. Complete private logs on your own device; do not upload health records or identifying case documents to this site.</div>

        <section aria-labelledby="downloads-heading">
          <div className="member-page-head">
            <p className="eyebrow">Premium member downloads</p>
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

        <section aria-labelledby="guide-roadmap-heading" style={{ marginTop: "3rem" }}>
          <div className="member-page-head">
            <p className="eyebrow">Full guide structure</p>
            <h2 id="guide-roadmap-heading">The UK Care Assessment Prep Guide</h2>
            <p className="lede">A Plain-English Guide & Fillable Logbook to Secure the Funding and Support Your Family is Legally Entitled To.</p>
          </div>
          <div className="resource-grid">
            {guideRoadmap.map((resource, index) => (
              <article className="resource-card" key={resource.title}>
                <span className="step-number">{String(index + 1).padStart(2, "0")}</span>
                <h3>{resource.title}</h3>
                <p>{resource.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="sources-heading" style={{ marginTop: "3rem" }}>
          <div className="member-page-head">
            <p className="eyebrow">Official-source library</p>
            <h2 id="sources-heading">Go to the rule, not a social-media summary.</h2>
            <p className="lede">The references below use official chapters and paragraph numbers where possible so members can locate the relevant wording even when PDF page numbering changes.</p>
          </div>
          <div className="resource-grid">
            {officialSources.map((resource, index) => (
              <article className="resource-card" key={resource.title}>
                <span className="step-number">{String(index + 1).padStart(2, "0")}</span>
                <p className="eyebrow">{resource.source}</p>
                <h3>{resource.title}</h3>
                <p>{resource.detail}</p>
                <a href={resource.href} target="_blank" rel="noreferrer">Open official resource</a>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="audio-heading" style={{ marginTop: "3rem" }}>
          <div className="member-page-head">
            <p className="eyebrow">Short audio guides</p>
            <h2 id="audio-heading">Listen before a difficult conversation.</h2>
          </div>
          <div className="notice">Audio explainers will sit here alongside the PDFs as Victoria records them. The same area can also link to approved YouTube replays or clips from monthly Carer’s Circle sessions.</div>
        </section>
      </div>
    </main>
  );
}
