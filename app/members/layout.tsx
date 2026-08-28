import { getMemberSession, requireMember } from "../../lib/auth/session";
import { MemberAccountMenu } from "./member-account-menu";

const PUBLISHER_EMAILS = new Set(["victoriaolok@gmail.com", "wachaexperience@gmail.com"]);

export default async function MembersLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  await requireMember();
  const user = await getMemberSession();
  const isPublisher = Boolean(user?.email && PUBLISHER_EMAILS.has(user.email.toLowerCase()));

  return (
    <div className="member-shell">
      <header className="member-header">
        <nav className="container member-nav" aria-label="Member navigation">
          <a className="brand" href="/members" aria-label="The Clara Path Member Area home">
            <svg className="brand-mark" viewBox="0 0 42 42" aria-hidden="true">
              <path d="M33.2 8.4C24.5 6.2 16.9 10.1 13.6 17.4c-3.5 7.7.6 15.2 7.9 15.6 5.5.3 9.3-3.9 10.3-8.5" fill="none" stroke="#1e3a8a" strokeLinecap="round" strokeWidth="5" />
              <path d="M31.7 24.6c-1.5 4.6-5.4 8.5-10.2 8.5" fill="none" stroke="#4d7c0f" strokeLinecap="round" strokeWidth="5" />
              <circle cx="33" cy="10" r="4" fill="#4d7c0f" />
            </svg>
            <span className="brand-copy"><strong>The Clara Path</strong><span>Carer’s Circle member area</span></span>
          </a>
          <div className="member-actions">
            <a href="https://www.theclarapath.org/">← Main site</a>
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
