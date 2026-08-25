"use client";

import { FormEvent, useEffect, useState } from "react";
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, serverTimestamp, Timestamp } from "firebase/firestore";
import { getFirebaseClientFirestore } from "../../../lib/firebase/client";

type AdminPrompt = {
  id: string;
  title: string;
  body: string;
  publishAt?: Timestamp | null;
};

function formatDate(value?: Timestamp | null) {
  if (!value) return "Draft";
  return value.toDate().toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" });
}

export function PromptPublisher() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [publishAt, setPublishAt] = useState("");
  const [items, setItems] = useState<AdminPrompt[]>([]);
  const [status, setStatus] = useState("Loading publisher…");
  const [busy, setBusy] = useState(false);

  async function refresh() {
    try {
      const db = getFirebaseClientFirestore();
      const snap = await getDocs(query(collection(db, "memberPrompts"), orderBy("createdAt", "desc")));
      setItems(snap.docs.map((item) => ({ id: item.id, ...(item.data() as Omit<AdminPrompt, "id">) })));
      setStatus("Ready");
    } catch {
      setStatus("Publishing storage is not active yet. Enable Cloud Firestore and deploy the supplied security rules.");
    }
  }

  useEffect(() => { void refresh(); }, []);

  async function save(mode: "draft" | "publish") {
    if (!title.trim() || !body.trim()) {
      setStatus("Add a title and prompt text first.");
      return;
    }
    setBusy(true);
    try {
      const db = getFirebaseClientFirestore();
      const data: Record<string, unknown> = {
        title: title.trim(),
        body: body.trim(),
        createdAt: serverTimestamp(),
        createdBy: "victoriaolok@gmail.com"
      };
      if (mode === "publish") {
        data.publishAt = publishAt ? Timestamp.fromDate(new Date(publishAt)) : Timestamp.now();
      }
      await addDoc(collection(db, "memberPrompts"), data);
      setTitle(""); setBody(""); setPublishAt("");
      setStatus(mode === "draft" ? "Draft saved." : publishAt ? "Prompt scheduled." : "Prompt published.");
      await refresh();
    } catch {
      setStatus("Could not save. Check that Firestore is active and the Clara Path security rules are deployed.");
    } finally {
      setBusy(false);
    }
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    await save("publish");
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this prompt?")) return;
    try {
      await deleteDoc(doc(getFirebaseClientFirestore(), "memberPrompts", id));
      setStatus("Prompt deleted.");
      await refresh();
    } catch {
      setStatus("Could not delete this prompt.");
    }
  }

  return (
    <div className="admin-publisher">
      <form className="auth-card" onSubmit={onSubmit} style={{ maxWidth: 760 }}>
        <p className="eyebrow">Create a member prompt</p>
        <label className="auth-label">Title
          <input className="auth-input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Small Win Friday" maxLength={120} />
        </label>
        <label className="auth-label">Prompt text
          <textarea className="auth-input" value={body} onChange={(e) => setBody(e.target.value)} rows={8} placeholder="Write the question or discussion prompt members will see." maxLength={2200} />
        </label>
        <label className="auth-label">Publish date and time (optional)
          <input className="auth-input" type="datetime-local" value={publishAt} onChange={(e) => setPublishAt(e.target.value)} />
        </label>
        <div className="hero-actions">
          <button className="button button-primary" type="submit" disabled={busy}>{publishAt ? "Schedule prompt" : "Publish now"}</button>
          <button className="button button-secondary" type="button" disabled={busy} onClick={() => void save("draft")}>Save draft</button>
        </div>
        <p className="auth-help" aria-live="polite">{status}</p>
      </form>

      <section style={{ marginTop: "2.5rem" }} aria-labelledby="published-prompts-heading">
        <div className="member-page-head">
          <p className="eyebrow">Publishing queue</p>
          <h2 id="published-prompts-heading">Drafts, scheduled and published prompts.</h2>
        </div>
        <div className="resource-grid">
          {items.map((item) => (
            <article className="resource-card" key={item.id}>
              <p className="eyebrow">{formatDate(item.publishAt)}</p>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <button className="button button-secondary" type="button" onClick={() => void remove(item.id)}>Delete</button>
            </article>
          ))}
          {!items.length && <div className="notice">No Firestore prompts have been created yet. The five starter prompts remain visible to members.</div>}
        </div>
      </section>
    </div>
  );
}
