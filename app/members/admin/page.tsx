import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { requireMember } from "../../../lib/auth/session";
import { PromptPublisher } from "./prompt-publisher";

export const metadata: Metadata = {
  title: "Publisher Admin",
  robots: { index: false, follow: false }
};

const PUBLISHER_EMAILS = new Set(["victoriaolok@gmail.com", "wachaexperience@gmail.com"]);

export default async function MemberAdminPage() {
  const session = await requireMember();
  const email = session.email?.toLowerCase();
  if (!email || !PUBLISHER_EMAILS.has(email)) redirect("/members");

  return (
    <main className="member-main">
      <div className="container">
        <header className="member-page-head">
          <p className="eyebrow">Publisher admin</p>
          <h1>Publish Member Circle prompts without touching the website code.</h1>
          <p className="lede">Write a prompt, publish it immediately, schedule it for later, or keep it as a draft. Members only see prompts once their publication time arrives.</p>
        </header>
        <div className="notice">Do not include member names, case records, health information or other identifying personal data in prompts.</div>
        <PromptPublisher />
      </div>
    </main>
  );
}
