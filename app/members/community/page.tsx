import type { Metadata } from "next";
import { CommunityBoard } from "./community-board";

export const metadata: Metadata = {
  title: "Carer’s Circle Community",
  robots: { index: false, follow: false }
};

const channels = [
  {
    label: "📌 Announcements & Introductions",
    detail: "Start here. Introduce yourself in general terms, say who you care for without identifying them, and share the care-system bottleneck you are currently trying to navigate. Victoria can also use this channel for Circle announcements."
  },
  {
    label: "⚖️ Care Act & CHC Disputes",
    detail: "Peer discussion about Local Authority assessments, social-care decisions, NHS Continuing Healthcare checklists or assessments, care-provider issues and routes for challenging decisions."
  },
  {
    label: "💰 Benefits & Grants",
    detail: "Keep benefit and funding questions together: PIP, Attendance Allowance, Carer’s Allowance, energy support, Disabled Facilities Grants and other relevant support routes."
  },
  {
    label: "🏠 Direct Payments & Home Support",
    detail: "Questions about Direct Payments, employing a personal assistant, home adaptations, care arrangements and practical support at home."
  },
  {
    label: "🤝 General Carer Support",
    detail: "For practical questions, useful local knowledge, small wins and general peer support that do not fit one of the specialist channels."
  }
];

export default function CommunityPage() {
  return (
    <main className="member-main">
      <div className="container">
        <header className="member-page-head">
          <p className="eyebrow">Private community</p>
          <h1>Find the right conversation quickly.</h1>
          <p className="lede">Carer’s Circle discussions are organised by topic so members can find relevant experiences and practical signposting without searching through one long feed.</p>
        </header>

        <div className="notice">
          <strong>Privacy first:</strong> Do not post names, addresses, NHS numbers, benefit reference numbers, screenshots of letters, health records, case notes or other identifying details about the person you care for. Community discussion is peer support, not emergency, safeguarding, clinical, legal or regulated professional advice.
        </div>

        <section aria-labelledby="community-channels-heading" style={{ marginTop: "2rem" }}>
          <div className="member-page-head">
            <p className="eyebrow">Discussion categories</p>
            <h2 id="community-channels-heading">The Community</h2>
          </div>
          <div className="resource-grid">
            {channels.map((channel) => (
              <article className="resource-card" key={channel.label}>
                <h3>{channel.label}</h3>
                <p>{channel.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <CommunityBoard />
      </div>
    </main>
  );
}
