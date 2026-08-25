import styles from "./public-header.module.css";

const BrandMark = () => (
  <svg className={styles.brandMark} viewBox="0 0 48 48" aria-hidden="true">
    <path d="M9 33.5C15.5 33.5 18.7 28.5 23.3 21.2C27 15.2 30.7 11.4 39 11.4" fill="none" stroke="#1e3a8a" strokeLinecap="round" strokeWidth="5" />
    <circle cx="39" cy="11.4" r="4.3" fill="#5f7f37" />
    <path d="M9 39h30" stroke="#9bb986" strokeLinecap="round" strokeWidth="3" />
  </svg>
);

const links = [
  ["For Carers", "/#carers"],
  ["How We Help", "/#how-we-help"],
  ["Resources", "/#resources"],
  ["Paid Services", "/services"]
] as const;

export function PublicHeader() {
  return (
    <header className={styles.header}>
      <nav className={`container ${styles.nav}`} aria-label="Primary navigation">
        <a className={styles.brand} href="/#top">
          <BrandMark />
          <span className={styles.brandCopy}>
            <strong>The Clara Path</strong>
            <span>Your Guide to Health &amp; Social Support</span>
          </span>
        </a>

        <div className={styles.desktopLinks}>
          {links.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
          <a className="button button-secondary" href="https://members.theclarapath.org">Member Area</a>
        </div>

        <details className={styles.mobileMenu}>
          <summary aria-label="Open main navigation">☰</summary>
          <div className={styles.mobileLinks}>
            {links.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
            <a className={styles.memberLink} href="https://members.theclarapath.org">Member Area</a>
          </div>
        </details>
      </nav>
    </header>
  );
}
