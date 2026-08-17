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
          <h1>Monthly learning and practical Q&amp;A.</h1>
          <p className="lede">The Circle’s live learning sessions are designed to help members prepare questions and understand reliable routes through health and social care systems.</p>
        </header>
        <article className="event-card">
          <span className="event-status">Event programme</span>
          <h2>Monthly Carer’s Circle Q&amp;A</h2>
          <p>Dates, access details and booking instructions will appear here once the programme is confirmed by The Clara Path. Sessions provide general education and signposting; they are not a setting for individual case assessment, urgent safeguarding concerns or clinical advice.</p>
        </article>
        <article className="event-card">
          <span className="event-status">Before you attend</span>
          <h2>Keep your questions general.</h2>
          <p>Please do not include names, medical-record details, benefit reference numbers, documents or personal addresses in any event question. If you need individual advice, seek help from the relevant qualified professional or statutory service.</p>
        </article>
      </div>
    </main>
  );
}
