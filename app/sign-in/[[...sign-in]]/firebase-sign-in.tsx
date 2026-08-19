"use client";

import {
  browserSessionPersistence,
  getRedirectResult,
  GoogleAuthProvider,
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  setPersistence,
  signInWithEmailLink,
  signInWithRedirect,
  signOut,
  type User
} from "firebase/auth";
import { type FormEvent, useEffect, useState } from "react";
import { getFirebaseClientAuth, hasFirebaseClientConfig } from "../../../lib/firebase/client";

const EMAIL_STORAGE_KEY = "the-clara-path-email-for-sign-in";

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
  const [status, setStatus] = useState<string | null>(null);
  const [statusTone, setStatusTone] = useState<"error" | "success" | "neutral">("neutral");
  const [isBusy, setIsBusy] = useState(false);

  function showStatus(message: string, tone: "error" | "success" | "neutral" = "neutral") {
    setStatus(message);
    setStatusTone(tone);
  }

  async function createServerSession(user: User) {
    const idToken = await user.getIdToken(true);
    const response = await fetch("/api/auth/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken })
    });
    const payload = (await response.json().catch(() => null)) as { error?: string } | null;

    if (!response.ok) {
      throw new Error(payload?.error ?? "We could not complete your sign-in.");
    }
  }

  async function finishSignIn(user: User) {
    await createServerSession(user);
    await signOut(getFirebaseClientAuth());
    window.location.assign(memberDestination());
  }

  useEffect(() => {
    if (!hasFirebaseClientConfig()) return;

    const auth = getFirebaseClientAuth();
    let isActive = true;

    async function completePendingSignIn() {
      try {
        await setPersistence(auth, browserSessionPersistence);
        const redirectResult = await getRedirectResult(auth);

        if (redirectResult?.user) {
          if (isActive) setIsBusy(true);
          await finishSignIn(redirectResult.user);
          return;
        }

        if (!isSignInWithEmailLink(auth, window.location.href)) return;
        const savedEmail = window.localStorage.getItem(EMAIL_STORAGE_KEY);

        if (!savedEmail) {
          if (isActive) {
            setStatus("Enter the email address that received the sign-in link.");
            setStatusTone("neutral");
          }
          return;
        }

        if (isActive) setIsBusy(true);
        const result = await signInWithEmailLink(auth, savedEmail, window.location.href);
        window.localStorage.removeItem(EMAIL_STORAGE_KEY);
        await finishSignIn(result.user);
      } catch (error) {
        if (isActive) {
          showStatus(error instanceof Error ? error.message : "We could not complete your sign-in.", "error");
          setIsBusy(false);
        }
      }
    }

    void completePendingSignIn();
    return () => {
      isActive = false;
    };
  }, []);

  async function signInWithGoogle() {
    if (!hasFirebaseClientConfig()) return;

    setIsBusy(true);
    showStatus("Taking you to Google…");

    try {
      const auth = getFirebaseClientAuth();
      await setPersistence(auth, browserSessionPersistence);
      await signInWithRedirect(auth, new GoogleAuthProvider());
    } catch (error) {
      showStatus(error instanceof Error ? error.message : "Google sign-in could not start.", "error");
      setIsBusy(false);
    }
  }

  async function sendEmailLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !hasFirebaseClientConfig()) return;

    setIsBusy(true);
    showStatus("Sending your secure sign-in link…");

    try {
      const auth = getFirebaseClientAuth();
      await sendSignInLinkToEmail(auth, normalizedEmail, {
        url: window.location.href,
        handleCodeInApp: true
      });
      window.localStorage.setItem(EMAIL_STORAGE_KEY, normalizedEmail);
      showStatus("Check your email for a secure sign-in link.", "success");
    } catch (error) {
      showStatus(error instanceof Error ? error.message : "We could not send that sign-in link.", "error");
    } finally {
      setIsBusy(false);
    }
  }

  if (!hasFirebaseClientConfig()) {
    return <p className="auth-status" data-tone="neutral">The Member Area is being connected securely. Please check back shortly.</p>;
  }

  return (
    <div className="auth-form">
      <button className="auth-google-button" disabled={isBusy} onClick={signInWithGoogle} type="button">
        <GoogleIcon />
        Continue with Google
      </button>
      <div className="auth-divider">or</div>
      <form className="auth-form" onSubmit={sendEmailLink}>
        <label className="auth-label" htmlFor="member-email">
          Email address
          <input
            autoComplete="email"
            className="auth-input"
            disabled={isBusy}
            id="member-email"
            inputMode="email"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            required
            type="email"
            value={email}
          />
        </label>
        <button className="auth-submit" disabled={isBusy} type="submit">Email me a secure sign-in link</button>
      </form>
      {status ? <p className="auth-status" data-tone={statusTone}>{status}</p> : null}
      <p className="auth-help">Membership is by invitation. Use the email address registered with The Clara Path.</p>
    </div>
  );
}
