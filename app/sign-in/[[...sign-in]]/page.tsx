import { FirebaseSignIn } from "./firebase-sign-in";

export default function SignInPage() {
  return (
    <main className="auth-shell">
      <section className="auth-card" aria-labelledby="sign-in-heading">
        <a className="auth-brand" href="https://www.theclarapath.org/" aria-label="Return to The Clara Path home">
          <svg className="brand-mark" viewBox="0 0 42 42" aria-hidden="true">
            <path d="M33.2 8.4C24.5 6.2 16.9 10.1 13.6 17.4c-3.5 7.7.6 15.2 7.9 15.6 5.5.3 9.3-3.9 10.3-8.5" fill="none" stroke="#1e3a8a" strokeLinecap="round" strokeWidth="5" />
            <path d="M31.7 24.6c-1.5 4.6-5.4 8.5-10.2 8.5" fill="none" stroke="#4d7c0f" strokeLinecap="round" strokeWidth="5" />
            <circle cx="33" cy="10" r="4" fill="#4d7c0f" />
          </svg>
          <strong>The Clara Path</strong>
        </a>
        <h1 id="sign-in-heading">Member sign in</h1>
        <p>Use Google or your registered email address to access the Carer’s Circle Member Area.</p>
        <div className="notice">For your privacy, do not enter health records, case notes or identifying details about the person you care for.</div>
        <FirebaseSignIn />
      </section>
    </main>
  );
}
