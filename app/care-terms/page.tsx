import type { Metadata } from "next";
import styles from "../public-resources.module.css";

export const metadata: Metadata = {
  title: "Care Terms Explained | The Clara Path",
  description: "Plain-English explanations of DFG, CHC, EHCP, Direct Payments, PIP and Attendance Allowance for family carers."
};

const terms = [
  {
    title: "DFG — Disabled Facilities Grant",
    body: "A Disabled Facilities Grant can help pay for certain adaptations to a disabled person’s home. Applications are normally handled through the Local Authority, and eligibility and the amount available depend on current rules and individual circumstances.",
    bullets: ["Access into or around the home", "Bathroom adaptations", "Ramps or widened doorways", "Access to essential rooms or facilities"],
    href: "https://www.gov.uk/disabled-facilities-grants"
  },
  {
    title: "CHC — NHS Continuing Healthcare",
    body: "NHS Continuing Healthcare is a package of care arranged and funded by the NHS for some adults who are assessed as having a primary health need. Eligibility is based on the nature, intensity, complexity and unpredictability of needs rather than on a diagnosis alone.",
    bullets: ["Initial checklist where appropriate", "Multidisciplinary assessment", "Decision Support Tool", "Formal eligibility decision"],
    href: "https://www.nhs.uk/conditions/social-care-and-support-guide/money-work-and-benefits/nhs-continuing-healthcare/"
  },
  {
    title: "EHCP — Education, Health and Care Plan",
    body: "An Education, Health and Care Plan is a legal document for some children and young people up to age 25 who need more support than is normally available through standard special educational needs provision.",
    bullets: ["Educational needs", "Health needs related to education", "Social-care needs related to education", "Agreed outcomes and provision"],
    href: "https://www.gov.uk/children-with-special-educational-needs/extra-SEN-help"
  },
  {
    title: "Direct Payments",
    body: "Direct Payments are payments made by a Local Authority to some people who have been assessed as needing care and support. They can give more flexibility over arranging agreed support, but also bring responsibilities for how the money is used and recorded.",
    bullets: ["May support personal-assistant arrangements", "Can increase choice and control", "Rules vary by Local Authority", "Records and agreed use may be required"],
    href: "https://www.gov.uk/apply-direct-payments"
  },
  {
    title: "PIP — Personal Independence Payment",
    body: "Personal Independence Payment is a benefit for people who may need help with extra living costs because of a long-term physical or mental-health condition or disability. It is based on how a condition affects daily-living and mobility activities.",
    bullets: ["Not awarded simply because of a diagnosis", "Daily-living activities are considered", "Mobility activities are considered", "Decisions can be challenged through official routes"],
    href: "https://www.gov.uk/pip"
  },
  {
    title: "Attendance Allowance",
    body: "Attendance Allowance is a benefit for some people over State Pension age who need help or supervision because of a disability or health condition. Eligibility focuses on the help or supervision needed rather than on income or savings.",
    bullets: ["For people over State Pension age", "Looks at care or supervision needs", "Not means-tested", "Different rates may apply"],
    href: "https://www.gov.uk/attendance-allowance"
  }
];

export default function CareTermsPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <nav className={styles.nav} aria-label="Primary navigation">
          <a className={styles.brand} href="https://www.theclarapath.org">The Clara Path</a>
          <div className={styles.navLinks}>
            <a href="/local-authorities">Find your Local Authority</a>
            <a href="https://www.theclarapath.org/#resources">Resources</a>
            <a className={styles.member} href="https://members.theclarapath.org">Member Area</a>
          </div>
        </nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>Plain-English navigation</p>
          <h1>Care terms explained</h1>
          <p className={styles.lede}>Acronyms and formal terminology can make an already difficult care journey harder. These short explanations give you a clearer starting point and link directly to official information.</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.terms}>
            {terms.map((term) => (
              <article className={styles.term} key={term.title}>
                <h2>{term.title}</h2>
                <p>{term.body}</p>
                <ul>{term.bullets.map((item) => <li key={item}>{item}</li>)}</ul>
                <a className={styles.button} href={term.href} target="_blank" rel="noreferrer">Read official guidance ↗</a>
              </article>
            ))}
          </div>

          <div className={styles.notice}><strong>Important:</strong> The Clara Path explains public information and helps carers prepare for conversations. We do not determine eligibility, guarantee funding or replace advice from the relevant authority or appropriately qualified professional.</div>

          <div className={styles.actions}>
            <a className={styles.button} href="/local-authorities">Find your Local Authority</a>
            <a className={`${styles.button} ${styles.secondary}`} href="https://members.theclarapath.org">Open Member Area</a>
          </div>
          <a className={styles.back} href="https://www.theclarapath.org">← Back to The Clara Path</a>
        </div>
      </section>

      <footer className={styles.footer}><div className={styles.container}><p>The Clara Path Consultants Ltd · General guidance and navigation support only.</p></div></footer>
    </main>
  );
}
