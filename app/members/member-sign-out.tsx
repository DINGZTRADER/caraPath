"use client";

export function MemberSignOut() {
  async function signOut() {
    await fetch("/api/auth/session", { method: "DELETE" });
    window.location.assign("/sign-in");
  }

  return <button className="signout-button" type="button" onClick={signOut}>Sign out</button>;
}
