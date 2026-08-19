"use client";

import { useState } from "react";

type MemberAccountMenuProps = {
  email?: string;
  name?: string;
};

export function MemberAccountMenu({ email, name }: MemberAccountMenuProps) {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const initials = (name || email || "M")
    .split(/[\s@]+/)
    .map((value) => value[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  async function signOut() {
    setIsSigningOut(true);
    await fetch("/api/auth/session", { method: "DELETE" });
    window.location.assign("/");
  }

  return (
    <details className="account-menu">
      <summary>
        <span className="account-avatar" aria-hidden="true">{initials}</span>
        <span>Account</span>
      </summary>
      <div className="account-panel">
        <p className="account-email">{email ?? "Member"}</p>
        <button className="account-signout" disabled={isSigningOut} onClick={signOut} type="button">
          {isSigningOut ? "Signing out…" : "Sign out"}
        </button>
      </div>
    </details>
  );
}
