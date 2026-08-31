import { getMemberSession, requireMember } from "../../lib/auth/session";
import { MemberAccountMenu } from "./member-account-menu";
import "./member-nav.css";

const PUBLISHER_EMAILS = new Set(["victoriaolok@gmail.com", "wachaexperience@gmail.com"]);

export default async function MembersLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  await requireMember();
  const user = await getMemberSession();
  const isPublisher = Boolean(user?.email && PUBLISHER_EMAILS.has(user.email.toLowerCase()));

  return (
    <div className="member-shell">
      <div className="member-return-bar">
        <div className="container">
          <a className="member-main-site-link" href="https://www.theclarapath.org/">
            <span aria-hidden="true">←</span> Back to main website
          </a>
        </div>
      </div>
      <header className="member-header">
        <nav className="container member-nav" aria-label="Member navigation">
          <a className="brand" href="/members" aria-label="The Clara Path Member Area home">
            <svg className="brand-mark" viewBox="0 0 48 48" aria-hidden="true">
              <path d="M9 33.5C15.5 33.5 18.7 28.5 23.3 21.2C27 15.2 30.7 11.4 39 11.4" fill="none" stroke="#1e3a8a" strokeLinecap="round" strokeWidth="5" />
              <circle cx="39" cy="11.4" r="4.3" fill="#5f7f37" />
              <path d="M9 39h30" stroke="#9bb986" strokeLinecap="round" strokeWidth="3" />
            </svg>
            <span className="brand-copy"><strong>The Clara Path</strong><span>Carer’s Circle member area</span></span>
          </a>
          <div className="member-actions">
            <a href="/members/resources">Resource Vault</a>
            <a href="/members/prompts">Prompts</a>
            <a href="/members/community">Community</a>
            <a href="/members/recommendations">Recommendations</a>
            <a href="/members/calendar">Calendar</a>
            <a href="/members/events">Events</a>
            {isPublisher ? <a href="/members/admin">Publisher</a> : null}
            <MemberAccountMenu email={user?.email} name={user?.name} />
          </div>
        </nav>
      </header>
      {children}
    </div>
  );
}
