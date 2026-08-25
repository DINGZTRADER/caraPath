import { headers } from "next/headers";
import { redirect } from "next/navigation";
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
              <p className="eyebrow">The Clara Path Carer&apos;s Circle</p>
              <h1>A clearer path through health and social care.</h1>
              <p className="lede">Practical preparation, calm navigation and trusted starting points for family carers facing complex UK health and social-care systems.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#resources">Explore carer resources</a>
                <a className="button button-secondary" href="/local-authorities">Find your Local Authority</a>
              </div>
            </div>
            <aside className="auth-card" aria-label="A calmer way forward">
              <p className="eyebrow">A calmer way forward</p>
              <h2 style={{ fontSize: "1.8rem" }}>Start with the next useful step.</h2>
              <p>We help you organise the information, questions and routes that matter, then point you towards the appropriate official or professional service.</p>
              <div className="notice">The Clara Path provides general preparation and navigation support. Funding, care, treatment and legal decisions remain with the appropriate authority or qualified professional.</div>
            </aside>
          </div>
        </section>

        <div className="trust-band">
          <div className="container trust-grid">
            <p>Privacy-conscious support for carers</p>
            <p>Clear community standards</p>
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

        <section className="quick-start-section" id="how-we-help">
          <div className="container">
            <div className="section-intro">
              <div><p className="eyebrow">How we help</p><h2>Practical support for the moments that matter.</h2></div>
              <p>Understand the route, prepare the right questions and use trusted official information before approaching councils, NHS teams, charities or regulated providers.</p>
            </div>
            <div className="steps">
              <article className="step"><span className="step-number">01</span><h3>Understand the route</h3><p>Plain-English explanations of common health and social-care pathways and terminology.</p></article>
              <article className="step"><span className="step-number">02</span><h3>Prepare with confidence</h3><p>Organise facts, documents and questions for assessments, applications, reviews and challenges.</p></article>
              <article className="step"><span className="step-number">03</span><h3>Use the right source</h3><p>Check current eligibility, processes and contact routes with the appropriate official organisation.</p></article>
            </div>
          </div>
        </section>

        <section className="resources" id="resources">
          <div className="container">
            <div className="section-intro">
              <div><p className="eyebrow">Start here</p><h2>Three practical resources for carers.</h2></div>
              <p>These are now core Clara Path resources: find the right council, understand common care terminology and prepare for a carer&apos;s assessment.</p>
            </div>

            <div className="steps">
              <article className="resource-card">
                <span className="step-number">01</span>
                <p className="eyebrow">England-wide directory</p>
                <h3>Find Your Local Authority</h3>
                <p>Search all 317 councils and local authorities in England, filter by council type, and use the GOV.UK postcode checker to confirm the authority responsible for your address.</p>
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
                <p className="eyebrow">Assessment preparation</p>
                <h3>Preparing for a Carer&apos;s Assessment</h3>
                <p>Think through your caring responsibilities, the impact on your wellbeing, support gaps and the questions you want to raise with the assessor.</p>
                <a href="/local-authorities#assessment-preparation">Start preparing</a>
              </article>
            </div>

            <div className="notice" style={{ marginTop: "28px" }}>
              Members can also access the protected Resource Vault with fillable preparation guides and templates for benefit decisions, CHC, EHCP, DFG and other care-related decisions.
              {' '}<a href="https://members.theclarapath.org/members/resources" style={{ fontWeight: 800, color: "var(--blue)" }}>Open the Member Resource Vault →</a>
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
              <article className="resource-card"><p className="eyebrow">NHS</p><h3>NHS Continuing Healthcare</h3><p>Read the NHS overview of eligibility, assessment and review routes.</p><a href="https://www.nhs.uk/conditions/social-care-and-support-guide/money-work-and-benefits/nhs-continuing-healthcare/" target="_blank" rel="noreferrer">Read NHS guidance</a></article>
              <article className="resource-card"><p className="eyebrow">GOV.UK</p><h3>Challenge a benefit decision</h3><p>Check the official mandatory reconsideration process and current deadlines.</p><a href="https://www.gov.uk/mandatory-reconsideration" target="_blank" rel="noreferrer">Read GOV.UK guidance</a></article>
              <article className="resource-card"><p className="eyebrow">Legislation</p><h3>Care Act 2014</h3><p>Read the legislation covering adult care and support, including support for carers.</p><a href="https://www.legislation.gov.uk/ukpga/2014/23/contents" target="_blank" rel="noreferrer">Read the Care Act</a></article>
            </div>
          </div>
        </section>

        <section className="standards" id="community">
          <div className="container standards-grid">
            <div><p className="eyebrow">Carer&apos;s Circle community standards</p><h2>A safe, respectful space to learn and be heard.</h2><p className="standards-copy">Caring can be emotionally exhausting. Our standards protect privacy and keep the Circle supportive and useful.</p></div>
            <ol className="rule-list">
              <li className="rule"><span className="rule-number">01</span><div><strong>Zero judgement. Maximum empathy.</strong><p>Questions and experiences deserve care and respect.</p></div></li>
              <li className="rule"><span className="rule-number">02</span><div><strong>Protect personal privacy.</strong><p>Do not post names, addresses, reference numbers or unredacted official documents.</p></div></li>
              <li className="rule"><span className="rule-number">03</span><div><strong>Information, not formal advice.</strong><p>Clinical, legal and benefits decisions belong with the appropriate qualified professional or authority.</p></div></li>
              <li className="rule"><span className="rule-number">04</span><div><strong>No unsolicited selling.</strong><p>The Circle is not a place for pitching private services to members.</p></div></li>
            </ol>
          </div>
        </section>

        <section className="cta">
          <div className="container">
            <p className="eyebrow">Begin with one clear step</p>
            <h2>Better preparation can change the next conversation.</h2>
            <p>Use the public resources above or enter the protected Carer&apos;s Circle Member Area for fillable guides, community prompts, events and trusted recommendations.</p>
            <a className="button button-primary" href="https://members.theclarapath.org">Open Member Area</a>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand"><strong>The Clara Path Consultants Ltd</strong><small>Your Guide to Health &amp; Social Support</small></div>
            <div><a href="/local-authorities">Local Authorities</a> · <a href="/care-terms">Care Terms</a> · <a href="https://members.theclarapath.org">Member Area</a></div>
          </div>
          <p className="footer-note">Information on this website is for general guidance and navigation support only; it is not medical, legal or regulated financial advice.</p>
        </div>
      </footer>
    </>
  );
}
