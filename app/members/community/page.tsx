import type { Metadata } from "next";
import { CommunityBoard } from "./community-board";

export const metadata: Metadata = {
  title: "Carer’s Circle Community",
  robots: { index: false, follow: false }
};

export default function CommunityPage() {
  return (
    <main className="member-main">
      <div className="container">
        <header className="member-page-head">
          <p className="eyebrow">Private community</p>
          <h1>A quieter place for people who understand.</h1>
          <p className="lede">Ask practical questions, exchange general local knowledge and support one another inside the protected Carer’s Circle Member Area.</p>
        </header>

        <div className="notice">
          <strong>Privacy first:</strong> Do not post names, addresses, NHS numbers, benefit reference numbers, screenshots of letters, health records, case notes or other identifying details about the person you care for. Community discussion is peer support, not emergency, safeguarding, clinical, legal or regulated professional advice.
        </div>

        <CommunityBoard />
      </div>
    </main>
  );
}
