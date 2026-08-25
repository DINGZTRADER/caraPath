import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Member events",
  robots: { index: false, follow: false }
};

export default function MemberEventsPage() {
  return (
    <main className="member-main">
      <div className="container">
        <header className="member-page-head">
          <p className="eyebrow">Carer’s Circle events</p>
          <h1>One focused hour each month.</h1>
          <p className="lede">The monthly Carer’s Circle group session is for practical learning, general questions and reliable signposting through UK health and social care systems.</p>
        </header>

        <article className="event-card">
          <span className="event-status">Monthly live session</span>
          <h2>Carer’s Circle — 1-hour group Q&amp;A</h2>
          <p>Victoria will host one live group session each month using Zoom or Google Meet. The date, start time and private joining link will appear on this page once each session is confirmed.</p>
          <p className="auth-help">The joining link should remain inside the protected Member Area rather than being posted publicly.</p>
        </article>

        <article className="event-card">
          <span className="event-status">Replay & learning library</span>
          <h2>YouTube can support the classroom.</h2>
          <p>Where a session is suitable for recording, an approved replay or edited educational clip can be added to the Resource Vault or linked here. Any recording should avoid individual case details and only be published with appropriate participant notice and consent.</p>
        </article>

        <article className="event-card">
          <span className="event-status">Before you attend</span>
          <h2>Keep questions general and anonymised.</h2>
          <p>Please do not include names, medical-record details, benefit reference numbers, documents or personal addresses in any event question. Sessions provide general education and signposting; they are not individual case assessment, urgent safeguarding support, clinical advice or legal representation.</p>
        </article>
      </div>
    </main>
  );
}
