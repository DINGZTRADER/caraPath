import type { Metadata } from "next";
import styles from "../public-resources.module.css";

export const metadata: Metadata = {
  title: "Find Your Local Authority in England | The Clara Path",
  description: "Official starting points for finding the English Local Authority responsible for adult social care and carer support in your area."
};

export default function LocalAuthoritiesPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <nav className={styles.nav} aria-label="Primary navigation">
          <a className={styles.brand} href="https://www.theclarapath.org">The Clara Path</a>
          <div className={styles.navLinks}>
            <a href="/care-terms">Care terms explained</a>
            <a href="https://www.theclarapath.org/#resources">Resources</a>
            <a className={styles.member} href="https://members.theclarapath.org">Member Area</a>
          </div>
        </nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>Carer navigation</p>
          <h1>Find your Local Authority in England</h1>
          <p className={styles.lede}>Carer support, adult social-care assessments and many local services are organised through councils. Start with the official government lookup so you reach the authority responsible for your postcode.</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.grid}>
            <article className={styles.card}>
              <div className={styles.stat}><span className={styles.number}>01</span><div><h2>Use the official postcode lookup</h2><p>Enter your postcode on GOV.UK to identify your council. This is the safest way to avoid outdated council names or links when local-government boundaries change.</p></div></div>
              <a className={styles.button} href="https://www.gov.uk/find-local-council" target="_blank" rel="noreferrer">Find your council on GOV.UK ↗</a>
            </article>

            <article className={styles.card}>
              <div className={styles.stat}><span className={styles.number}>02</span><div><h2>Check which council handles adult social care</h2><p>In two-tier areas, the county council usually handles adult social care. District, borough or city councils may handle other local services. In unitary areas, one council normally provides both.</p></div></div>
              <a className={`${styles.button} ${styles.secondary}`} href="https://www.gov.uk/understand-how-your-council-works" target="_blank" rel="noreferrer">Understand council types ↗</a>
            </article>
          </div>

          <div className={styles.notice}><strong>Why we use the official lookup:</strong> England’s local-government structure is changing in several areas. The official postcode route is more reliable than maintaining a static list of hundreds of council URLs that can become obsolete.</div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>England-wide council information</p>
          <div className={styles.grid}>
            <article className={styles.card}>
              <h2>Full list of councils in England</h2>
              <p>The Government publishes the current list of English councils by type, including county councils, district councils, unitary authorities, metropolitan districts and London boroughs.</p>
              <a className={styles.button} href="https://www.gov.uk/government/publications/list-of-councils-in-england-by-type" target="_blank" rel="noreferrer">View the Government council list ↗</a>
            </article>
            <article className={styles.card}>
              <h2>Preparing for a carer’s assessment</h2>
              <p>Before speaking to your council, think about the practical and emotional impact of caring, the support you already provide, what is becoming difficult and what would make the caring role more manageable.</p>
              <ul>
                <li>Hours and tasks involved in caring</li>
                <li>Impact on sleep, work, education and relationships</li>
                <li>Your own physical and emotional wellbeing</li>
                <li>Breaks, respite and time for yourself</li>
                <li>Questions about equipment, Direct Payments or support</li>
              </ul>
            </article>
          </div>
          <div className={styles.notice}>A carer’s assessment does not automatically guarantee a particular service, payment or outcome. Decisions are made by the relevant Local Authority according to current law, eligibility criteria and individual circumstances.</div>
          <a className={styles.back} href="https://www.theclarapath.org">← Back to The Clara Path</a>
        </div>
      </section>

      <footer className={styles.footer}><div className={styles.container}><p>The Clara Path Consultants Ltd · General guidance and navigation support only.</p></div></footer>
    </main>
  );
}
