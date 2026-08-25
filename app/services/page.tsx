import type { Metadata } from "next";
import { PublicHeader } from "../public-header";
import styles from "../public-resources.module.css";

export const metadata: Metadata = {
  title: "Paid Care Navigation, CHC Resources & Consultations | The Clara Path",
  description: "Administrative support, advocacy, CHC preparation, digital learning resources and care-system navigation for UK family carers.",
  alternates: { canonical: "https://www.theclarapath.org/services" }
};

const services = [
  {
    title: "Care Navigation Roadmap",
    price: "£450–£600",
    detail: "A structured review of your family’s circumstances followed by a written roadmap identifying likely routes through Local Authority support, statutory benefits, NHS Continuing Healthcare (CHC) and Funded Nursing Care (FNC).",
    includes: ["2-hour consultation where appropriate", "Evidence and information review", "Written next-step roadmap", "Questions to raise with the relevant statutory bodies"]
  },
  {
    title: "CHC Assessment Preparation & Representation",
    price: "£1,200–£2,500 per case",
    detail: "Preparation support for families facing the CHC Checklist, Decision Support Tool (DST) or multidisciplinary assessment process.",
    includes: ["Audit and organisation of relevant care and medical records", "Evidence file mapped to CHC domains", "Checklist / DST meeting preparation", "Meeting attendance and advocacy where agreed"]
  },
  {
    title: "CHC Appeal & Review Support",
    price: "£150/hour or £1,500 fixed appeal-management package",
    detail: "Administrative and advocacy support when a CHC decision is disputed or funding is being reviewed.",
    includes: ["Appeal correspondence preparation", "Evidence and chronology organisation", "Identification of potential process issues for the family to raise", "Support at Local Resolution or review meetings where agreed"]
  },
  {
    title: "Active Advocacy & Administrative Support",
    price: "£50–£90 per hour",
    detail: "Practical support before and during difficult care-system meetings and form-filling processes.",
    includes: ["Meeting preparation and attendance", "Attendance Allowance and PIP form support", "Care correspondence and evidence organisation", "Administrative follow-up after meetings"]
  },
  {
    title: "Ongoing Care Coordination",
    price: "£150–£300 per month",
    detail: "Non-regulated coordination support for families managing several professionals, appointments and independent care arrangements.",
    includes: ["Regular family check-ins", "Administrative appointment coordination", "Review of independent-agency rota information supplied by the family", "Follow-up tracking and agreed action lists"]
  }
];

const digitalOffers = [
  {
    id: "chc-masterclass",
    title: "De-Mystifying CHC Masterclass",
    price: "Planned £49–£99",
    memberAccess: "Member inclusion: to be confirmed",
    detail: "A pre-recorded learning product explaining the NHS Continuing Healthcare Checklist, the Decision Support Tool and the role of nature, intensity, complexity and unpredictability in the primary-health-need decision.",
    format: "Planned format: video masterclass and/or comprehensive fillable guide",
    status: "Product in development"
  },
  {
    id: "evidence-trackers",
    title: "Care Assessment Evidence Trackers",
    price: "Planned £25",
    memberAccess: "Member inclusion: to be confirmed",
    detail: "Downloadable trackers designed to help families organise accurate, dated observations before an MDT, CHC review or other care-system meeting. Templates will focus on frequency, duration, risks, interventions and changes over time rather than trying to score eligibility independently.",
    format: "Planned format: fillable PDF + spreadsheet templates",
    status: "Product in development"
  },
  {
    id: "video-consultation",
    title: "1-to-1 Video Consultation",
    price: "Planned £150–£250 / 60 minutes",
    memberAccess: "Member discount/inclusion: to be confirmed",
    detail: "A focused 60-minute strategy session for families who want help organising the next practical steps, questions and evidence before engaging with an NHS or Local Authority process.",
    format: "Planned delivery: Zoom or Microsoft Teams with automated booking",
    status: "Booking system to be activated after final service rules are approved"
  }
];

export default function ServicesPage() {
  return (
    <div className={styles.page}>
      <PublicHeader />
      <main id="top">
        <section className={styles.hero}>
          <div className={styles.container}>
            <p className={styles.eyebrow}>Paid support</p>
            <h1>Experienced navigation and practical tools when the system becomes difficult.</h1>
            <p className={styles.lede}>The Clara Path combines hands-on administrative support with focused learning products, evidence tools and consultations for families who want more structured help.</p>
            <div className={styles.notice}><strong>Important professional boundary:</strong> The Clara Path does not provide medical diagnosis, clinical treatment decisions, regulated personal care, legal representation or regulated financial advice. Decisions about NHS funding, Local Authority support and state benefits remain with the relevant statutory body.</div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <p className={styles.eyebrow}>Hands-on services</p>
            <h2>Choose the level of support your family needs.</h2>
            <div className={styles.grid} style={{ marginTop: "2rem" }}>
              {services.map((service) => (
                <article className={styles.card} key={service.title}>
                  <p className={styles.eyebrow}>{service.price}</p>
                  <h3>{service.title}</h3>
                  <p>{service.detail}</p>
                  <ul>{service.includes.map((item) => <li key={item}>{item}</li>)}</ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="digital-services-heading">
          <div className={styles.container}>
            <p className={styles.eyebrow}>Digital products & consultations</p>
            <h2 id="digital-services-heading">Lower-cost ways to prepare before buying full case support.</h2>
            <p>Prices and subscriber access below are provisional while the final Carer’s Circle membership benefits are being set.</p>
            <div className={styles.grid} style={{ marginTop: "2rem" }}>
              {digitalOffers.map((offer) => (
                <article className={styles.card} id={offer.id} key={offer.id}>
                  <p className={styles.eyebrow}>{offer.price}</p>
                  <h3>{offer.title}</h3>
                  <p><strong>{offer.memberAccess}</strong></p>
                  <p>{offer.detail}</p>
                  <p>{offer.format}</p>
                  <div className={styles.notice}>{offer.status}</div>
                </article>
              ))}
            </div>
            <div className={styles.notice} style={{ marginTop: "2rem" }}>
              <strong>Commercial setup pending:</strong> checkout, member discounts/free entitlement rules and automated Zoom/Microsoft Teams booking will only be activated once final prices, refund/cancellation terms, booking availability and subscriber benefits are approved.
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.card}>
              <p className={styles.eyebrow}>Scope and professional boundaries</p>
              <h2>Administrative and system-navigation support — not direct care.</h2>
              <p>Our work is designed to help families understand processes, organise evidence, prepare questions, communicate clearly and participate effectively in meetings. We may help identify routes that appear relevant, but we do not determine eligibility or guarantee funding, benefits, appeal outcomes or care packages.</p>
              <p>Where a matter requires clinical judgement, legal advice, regulated financial advice or regulated personal care, the family should use the appropriate qualified or statutory professional.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
