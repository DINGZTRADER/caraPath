import { requireMember } from "../../lib/auth/session";
import { MemberSignOut } from "./member-sign-out";

export default async function MembersLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const user = await requireMember();

  return (
    <div>
      <header className="member-header">
        <nav className="member-nav" aria-label="Member navigation">
          <a className="member-brand" href="/members">
            <svg className="brand-mark" viewBox="0 0 42 42" aria-hidden="true">
              <path d="M33.2 8.4C24.5 6.2 16.9 10.1 13.6 17.4c-3.5 7.7.6 15.2 7.9 15.6 5.5.3 9.3-3.9 10.3-8.5" fill="none" stroke="#1e3a8a" strokeLinecap="round" strokeWidth="5" />
              <path d="M31.7 24.6c-1.5 4.6-5.4 8.5-10.2 8.5" fill="none" stroke="#4d7c0f" strokeLinecap="round" strokeWidth="5" />
              <circle cx="33" cy="10" r="4" fill="#4d7c0f" />
            </svg>
            <span>The Clara Path</span>
          </a>
          <div className="member-actions">
            <a href="/members/resources">Resources</a>
            <a href="/members/events">Events</a>
            <a href="/members/calendar">Calendar</a>
            <span className="member-account">{user.email ?? "Member"}</span>
            <MemberSignOut />
          </div>
        </nav>
      </header>
      {children}
    </div>
  );
}
