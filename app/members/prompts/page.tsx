import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Member Conversation Prompts",
  robots: { index: false, follow: false }
};

const prompts = [
  {
    title: "The Small Win Celebration",
    body: "What is one small win you have had with the care system or your daily caring routine recently? It could be receiving a callback, getting through an appointment, completing a difficult form, receiving useful equipment, or simply finding twenty quiet minutes for yourself."
  },
  {
    title: "The Jargon Buster",
    body: "What phrase or acronym have you heard recently that left you wondering what it actually meant? Examples might include CHC, DFG, Direct Payments, EHCP, MDT or DST. Share the term and we can point towards a clear explanation and the relevant official information."
  },
  {
    title: "Local Authority Direct Payment Rates",
    body: "If your family uses Direct Payments, what information has your Local Authority given you about the hourly rate and what it is intended to cover? Share your council area and the general rate if you are comfortable doing so, but never post personal financial information or identifying case details."
  },
  {
    title: "PIP / Attendance Allowance Form Bottleneck",
    body: "If you are completing a PIP or Attendance Allowance form, which part are you finding hardest to explain? Describe your needs accurately, including how they vary and what happens on difficult days, without exaggerating or minimising them."
  },
  {
    title: "The Carer’s Respite Brainstorm",
    body: "Imagine you suddenly had four completely free hours every week: no appointments, paperwork or chores. What would you do first? Sometimes recognising what we are missing helps us understand the impact caring has on our own wellbeing."
  }
];

export default function PromptsPage() {
  return (
    <main className="member-main">
      <div className="container">
        <header className="member-page-head">
          <p className="eyebrow">Member conversation</p>
          <h1>This week in the Carer’s Circle.</h1>
          <p className="lede">New prompts can be shared regularly to help members learn from one another and make the Member Area feel useful and human, not like another information portal.</p>
        </header>

        <div className="notice">Please keep responses general. Do not post health records, benefit letters, addresses, account information or identifying details about the person you care for.</div>

        <section className="resource-grid" aria-label="Community prompts">
          {prompts.map((prompt, index) => (
            <article className="resource-card" key={prompt.title}>
              <span className="step-number">{String(index + 1).padStart(2, "0")}</span>
              <p className="eyebrow">Conversation prompt</p>
              <h3>{prompt.title}</h3>
              <p>{prompt.body}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
