"use client";

import { FormEvent, useState } from "react";

export function FreeGuideLeadForm() {
  const [email, setEmail] = useState("");
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [website, setWebsite] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setStatus("Unlocking your starter guide…");
    setDownloadUrl(null);

    try {
      const response = await fetch("/api/free-guide-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, marketingOptIn, website }),
      });
      const payload = (await response.json()) as { error?: string; downloadUrl?: string };
      if (!response.ok || !payload.downloadUrl) {
        throw new Error(payload.error || "Could not unlock the guide.");
      }
      setDownloadUrl(payload.downloadUrl);
      setStatus("Your starter guide is ready.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not unlock the guide.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="auth-card" onSubmit={submit} style={{ maxWidth: 620 }}>
      <p className="eyebrow">Free starter pages</p>
      <h2 style={{ fontSize: "1.8rem" }}>Send me the Care Assessment Starter.</h2>
      <p>Enter your email to unlock the free fillable PDF. You do not need to become a member to download it.</p>

      <label className="auth-label">
        Email address
        <input
          className="auth-input"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
        />
      </label>

      <label style={{ display: "flex", gap: "0.65rem", alignItems: "flex-start", margin: "0.9rem 0" }}>
        <input
          type="checkbox"
          checked={marketingOptIn}
          onChange={(event) => setMarketingOptIn(event.target.checked)}
          style={{ marginTop: "0.2rem" }}
        />
        <span>I would also like occasional Clara Path updates and new carer resources by email. This is optional and is not required to receive the free guide.</span>
      </label>

      <div style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }} aria-hidden="true">
        <label>Website<input tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} /></label>
      </div>

      <button className="button button-primary" type="submit" disabled={busy}>
        {busy ? "Unlocking…" : "Unlock free guide"}
      </button>

      <p className="auth-help" aria-live="polite">{status}</p>

      {downloadUrl ? (
        <div className="notice" style={{ marginTop: "1rem" }}>
          <strong>Ready:</strong> <a href={downloadUrl}>Download the free fillable starter PDF →</a>
          <p style={{ marginBottom: 0 }}>Premium members receive the complete UK Care Assessment Prep Guide with all 10 eligibility outcomes, the two-week logbook, meeting cheat sheet and the full Resource Vault.</p>
        </div>
      ) : null}

      <p className="auth-help">We use your email to provide and measure this free resource. Promotional emails are only for people who tick the optional updates box.</p>
    </form>
  );
}
