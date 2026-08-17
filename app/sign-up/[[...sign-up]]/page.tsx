import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="auth-shell">
      <section className="auth-card" aria-labelledby="sign-up-heading">
        <a className="auth-brand" href="/" aria-label="Return to The Clara Path home">
          <svg className="brand-mark" viewBox="0 0 42 42" aria-hidden="true">
            <path d="M33.2 8.4C24.5 6.2 16.9 10.1 13.6 17.4c-3.5 7.7.6 15.2 7.9 15.6 5.5.3 9.3-3.9 10.3-8.5" fill="none" stroke="#1e3a8a" strokeLinecap="round" strokeWidth="5" />
            <path d="M31.7 24.6c-1.5 4.6-5.4 8.5-10.2 8.5" fill="none" stroke="#4d7c0f" strokeLinecap="round" strokeWidth="5" />
            <circle cx="33" cy="10" r="4" fill="#4d7c0f" />
          </svg>
          <strong>The Clara Path</strong>
        </a>
        <h1 id="sign-up-heading">Carer’s Circle access</h1>
        <p>Membership is administered by The Clara Path. Use the email address linked to your invitation.</p>
        <SignUp />
      </section>
    </main>
  );
}
