import type { Metadata } from "next";
import styles from "../public-resources.module.css";
import { AuthorityDirectory } from "./authority-directory";

export const metadata: Metadata = {
  title: "All Local Authorities in England | The Clara Path",
  description: "Search all 317 councils and local authorities in England, with official GOV.UK routes for confirming the council responsible for adult social care and carer support."
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
          <h1>Local Authorities in England</h1>
          <p className={styles.lede}>Search every current English council and local authority in one place, then use the official postcode checker to confirm which authority is responsible for your address and adult social-care services.</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.grid}>
            <article className={styles.card}>
              <div className={styles.stat}><span className={styles.number}>01</span><div><h2>Not sure which council you need?</h2><p>Enter your postcode on GOV.UK. This is the most reliable way to identify the council responsible for your address, especially where county and district councils overlap.</p></div></div>
              <a className={styles.button} href="https://www.gov.uk/find-local-council" target="_blank" rel="noreferrer">Find your council by postcode ↗</a>
            </article>
            <article className={styles.card}>
              <div className={styles.stat}><span className={styles.number}>02</span><div><h2>Adult social care in two-tier areas</h2><p>Where both a county and district council exist, the county council normally provides adult social care. Unitary authorities, metropolitan districts and London boroughs generally provide the full range of council services.</p></div></div>
              <a className={`${styles.button} ${styles.secondary}`} href="https://www.gov.uk/understand-how-your-council-works" target="_blank" rel="noreferrer">Understand council types ↗</a>
            </article>
          </div>
          <div className={styles.notice}><strong>Directory source:</strong> The authority names and categories below are reconciled against current GOV.UK local-authority election-cycle guidance. Because local-government reorganisation can change council structures, always use the official postcode checker for a case-specific decision.</div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <AuthorityDirectory />
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.grid}>
            <article className={styles.card}>
              <h2>Preparing for a carer’s assessment</h2>
              <p>Before speaking to your council, think about the practical and emotional impact of caring, the support you already provide, what is becoming difficult and what would make the caring role more manageable.</p>
              <ul><li>Hours and tasks involved in caring</li><li>Impact on sleep, work, education and relationships</li><li>Your own physical and emotional wellbeing</li><li>Breaks, respite and time for yourself</li><li>Questions about equipment, Direct Payments or support</li></ul>
            </article>
            <article className={styles.card}>
              <h2>Check the Government source</h2>
              <p>The Government publishes current information about council structures and election cycles. The Clara Path directory is designed to make that information easier to browse, not to replace the official source.</p>
              <a className={styles.button} href="https://www.gov.uk/government/publications/election-timetable-in-england/election-timetable-in-england" target="_blank" rel="noreferrer">View current GOV.UK authority guidance ↗</a>
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
