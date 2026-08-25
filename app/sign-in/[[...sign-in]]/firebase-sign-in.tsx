"use client";

import {
  browserSessionPersistence,
  GoogleAuthProvider,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  type User
} from "firebase/auth";
import { type FormEvent, useState } from "react";
import { getFirebaseClientAuth, hasFirebaseClientConfig } from "../../../lib/firebase/client";

function memberDestination() {
  const destination = new URLSearchParams(window.location.search).get("redirect_url");
  return destination?.startsWith("/members") ? destination : "/members";
}

function GoogleIcon() {
  return (
    <svg className="google-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#EA4335" d="M12 10.1v4.3h6c-.3 1.4-1.9 4.2-6 4.2-3.6 0-6.6-3-6.6-6.6S8.4 5.4 12 5.4c2.1 0 3.5.9 4.3 1.7l2.9-2.8C17.4 2.7 14.9 1.7 12 1.7A10.3 10.3 0 1 0 22.3 12c0-.7-.1-1.3-.2-1.9H12Z" />
      <path fill="#4285F4" d="M22.3 12c0-.7-.1-1.3-.2-1.9H12v4.3h6c-.3 1.4-1.9 4.2-6 4.2v3.7c4.7 0 8.6-3.4 10-8.1.2-.7.3-1.4.3-2.2Z" />
      <path fill="#34A853" d="M12 22.3v-3.7c-3.6 0-6.6-3-6.6-6.6H1.7A10.3 10.3 0 0 0 12 22.3Z" />
      <path fill="#FBBC05" d="M5.4 12c0-2.3 1.2-4.3 3-5.5L5.5 3.7A10.3 10.3 0 0 0 1.7 12h3.7Z" />
    </svg>
  );
}

export function FirebaseSignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [isBusy, setIsBusy] = useState(false);

  async function createServerSession(user: User) {
    const idToken = await user.getIdToken(true);
    const response = await fetch("/api/auth/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken })
    });
    const payload = (await response.json().catch(() => null)) as { error?: string } | null;
    if (!response.ok) throw new Error(payload?.error ?? "We could not complete your sign-in.");
  }

  async function finishSignIn(user: User) {
    await createServerSession(user);
    window.location.assign(memberDestination());
  }

  async function signInWithGoogle() {
    setIsBusy(true);
    setStatus("Opening Google sign-in…");
    try {
      const auth = getFirebaseClientAuth();
      await setPersistence(auth, browserSessionPersistence);
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      const result = await signInWithPopup(auth, provider);
      await finishSignIn(result.user);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Google sign-in could not be completed.");
      setIsBusy(false);
    }
  }

  async function signInWithEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsBusy(true);
    setStatus("Signing you in securely…");
    try {
      const auth = getFirebaseClientAuth();
      await setPersistence(auth, browserSessionPersistence);
      const result = await signInWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
      await finishSignIn(result.user);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Email sign-in could not be completed.");
      setIsBusy(false);
    }
  }

  if (!hasFirebaseClientConfig()) {
    return <p className="auth-status">The Member Area is being connected securely. Please check back shortly.</p>;
  }

  return (
    <div className="auth-form">
      <button className="auth-google-button" disabled={isBusy} onClick={signInWithGoogle} type="button">
        <GoogleIcon />
        Continue with Google
      </button>
      <div className="auth-divider">or</div>
      <form className="auth-form" onSubmit={signInWithEmail}>
        <label className="auth-label" htmlFor="member-email">
          Email address
          <input autoComplete="email" className="auth-input" disabled={isBusy} id="member-email" onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" required type="email" value={email} />
        </label>
        <label className="auth-label" htmlFor="member-password">
          Password
          <input autoComplete="current-password" className="auth-input" disabled={isBusy} id="member-password" onChange={(event) => setPassword(event.target.value)} required type="password" value={password} />
        </label>
        <button className="auth-submit" disabled={isBusy} type="submit">Sign in</button>
      </form>
      {status ? <p className="auth-status">{status}</p> : null}
      <p className="auth-help">Membership is by invitation. Use the email address registered with The Clara Path.</p>
    </div>
  );
}
