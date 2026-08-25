import type { Metadata } from "next";
import { PromptFeed } from "./prompt-feed";

export const metadata: Metadata = {
  title: "Member Conversation Prompts",
  robots: { index: false, follow: false }
};

export default function PromptsPage() {
  return (
    <main className="member-main">
      <div className="container">
        <header className="member-page-head">
          <p className="eyebrow">Member conversation</p>
          <h1>This week in the Carer’s Circle.</h1>
          <p className="lede">New prompts are shared regularly to help members learn from one another and make the Member Area feel useful and human, not like another information portal.</p>
        </header>

        <div className="notice">Please keep responses general. Do not post health records, benefit letters, addresses, account information or identifying details about the person you care for.</div>

        <PromptFeed />
      </div>
    </main>
  );
}
