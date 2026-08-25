"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, Timestamp, where } from "firebase/firestore";
import { getFirebaseClientFirestore } from "../../../lib/firebase/client";

type Prompt = {
  id: string;
  title: string;
  body: string;
  publishAt?: Timestamp;
};

const fallbackPrompts: Prompt[] = [
  { id: "small-win", title: "The Small Win Celebration", body: "What is one small win you have had with the care system or your daily caring routine recently? It could be receiving a callback, getting through an appointment, completing a difficult form, receiving useful equipment, or simply finding twenty quiet minutes for yourself." },
  { id: "jargon-buster", title: "The Jargon Buster", body: "What phrase or acronym have you heard recently that left you wondering what it actually meant? Examples might include CHC, DFG, Direct Payments, EHCP, MDT or DST. Share the term and we can point towards a clear explanation and the relevant official information." },
  { id: "direct-payment-rates", title: "Local Authority Direct Payment Rates", body: "If your family uses Direct Payments, what information has your Local Authority given you about the hourly rate and what it is intended to cover? Share your council area and the general rate if you are comfortable doing so, but never post personal financial information or identifying case details." },
  { id: "benefit-form-bottleneck", title: "PIP / Attendance Allowance Form Bottleneck", body: "If you are completing a PIP or Attendance Allowance form, which part are you finding hardest to explain? Describe your needs accurately, including how they vary and what happens on difficult days, without exaggerating or minimising them." },
  { id: "respite-brainstorm", title: "The Carer’s Respite Brainstorm", body: "Imagine you suddenly had four completely free hours every week: no appointments, paperwork or chores. What would you do first? Sometimes recognising what we are missing helps us understand the impact caring has on our own wellbeing." }
];

export function PromptFeed() {
  const [prompts, setPrompts] = useState<Prompt[]>(fallbackPrompts);
  const [source, setSource] = useState<"fallback" | "live">("fallback");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const db = getFirebaseClientFirestore();
        const q = query(
          collection(db, "memberPrompts"),
          where("publishAt", "<=", Timestamp.now()),
          orderBy("publishAt", "desc")
        );
        const snap = await getDocs(q);
        if (cancelled || snap.empty) return;
        const live = snap.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Omit<Prompt, "id">) }));
        setPrompts(live);
        setSource("live");
      } catch {
        // Keep the vetted starter prompts if Firestore is not yet active or temporarily unavailable.
      }
    }
    void load();
    return () => { cancelled = true; };
  }, []);

  return (
    <>
      {source === "live" ? <p className="eyebrow">Latest published prompts</p> : null}
      <section className="resource-grid" aria-label="Community prompts">
        {prompts.map((prompt, index) => (
          <article className="resource-card" key={prompt.id}>
            <span className="step-number">{String(index + 1).padStart(2, "0")}</span>
            <p className="eyebrow">Conversation prompt</p>
            <h3>{prompt.title}</h3>
            <p>{prompt.body}</p>
          </article>
        ))}
      </section>
    </>
  );
}
