import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trusted Recommendations",
  robots: { index: false, follow: false }
};

type Recommendation = {
  category: string;
  title: string;
  organisation: string;
  detail: string;
  why: string;
  href: string;
  action: string;
  commercial?: boolean;
};

const recommendations: Recommendation[] = [
  {
    category: "Care providers",
    title: "Find and compare regulated care services",
    organisation: "Care Quality Commission (CQC)",
    detail: "Search care homes, home-care agencies and other regulated health and social-care services in England by service type, name or location.",
    why: "CQC is England's independent regulator of health and social care. Its service pages provide registration details, inspection information and ratings where applicable.",
    href: "https://www.cqc.org.uk/care-services",
    action: "Search CQC care services"
  },
  {
    category: "Daily-living aids",
    title: "Explore independent-living equipment",
    organisation: "Living Made Easy",
    detail: "Browse practical aids, devices and equipment for mobility, bathing, dressing, cooking, communication, safety and other everyday activities.",
    why: "Living Made Easy provides broad equipment information and impartial guidance designed to help people understand what types of products may be useful before buying.",
    href: "https://livingmadeeasy.org.uk/",
    action: "Explore Living Made Easy"
  },
  {
    category: "Daily-living aids",
    title: "Get personalised equipment suggestions",
    organisation: "AskSARA",
    detail: "Answer questions about a daily-living difficulty and receive a personalised report with practical advice, equipment ideas and further sources of help.",
    why: "AskSARA is designed as a self-help decision aid and can be a useful starting point before discussing equipment with an occupational therapist, council or other professional.",
    href: "https://asksara.livingmadeeasy.org.uk/",
    action: "Start AskSARA"
  },
  {
    category: "Equipment & adaptations",
    title: "Check NHS guidance before buying equipment",
    organisation: "NHS",
    detail: "Read about household gadgets, equipment, home adaptations, telecare, walking aids and routes to council assessment and support.",
    why: "A needs or home assessment may identify equipment or adaptations that can be provided or funded through statutory services, so private purchase should not always be the first step.",
    href: "https://www.nhs.uk/social-care-and-support/care-services-equipment-and-care-homes/",
    action: "Open NHS equipment guidance"
  },
  {
    category: "Assistive technology",
    title: "Understand how technology can support caring",
    organisation: "Carers UK",
    detail: "Explore practical guidance on technology for organisation, home safety, medication support, communication and maintaining independence.",
    why: "Carers UK focuses specifically on unpaid carers and explains both the benefits and practical considerations of introducing technology into a caring situation.",
    href: "https://www.carersuk.org/help-and-advice/technology-and-equipment/how-tech-can-help-with-caring/",
    action: "Read Carers UK guidance"
  },
  {
    category: "Planning & coordination",
    title: "Coordinate care with family and friends",
    organisation: "Jointly by Carers UK",
    detail: "A mobile and online care-coordination app designed for carers, with shared tasks, notes, calendar information and medication-management features.",
    why: "Jointly is developed by Carers UK specifically to help people involved in a caring situation keep information and responsibilities organised in one place.",
    href: "https://www.carersuk.org/help-and-advice/technology-and-equipment/jointly-app-for-carers/",
    action: "Learn about Jointly",
    commercial: true
  },
  {
    category: "Assistive technology",
    title: "Research assistive and accessible technology",
    organisation: "GOV.UK",
    detail: "A practical government guide to understanding assistive and accessible technology, assessments, purchasing considerations and sources of support.",
    why: "Useful when a member wants to understand the wider assistive-technology landscape before choosing a device, supplier or paid assessment.",
    href: "https://www.gov.uk/government/publications/using-assistive-and-accessible-technology-atech/using-assistive-and-accessible-technology-atech",
    action: "Read GOV.UK ATech guidance"
  }
];

export default function RecommendationsPage() {
  return (
    <main className="member-main">
      <div className="container">
        <header className="member-page-head">
          <p className="eyebrow">Trusted recommendations</p>
          <h1>Useful starting points, tools and services for everyday caring.</h1>
          <p className="lede">
            A carefully selected member directory focused on reputable official sources, established carer organisations and practical tools. We do not rank providers or promise that any product or service will suit an individual situation.
          </p>
        </header>

        <div className="notice" style={{ marginBottom: "2rem" }}>
          <strong>Before spending money:</strong> equipment, adaptations and care services may sometimes be available through the NHS, your Local Authority or another statutory route following an assessment. Check those routes first where appropriate.
        </div>

        <section aria-labelledby="recommendations-heading">
          <div className="member-page-head">
            <p className="eyebrow">Reviewed starting points</p>
            <h2 id="recommendations-heading">Where we would start.</h2>
            <p>Initial directory reviewed August 2026. External services, prices, eligibility and ratings can change, so always check the linked organisation directly before acting.</p>
          </div>

          <div className="resource-grid">
            {recommendations.map((item, index) => (
              <article className="resource-card" key={`${item.organisation}-${item.title}`}>
                <span className="step-number">{String(index + 1).padStart(2, "0")}</span>
                <p className="eyebrow">{item.category}</p>
                <h3>{item.title}</h3>
                <p><strong>{item.organisation}</strong></p>
                <p>{item.detail}</p>
                <p style={{ marginTop: "0.85rem" }}><strong>Why it is included:</strong> {item.why}</p>
                {item.commercial ? (
                  <p style={{ marginTop: "0.85rem", fontSize: ".85rem" }}><strong>Cost note:</strong> This service may involve a purchase or subscription. Check the provider's current terms before signing up.</p>
                ) : null}
                <a href={item.href} target="_blank" rel="noreferrer">{item.action}</a>
              </article>
            ))}
          </div>
        </section>

        <section style={{ marginTop: "3rem" }} aria-labelledby="provider-check-heading">
          <div className="member-page-head">
            <p className="eyebrow">Choosing a care provider</p>
            <h2 id="provider-check-heading">Check before you commit.</h2>
          </div>
          <div className="steps">
            <article className="step">
              <span className="step-number">01</span>
              <h3>Check CQC registration</h3>
              <p>For services regulated in England, confirm the provider and relevant location on the CQC website and read the latest available assessment or inspection information.</p>
            </article>
            <article className="step">
              <span className="step-number">02</span>
              <h3>Ask what is actually included</h3>
              <p>Clarify hourly or weekly charges, minimum visits, cancellation terms, travel charges, staffing arrangements, continuity of carers and what happens when needs change.</p>
            </article>
            <article className="step">
              <span className="step-number">03</span>
              <h3>Match the service to the person's needs</h3>
              <p>A good reputation does not automatically make a service suitable. Consider the person's assessed needs, communication, accessibility, safeguarding and any specialist requirements.</p>
            </article>
          </div>
        </section>

        <div className="notice" style={{ marginTop: "2rem" }}>
          <strong>Commercial and affiliate transparency:</strong> The Clara Path currently receives no commission from the organisations listed on this page. If an affiliate or commercial relationship is introduced later, it will be clearly labelled beside the relevant recommendation. Inclusion is not a guarantee, endorsement of every service offered, or substitute for an individual assessment or professional advice.
        </div>
      </div>
    </main>
  );
}
