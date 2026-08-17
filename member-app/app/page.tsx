import Image from "next/image";

const quickStart = [
  {
    title: "Introduce Yourself:",
    copy: "Reply to this post and tell us a bit about your situation.",
    questions: [
      "Which part of the UK are you based in?",
      "Who are you caring for, and what is the #1 system bottleneck or assessment challenge you are facing right now?",
    ],
  },
  {
    title: "Explore our library of resources:",
    copy: "Head over to the Resource Vault. Download your premium Care Assessment Prep Binder and look through our step-by-step guides on PIP appeals and NHS Continuing Healthcare (CHC).",
  },
  {
    title: "Check the Calendar:",
    copy: "Look at our upcoming events to book onto our monthly Live Q&A webinar.",
  },
];

const rules = [
  {
    title: "Zero Judgement, Maximum Empathy:",
    copy: "Caring is emotionally exhausting. We have zero tolerance for shaming, blame, or unkindness. This is a supportive space to vent, ask questions learn, and grow. No judgement. No question is silly.",
  },
  {
    title: "Protect Personal Privacy (No Identifiable Data):",
    copy: "For the safety of your loved ones, never post full names, specific home addresses, dates of birth, or copies of official letters that show personal reference numbers or barcodes. Always blur or black out sensitive data before uploading screenshots.",
  },
  {
    title: "Information, Not Formal Legal/Medical Advice:",
    copy: "The resources and discussions here are for support, education and strategic guidance. We are advocates, educators and your robust personalised support in your care journey.. we signpost to appropriate medical ir legal representation if needed.",
  },
  {
    title: "Strict Privacy — What Happens on the Path, Stays on The Path!",
    copy: "To maintain total safety away from public social media, do not screenshot or share stories, struggles, or personal details posted by other members outside of this private community.",
  },
  {
    title: "No Self-Promotion or Unsolicited Pitching:",
    copy: "Do not send unsolicited direct messages (DMs) to other members trying to sell private insurance, care agency services, or independent consulting. If we have reason to believe any of the above rules are being broken, we will instantly remove subscribers without refund.",
  },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <nav className="container nav" aria-label="Primary navigation">
          <a className="brand" href="#top" aria-label="The Clara Path home">
            <svg className="brand-mark" viewBox="0 0 48 48" aria-hidden="true">
              <path d="M9 33.5C15.5 33.5 18.7 28.5 23.3 21.2C27 15.2 30.7 11.4 39 11.4" fill="none" stroke="#1e3a8a" strokeLinecap="round" strokeWidth="5" />
              <circle cx="39" cy="11.4" r="4.3" fill="#4d7c0f" />
              <path d="M9 39h30" stroke="#9bb986" strokeLinecap="round" strokeWidth="3" />
            </svg>
            <span className="brand-copy"><strong>The Clara Path</strong><span>Your guide to health &amp; social support</span></span>
          </a>
          <div className="nav-links">
            <a href="#welcome">Welcome</a>
            <a href="#quick-start">Quick start</a>
            <a href="#community-rules">Community rules</a>
            <a className="button button-primary" href="/sign-in">Member sign in</a>
          </div>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">A write up on the carers section</p>
            <h1>Welcome to the Clara Path — You are no longer fighting the system alone.</h1>
            <p className="lede">Hello and a very warm welcome to The Clara Path Carer’s Circle!</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#quick-start">Your 3-Step Quick Start Checklist</a>
              <a className="button button-secondary" href="#community-rules">Community Rules</a>
            </div>
          </div>
          <figure className="hero-media">
            <Image src="/images/caregiver-support-hero.webp" alt="A family carer and her older parent preparing together at a kitchen table" fill priority sizes="(max-width: 850px) 100vw, 48vw" />
            <figcaption className="hero-caption">
              <p className="eyebrow">The Clara Path Carer’s Circle</p>
              <h2>Take a deep breath - we can help you.</h2>
              <p>This space was built to change that.</p>
            </figcaption>
          </figure>
        </div>
      </section>

      <div className="trust-band">
        <div className="container trust-grid">
          <p>If you are here, it means you are caring for a loved one with physical or cognitive needs.</p>
          <p>You are trying to navigate the confusing and complex UK health and social care system.</p>
          <p>The Clara Path will guide you through the confusion.</p>
        </div>
      </div>

      <section className="story-section" id="welcome">
        <div className="container story-grid">
          <div>
            <p className="eyebrow">The Clara Path Carer’s Circle</p>
            <h2>We can help you.</h2>
          </div>
          <div className="story-copy">
            <p>Firstly , take a deep breath - we can help you.</p>
            <p>The endless paperwork, the stress of various assessments with confusing criteria, by Local Authorities or the NHS can make you feel completely isolated. This space was built to change that.</p>
            <p>This community is your strategic roadmap, your legal shield, and your safe haven. Here, we translate complex legislation like the Care Act 2014 and The National Franework for NHS Continuing Hhealthcare and Funded Nursing Care into plain, actionable English so you can secure the funding, equipment, right care and peace of mind your family is entitled to.</p>
            <p>The Clara Path will guide you through the confusion.</p>
          </div>
        </div>
      </section>

      <section className="journey" aria-labelledby="care-experience-heading">
        <div className="container experience-grid">
          <div className="experience-copy">
            <p className="eyebrow">Care-aware experience</p>
            <h2 id="care-experience-heading">We are a team made up of</h2>
            <ul className="experience-list">
              <li>continuing healthcare nurses experienced in case management</li>
              <li>community general, mental health (MH), pragmatic and Learning Dusability (LD) nurses</li>
              <li>district nurses</li>
              <li>social workers</li>
              <li>independent care managers</li>
            </ul>
          </div>
          <div className="journey-visual" aria-label="A calmer path through a care journey">
            <svg viewBox="0 0 800 260" role="img" aria-labelledby="path-title">
              <title id="path-title">A path from paperwork to a prepared next step</title>
              <path d="M70 190C184 190 210 70 342 105s152 115 305 43" fill="none" stroke="#d8e6ca" strokeLinecap="round" strokeWidth="26" />
              <path d="M70 190C184 190 210 70 342 105s152 115 305 43" fill="none" stroke="#1e3a8a" strokeDasharray="1 20" strokeLinecap="round" strokeWidth="7" />
              <circle cx="70" cy="190" r="30" fill="#1e3a8a" /><circle cx="342" cy="105" r="30" fill="#4d7c0f" /><circle cx="647" cy="148" r="30" fill="#1e3a8a" />
              <text x="70" y="197" fill="white" fontSize="16" fontWeight="800" textAnchor="middle">01</text><text x="342" y="112" fill="white" fontSize="16" fontWeight="800" textAnchor="middle">02</text><text x="647" y="155" fill="white" fontSize="16" fontWeight="800" textAnchor="middle">03</text>
              <text x="70" y="242" fill="#33415a" fontSize="15" fontWeight="700" textAnchor="middle">Your situation</text><text x="342" y="52" fill="#33415a" fontSize="15" fontWeight="700" textAnchor="middle">Useful preparation</text><text x="647" y="205" fill="#33415a" fontSize="15" fontWeight="700" textAnchor="middle">A clearer next step</text>
            </svg>
          </div>
        </div>
      </section>

      <section className="quick-start-section" id="quick-start">
        <div className="container">
          <div className="section-intro">
            <div><p className="eyebrow">Your 3-Step Quick Start Checklist</p><h2>To get the most out of your membership, please complete these three quick steps:</h2></div>
            <p>The Clara Path will guide you through the confusion.</p>
          </div>
          <div className="quick-start-layout">
            <figure className="preparation-photo">
              <Image src="/images/care-preparation-notebook.webp" alt="A calm home preparation table with notebook, folder and tea" fill sizes="(max-width: 850px) 100vw, 38vw" />
            </figure>
            <div className="steps steps-stacked">
              {quickStart.map((step, index) => (
                <article className="step" key={step.title}>
                  <span className="step-number">0{index + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                  {step.questions && <ul className="step-questions">{step.questions.map((question) => <li key={question}>{question}</li>)}</ul>}
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="resources" id="resources">
        <div className="container resource-spotlight">
          <Image src="/images/resource-vault-illustration.webp" alt="Illustration of a clear, organised resource vault" width={420} height={315} />
          <div>
            <p className="eyebrow">Resource Vault</p>
            <h2>Explore our library of resources</h2>
            <p>Head over to the Resource Vault. Download your premium Care Assessment Prep Binder and look through our step-by-step guides on PIP appeals and NHS Continuing Healthcare (CHC).</p>
          </div>
        </div>
      </section>

      <section className="standards" id="community-rules">
        <div className="container standards-grid">
          <div>
            <p className="eyebrow">The Clara Path Carer’s Circle Community Rules</p>
            <h2>To keep this space safe, supportive, and highly valuable for everyone, we enforce a set of community standards.</h2>
            <p className="standards-copy">By remaining a member, you agree to the following:</p>
          </div>
          <ol className="rule-list">
            {rules.map((rule, index) => (
              <li className="rule" key={rule.title}>
                <span className="rule-number">{index + 1}</span>
                <div><strong>{rule.title}</strong><p>{rule.copy}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <p className="eyebrow">The Clara Path Carer’s Circle</p>
          <h2>Thank you for being here, and thank you for everything you do for your loved one.</h2>
          <p>Scroll down to the comments below, introduce yourself, and let’s get you roadmapped!</p>
          <a className="button button-primary" href="/sign-in">Drop your introduction below</a>
        </div>
      </section>

      <footer>
        <div className="container footer-grid">
          <div className="footer-brand"><strong>The Clara Path</strong><small>Your guide to health &amp; social support</small></div>
          <small>The Clara Path Carer’s Circle</small>
        </div>
      </footer>
    </main>
  );
}
