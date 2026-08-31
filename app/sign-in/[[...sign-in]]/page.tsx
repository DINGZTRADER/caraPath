import { FirebaseSignIn } from "./firebase-sign-in";

export default function SignInPage() {
  return (
    <main className="auth-shell">
      <section className="auth-card" aria-labelledby="sign-in-heading">
        <a className="auth-brand" href="https://www.theclarapath.org/" aria-label="Return to The Clara Path home">
          <svg className="brand-mark" viewBox="0 0 48 48" aria-hidden="true">
            <path d="M9 33.5C15.5 33.5 18.7 28.5 23.3 21.2C27 15.2 30.7 11.4 39 11.4" fill="none" stroke="#1e3a8a" strokeLinecap="round" strokeWidth="5" />
            <circle cx="39" cy="11.4" r="4.3" fill="#5f7f37" />
            <path d="M9 39h30" stroke="#9bb986" strokeLinecap="round" strokeWidth="3" />
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
