const resources = [
  {
    number: "01",
    title: "Care assessment preparation",
    description:
      "Prepare the key facts about your caring role, your wellbeing and the practical questions you want answered.",
    href: "https://www.surreycc.gov.uk/adults/carers/assessing-your-needs",
    label: "Read the official carer’s assessment guidance"
  },
  {
    number: "02",
    title: "PIP decision and appeal information",
    description:
      "Use the official guidance to understand mandatory reconsideration and appeal routes where they apply.",
    href: "https://www.gov.uk/mandatory-reconsideration",
    label: "Read GOV.UK guidance"
  },
  {
    number: "03",
    title: "NHS Continuing Healthcare",
    description:
      "Understand the national framework, assessment tools and public information for CHC and funded nursing care.",
    href: "https://www.gov.uk/government/publications/national-framework-for-nhs-continuing-healthcare-and-nhs-funded-nursing-care",
    label: "Read the national framework"
  },
  {
    number: "04",
    title: "Care Act and carer support",
    description:
      "Explore the legislation that provides for adult care and support, including support for carers.",
    href: "https://www.legislation.gov.uk/ukpga/2014/23/contents",
    label: "Read the Care Act 2014"
  }
];

const rules = [
  ["Zero judgement. Maximum empathy.", "There is no place for shaming, blame or unkindness. Questions and experiences deserve care and respect."],
  ["Protect personal privacy.", "Do not post names, addresses, dates of birth, reference numbers, barcodes or unredacted official documents."],
  ["Information, not formal advice.", "Resources are for education, support and practical preparation. Clinical, legal and benefits decisions remain with the appropriate professional or authority."],
  ["Keep personal stories private.", "Do not screenshot, repost or share another member’s story, struggle or personal details outside the Circle."],
  ["No unsolicited selling or pitching.", "Do not use the Circle to market private insurance, care agencies or independent services to other members."]
];

export default function HomePage() {
  return (
    <>
      <header className="site-header">
        <nav className="container nav" aria-label="Primary navigation">
          <a className="brand" href="#top" aria-label="The Clara Path home">
            <svg className="brand-mark" viewBox="0 0 42 42" aria-hidden="true">
              <path d="M33.2 8.4C24.5 6.2 16.9 10.1 13.6 17.4c-3.5 7.7.6 15.2 7.9 15.6 5.5.3 9.3-3.9 10.3-8.5" fill="none" stroke="#1e3a8a" strokeLinecap="round" strokeWidth="5" />
              <path d="M31.7 24.6c-1.5 4.6-5.4 8.5-10.2 8.5" fill="none" stroke="#4d7c0f" strokeLinecap="round" strokeWidth="5" />
              <circle cx="33" cy="10" r="4" fill="#4d7c0f" />
            </svg>
            <span className="brand-copy"><strong>The Clara Path</strong><span>Your guide to health &amp; social support</span></span>
          </a>
          <div className="nav-links">
            <a href="#circle">Carer’s Circle</a>
            <a href="#resources">Resources</a>
            <a href="#standards">Community standards</a>
            <a href="/sign-in">Member sign in</a>
          </div>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="container hero-grid">
            <div>
              <p className="eyebrow">The Clara Path Carer’s Circle</p>
              <h1>You are no longer fighting the system alone.</h1>
              <p className="lede">A supportive, organised space for family carers navigating UK health and social care—so you can prepare with clarity, ask better questions and find reliable starting points.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="/sign-in">Member sign in</a>
                <a className="button button-secondary" href="#resources">Explore public resources</a>
              </div>
            </div>
            <figure className="hero-media">
              <Image
              src="/images/carer-navigation-hero.webp"
                alt="A family carer looking towards a clear, illustrated path through a calm home setting."
                fill
                priority
                sizes="(max-width: 850px) calc(100vw - 40px), 46vw"
              />
              <figcaption className="hero-caption">
                <p className="eyebrow">Your next step</p>
                <h2>From overwhelm to a more organised way forward.</h2>
                <p>Clear information, careful preparation and the right questions for the right organisation.</p>
              </figcaption>
            </figure>
          </div>
        </section>

        <section id="circle">
          <div className="container">
            <div className="section-intro">
              <div><p className="eyebrow">Welcome to the Carer’s Circle</p><h2>Clarity, community and a practical way forward.</h2></div>
              <p>Supporting someone you love should not mean deciphering every form, pathway and assessment alone. The Clara Path offers a calm, organised place to begin.</p>
            </div>
            <div className="steps">
              <article className="step"><span className="step-number">01</span><h3>Start with your situation</h3><p>Identify the part of the UK you are based in, who you care for and the assessment or system bottleneck that matters most right now.</p></article>
              <article className="step"><span className="step-number">02</span><h3>Prepare with confidence</h3><p>Use structured resources to organise questions, documents and the key facts for your next conversation.</p></article>
              <article className="step"><span className="step-number">03</span><h3>Learn alongside others</h3><p>Member resources and live learning sessions offer thoughtful support without unverified information or eligibility promises.</p></article>
            </div>
          </div>
        </section>

        <section className="journey" aria-labelledby="journey-title">
          <div className="container">
            <div className="section-intro">
              <div><p className="eyebrow">A calmer route through complexity</p><h2 id="journey-title">See the next step without carrying every step at once.</h2></div>
              <p>The Clara Path helps carers turn a difficult system into a practical sequence: understand where you are, prepare what matters, then approach the right service with more confidence.</p>
            </div>

            <div className="journey-visual" aria-hidden="true">
              <svg viewBox="0 0 960 280" role="img" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="route-gradient" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0%" stopColor="#1e3a8a" />
                    <stop offset="52%" stopColor="#4f83cc" />
                    <stop offset="100%" stopColor="#65a30d" />
                  </linearGradient>
                  <filter id="route-shadow" x="-20%" y="-30%" width="140%" height="170%">
                    <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#1e3a8a" floodOpacity=".12" />
                  </filter>
                </defs>
                <path d="M120 150 C230 32 316 244 431 142 S648 42 825 130" fill="none" stroke="#dbe6f4" strokeLinecap="round" strokeWidth="24" />
                <path d="M120 150 C230 32 316 244 431 142 S648 42 825 130" fill="none" filter="url(#route-shadow)" stroke="url(#route-gradient)" strokeLinecap="round" strokeWidth="10" />
                <g fill="#ffffff" stroke="#1e3a8a" strokeWidth="6">
                  <circle cx="120" cy="150" r="24" />
                  <circle cx="470" cy="130" r="24" />
                </g>
                <circle cx="825" cy="130" r="28" fill="#65a30d" stroke="#ffffff" strokeWidth="8" />
                <path d="M812 130 l9 9 18 -22" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="7" />
                <g fill="#1e3a8a" fontFamily="Inter, Arial, sans-serif" textAnchor="middle">
                  <text x="120" y="215" fontSize="18" fontWeight="800">Understand</text>
                  <text x="120" y="239" fontSize="14">your starting point</text>
                  <text x="470" y="78" fontSize="18" fontWeight="800">Prepare</text>
                  <text x="470" y="102" fontSize="14">the facts and questions</text>
                  <text x="825" y="195" fontSize="18" fontWeight="800">Move forward</text>
                  <text x="825" y="219" fontSize="14">with a clear next action</text>
                </g>
              </svg>
            </div>

            <div className="journey-cards">
              <article><span>01</span><h3>Understand</h3><p>Identify the decision, assessment or system obstacle that is creating pressure right now.</p></article>
              <article><span>02</span><h3>Prepare</h3><p>Organise the details, documents and questions that will make your next conversation more useful.</p></article>
              <article><span>03</span><h3>Move forward</h3><p>Use reliable starting points to take the next appropriate action without unrealistic promises.</p></article>
            </div>
          </div>
        </section>

        <section className="resources" id="resources">
          <div className="container">
            <div className="section-intro">
              <div><p className="eyebrow">Carer resource library</p><h2>Prepare thoughtfully. Start with trusted information.</h2></div>
              <p>These are educational starting points, not a substitute for personalised legal, medical or benefits advice. Always confirm local eligibility and next steps with the relevant organisation.</p>
            </div>
            <div className="resource-spotlight">
              <Image
              src="/images/resource-vault-illustration.webp"
                width="1254"
                height="1254"
                sizes="(max-width: 650px) 220px, 240px"
                alt="An organised resource folder, checklist and route map."
              />
              <div>
                <p className="eyebrow">Practical preparation</p>
                <h3>Bring structure to the next conversation.</h3>
                <p>Use the Resource Library to start with trustworthy sources, make a short list of questions and keep the focus on the step immediately in front of you.</p>
              </div>
            </div>
            <div className="resource-grid">
              {resources.map((resource) => (
                <article className="resource-card" key={resource.number}>
                  <span className="step-number">{resource.number}</span>
                  <h3>{resource.title}</h3>
                  <p>{resource.description}</p>
                  <a href={resource.href} target="_blank" rel="noreferrer">{resource.label}</a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="standards" id="standards">
          <div className="container standards-grid">
            <div><p className="eyebrow">Community standards</p><h2>A safe, respectful space to learn and be heard.</h2><p className="standards-copy">Caring can be emotionally exhausting. These standards help protect every person taking part in the Carer’s Circle.</p></div>
            <ol className="rule-list">
              {rules.map(([title, description], index) => (
                <li className="rule" key={title}><span className="rule-number">{String(index + 1).padStart(2, "0")}</span><div><strong>{title}</strong><p>{description}</p></div></li>
              ))}
            </ol>
          </div>
        </section>

        <section className="cta">
          <div className="container">
            <p className="eyebrow">Carer’s Circle members</p>
            <h2>Your resources and upcoming learning sessions, in one protected place.</h2>
            <p>The Member Area is designed for resource access and event updates only. Do not enter health records, safeguarding disclosures or identifiable information about the person you care for.</p>
            <a className="button button-primary" href="/sign-in">Access the Member Area</a>
          </div>
        </section>
      </main>

      <footer>
        <div className="container"><div className="footer-grid"><div className="footer-brand"><strong>The Clara Path Consultants Ltd</strong><small>Your Guide to Health &amp; Social Support</small></div><div>Information, navigation and preparation support only.</div></div><p className="footer-note">© {new Date().getFullYear()} The Clara Path Consultants Ltd. This website does not provide medical, legal, regulated financial or emergency advice.</p></div>
      </footer>
    </>
  );
}
import Image from "next/image";
