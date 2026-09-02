import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { EnquiryForm } from "./enquiry-form";
import { PublicHeader } from "./public-header";

export default async function Home() {
  const host = (await headers()).get("host") ?? "";
  if (host.startsWith("members.")) redirect("/sign-in");

  return (
    <>
      <PublicHeader />

      <main>
        <section className="hero" id="top">
          <div className="container hero-grid">
            <div>
              <p className="eyebrow">Health and social care navigation</p>
              <h1>Navigating health and social care shouldn&apos;t feel like a battle.</h1>
              <p className="lede">The Clara Path helps individuals, unpaid carers, family members and friends across England and Wales understand the system, prepare for important conversations and identify practical next steps.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#enquiry">Get Help Now</a>
                <a className="button button-secondary" href="#how-we-help">See how we help</a>
              </div>
            </div>
            <aside className="auth-card" aria-label="A calmer way forward">
              <p className="eyebrow">A calmer way forward</p>
              <h2 style={{ fontSize: "1.8rem" }}>Start with the next useful step.</h2>
              <p>We help you organise information, understand possible routes and prepare questions, then support you to engage with the appropriate NHS, local-authority or professional service.</p>
              <div className="notice"><strong>Non-care service:</strong> The Clara Path does not provide medical diagnosis, clinical treatment decisions or regulated personal care. Funding, care, benefit and statutory decisions remain with the relevant authority or qualified professional.</div>
            </aside>
          </div>
        </section>

        <div className="trust-band">
          <div className="container trust-grid">
            <p>Privacy-conscious support for carers</p>
            <p>Clear professional boundaries</p>
            <p>Trusted links to official sources</p>
          </div>
        </div>

        <section className="story-section" id="carers">
          <div className="container story-grid">
            <div>
              <p className="eyebrow">Welcome to the Carer&apos;s Circle</p>
              <h2>Clarity, community and a practical way forward.</h2>
            </div>
            <div className="story-copy">
              <p>Supporting someone you love should not mean having to decipher every form, pathway and assessment alone.</p>
              <p>When a loved one has physical, cognitive or mental-health needs, paperwork, assessments and changing criteria can leave families feeling isolated and unsure what to do next.</p>
              <p>The Clara Path brings together thoughtful navigation, useful preparation and responsible signposting so carers can approach the next conversation with greater confidence.</p>
            </div>
          </div>
        </section>

        <section className="expertise-section" id="expertise">
          <div className="container">
            <div className="section-intro">
              <div><p className="eyebrow">Our expertise</p><h2>Complex guidance translated into practical next steps.</h2></div>
              <p>Health and social-care law and guidance differ between England and Wales. We separate those routes clearly and point you to the relevant official framework.</p>
            </div>
            <div className="steps">
              <article className="step expertise-card">
                <span className="step-number">01</span>
                <h3>Adult social care</h3>
                <p>We explain relevant pathways under the Care Act 2014 in England and the Social Services and Well-being (Wales) Act 2014 in Wales.</p>
              </article>
              <article className="step expertise-card">
                <span className="step-number">02</span>
                <h3>NHS Continuing Healthcare</h3>
                <p>We help people understand preparation and navigation routes using the appropriate NHS England or NHS Wales framework.</p>
              </article>
              <article className="step expertise-card">
                <span className="step-number">03</span>
                <h3>Plain-language preparation</h3>
                <p>We turn complex public guidance into organised questions, evidence prompts and practical actions for the next conversation.</p>
              </article>
            </div>
            <div className="notice expertise-boundary">
              <strong>Verified claims only:</strong> Individual team biographies, case-management experience and professional credentials will be added after supporting evidence has been reviewed.
            </div>
          </div>
        </section>

        <section className="quick-start-section" id="how-we-help">
          <div className="container">
            <div className="section-intro">
              <div><p className="eyebrow">How we help</p><h2>Choose the level of support you need.</h2></div>
              <p>Start with free information, explore Carer’s Circle for ongoing tools and community support, or use a paid navigation and advocacy service when your situation needs more hands-on help.</p>
            </div>
            <div className="steps">
              <article className="step"><span className="step-number">01</span><h3>Free guidance</h3><p>Use public Local Authority, care-term and assessment-preparation resources before approaching councils, NHS teams or other official services.</p></article>
              <article className="step"><span className="step-number">02</span><h3>Carer’s Circle membership</h3><p>Protected fillable downloads, private community discussions, official-source shortcuts, practical prompts and an expanding member library. Final pricing and trial terms are awaiting approval.</p></article>
              <article className="step"><span className="step-number">03</span><h3>Paid navigation & advocacy</h3><p>Structured roadmaps, CHC preparation, appeals support, meeting advocacy and non-regulated care coordination for families needing individual help.</p><a href="/services">View paid services</a></article>
            </div>
          </div>
        </section>

        <section className="resources" id="resources">
          <div className="container">
            <div className="section-intro">
              <div><p className="eyebrow">Start here</p><h2>Three practical resources for carers.</h2></div>
              <p>Find the right council, understand common care terminology, or begin a care-assessment evidence log with the free starter pages.</p>
            </div>

            <div className="steps">
              <article className="resource-card">
                <span className="step-number">01</span>
                <p className="eyebrow">England-wide directory</p>
                <h3>Find Your Local Authority</h3>
                <p>Search all 317 councils and local authorities in England and identify the authority responsible for adult social care in your area.</p>
                <a href="/local-authorities">Search Local Authorities</a>
              </article>
              <article className="resource-card">
                <span className="step-number">02</span>
                <p className="eyebrow">Jargon made clearer</p>
                <h3>Care Terms Explained</h3>
                <p>Plain-English introductions to DFG, CHC, EHCP, Direct Payments, PIP and Attendance Allowance, with links to authoritative guidance.</p>
                <a href="/care-terms">Explore care terms</a>
              </article>
              <article className="resource-card">
                <span className="step-number">03</span>
                <p className="eyebrow">Free fillable starter</p>
                <h3>Care Assessment Starter Guide</h3>
                <p>Unlock sample Care Act outcome prompts and a fillable one-day care evidence log before an assessment meeting.</p>
                <a href="/free-care-assessment-guide">Get the free starter guide</a>
              </article>
            </div>

            <div className="notice" style={{ marginTop: "28px" }}>
              <strong>Carer’s Circle membership terms are being finalised.</strong> The proposed seven-day trial, final price, billing date, cancellation process and refund terms will be published together after approval.
              {' '}<a href="https://members.theclarapath.org/members/resources" style={{ fontWeight: 800, color: "var(--blue)" }}>Explore the Member Resource Vault →</a>
            </div>
          </div>
        </section>

        <section className="journey" id="sources">
          <div className="container">
            <div className="section-intro">
              <div><p className="eyebrow">Official starting points</p><h2>Use information you can trust.</h2></div>
              <p>Always confirm current eligibility, availability, deadlines and next steps directly with the relevant authority or professional body.</p>
            </div>
            <div className="resource-grid">
              <article className="resource-card"><p className="eyebrow">GOV.UK</p><h3>Find your local council</h3><p>Use your postcode to confirm the council responsible for your address.</p><a href="https://www.gov.uk/find-local-council" target="_blank" rel="noreferrer">Open GOV.UK</a></article>
              <article className="resource-card"><p className="eyebrow">NHS England</p><h3>NHS Continuing Healthcare</h3><p>Read the NHS England overview of eligibility, assessment and review routes.</p><a href="https://www.nhs.uk/social-care-and-support/money-work-and-benefits/nhs-continuing-healthcare/" target="_blank" rel="noreferrer">Read NHS guidance</a></article>
              <article className="resource-card"><p className="eyebrow">GOV.UK</p><h3>Challenge a benefit decision</h3><p>Check the official mandatory reconsideration process and current deadlines.</p><a href="https://www.gov.uk/mandatory-reconsideration" target="_blank" rel="noreferrer">Read GOV.UK guidance</a></article>
              <article className="resource-card"><p className="eyebrow">England</p><h3>Care Act 2014</h3><p>Read the principal legislation for adult care and support in England, including support for carers.</p><a href="https://www.legislation.gov.uk/ukpga/2014/23/contents" target="_blank" rel="noreferrer">Read the Care Act</a></article>
              <article className="resource-card"><p className="eyebrow">Wales</p><h3>Social Services and Well-being</h3><p>Read the Welsh Government overview and codes supporting social-services practice in Wales.</p><a href="https://www.gov.wales/social-services-codes-practice" target="_blank" rel="noreferrer">Read Welsh guidance</a></article>
              <article className="resource-card"><p className="eyebrow">NHS Wales</p><h3>Continuing NHS Healthcare</h3><p>Read the national Welsh framework for eligibility, assessment and review routes.</p><a href="https://www.gov.wales/national-framework-continuing-nhs-healthcare" target="_blank" rel="noreferrer">Read the Welsh framework</a></article>
            </div>
          </div>
        </section>

        <section className="standards" id="community">
          <div className="container standards-grid">
            <div><p className="eyebrow">Carer&apos;s Circle community standards</p><h2>A safe, respectful space to learn and be heard.</h2><p className="standards-copy">Caring can be emotionally exhausting. Our standards protect privacy and keep the Circle supportive and useful.</p></div>
            <ol className="rule-list">
              <li className="rule"><span className="rule-number">01</span><div><strong>Zero judgement. Maximum empathy.</strong><p>Questions and experiences deserve care and respect.</p></div></li>
              <li className="rule"><span className="rule-number">02</span><div><strong>Protect personal privacy.</strong><p>Do not post names, addresses, reference numbers or unredacted official documents.</p></div></li>
              <li className="rule"><span className="rule-number">03</span><div><strong>Information, not formal clinical or legal advice.</strong><p>Clinical, legal and statutory decisions belong with the appropriate qualified professional or authority.</p></div></li>
              <li className="rule"><span className="rule-number">04</span><div><strong>No unsolicited selling.</strong><p>The Circle is not a place for pitching private services to members.</p></div></li>
            </ol>
          </div>
        </section>

        <section className="cta">
          <div className="container">
            <p className="eyebrow">Need more individual support?</p>
            <h2>From preparation to hands-on navigation.</h2>
            <p>Use Carer’s Circle for ongoing tools and community support, or explore paid services for structured roadmaps, CHC preparation, appeals support and care-system advocacy.</p>
            <div className="hero-actions" style={{ justifyContent: "center" }}>
              <a className="button button-primary" href="#enquiry">Get Help Now</a>
              <a className="button button-secondary" href="/services">View paid services</a>
            </div>
          </div>
        </section>

        <section className="enquiry-section" id="enquiry">
          <div className="container enquiry-layout">
            <div className="enquiry-intro">
              <p className="eyebrow">Get help navigating the next step</p>
              <h2>Tell us what you need help understanding.</h2>
              <p>Use this short enquiry to explain the route, assessment or decision you are trying to navigate. A detailed case history is not needed at this stage.</p>
              <div className="notice safeguarding-notice">
                <strong>This is not an emergency or safeguarding reporting service.</strong> If someone is in immediate danger, call 999. For urgent medical help that is not life-threatening, use NHS 111. Safeguarding concerns should be reported to the relevant local authority or emergency service.
              </div>
            </div>
            <EnquiryForm />
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand"><strong>The Clara Path Consultants Ltd</strong><small>Your Guide to Health &amp; Social Support</small></div>
            <div><a href="/local-authorities">Local Authorities</a> · <a href="/care-terms">Care Terms</a> · <a href="/services">Paid Services</a> · <a href="https://members.theclarapath.org">Member Area</a></div>
          </div>
          <p className="footer-note">The Clara Path provides administrative support, advocacy, evidence preparation and system navigation. We do not provide medical diagnosis, clinical treatment decisions, regulated personal care, legal representation or regulated financial advice.</p>
        </div>
      </footer>
    </>
  );
}
