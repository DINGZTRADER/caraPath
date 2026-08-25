"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  Timestamp
} from "firebase/firestore";
import { getFirebaseClientAuth, getFirebaseClientFirestore } from "../../../lib/firebase/client";

type CommunityReply = {
  id: string;
  body: string;
  authorEmail: string;
  authorLabel: string;
  createdAt?: Timestamp | null;
};

type CommunityPost = {
  id: string;
  title: string;
  body: string;
  category: string;
  authorEmail: string;
  authorLabel: string;
  createdAt?: Timestamp | null;
  replies: CommunityReply[];
};

type CommunityReport = {
  id: string;
  kind: "post" | "reply";
  targetId: string;
  postId: string;
  reportedBy: string;
  createdAt?: Timestamp | null;
  status: "open";
};

const MODERATOR_EMAILS = new Set(["victoriaolok@gmail.com", "wachaexperience@gmail.com"]);
const categories = ["Practical question", "Local knowledge", "Small win", "General support"];

function dateLabel(value?: Timestamp | null) {
  if (!value) return "Just now";
  return value.toDate().toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" });
}

function safeDisplayName(email: string | null | undefined, displayName: string | null | undefined) {
  const clean = displayName?.trim();
  if (clean) return clean.split(/\s+/).slice(0, 2).join(" ");
  return email?.split("@")[0] || "Member";
}

export function CommunityBoard() {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [reports, setReports] = useState<CommunityReport[]>([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [replyText, setReplyText] = useState<Record<string, string>>({});
  const [status, setStatus] = useState("Checking community access…");
  const [busy, setBusy] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [authKnown, setAuthKnown] = useState(false);

  const isModerator = useMemo(() => Boolean(userEmail && MODERATOR_EMAILS.has(userEmail.toLowerCase())), [userEmail]);

  async function refresh() {
    const auth = getFirebaseClientAuth();
    const user = auth.currentUser;
    if (!user?.email) {
      setStatus("Your secure member page is open, but the Firebase community session is missing. Use ‘Refresh community sign-in’ below.");
      return;
    }

    try {
      const db = getFirebaseClientFirestore();
      const postSnap = await getDocs(query(collection(db, "communityPosts"), orderBy("createdAt", "desc"), limit(50)));
      const loaded = await Promise.all(postSnap.docs.map(async (postDoc) => {
        const replySnap = await getDocs(query(collection(db, "communityPosts", postDoc.id, "replies"), orderBy("createdAt", "asc"), limit(100)));
        return {
          id: postDoc.id,
          ...(postDoc.data() as Omit<CommunityPost, "id" | "replies">),
          replies: replySnap.docs.map((replyDoc) => ({ id: replyDoc.id, ...(replyDoc.data() as Omit<CommunityReply, "id">) }))
        };
      }));
      setPosts(loaded);

      if (MODERATOR_EMAILS.has(user.email.toLowerCase())) {
        const reportSnap = await getDocs(query(collection(db, "communityReports"), orderBy("createdAt", "desc"), limit(50)));
        setReports(reportSnap.docs.map((reportDoc) => ({ id: reportDoc.id, ...(reportDoc.data() as Omit<CommunityReport, "id">) })));
      } else {
        setReports([]);
      }
      setStatus("Community ready.");
    } catch (error) {
      setStatus(error instanceof Error ? `Community error: ${error.message}` : "Could not load the community.");
    }
  }

  useEffect(() => {
    const auth = getFirebaseClientAuth();
    return onAuthStateChanged(auth, (user) => {
      setAuthKnown(true);
      setUserEmail(user?.email ?? null);
      void refresh();
    });
  }, []);

  async function refreshCommunitySignIn() {
    setBusy(true);
    setStatus("Refreshing secure community sign-in…");
    try {
      await fetch("/api/auth/session", { method: "DELETE" });
      await firebaseSignOut(getFirebaseClientAuth()).catch(() => undefined);
    } finally {
      window.location.assign("/sign-in?redirect_url=%2Fmembers%2Fcommunity");
    }
  }

  async function createPost(event: FormEvent) {
    event.preventDefault();
    const auth = getFirebaseClientAuth();
    const user = auth.currentUser;
    if (!user?.email) {
      setStatus("Community sign-in is not active. Use ‘Refresh community sign-in’ and sign in with Google again.");
      return;
    }
    if (!title.trim() || !body.trim()) {
      setStatus("Add a discussion title and message first.");
      return;
    }

    setBusy(true);
    setStatus("Posting…");
    try {
      await addDoc(collection(getFirebaseClientFirestore(), "communityPosts"), {
        title: title.trim(),
        body: body.trim(),
        category,
        authorEmail: user.email.toLowerCase(),
        authorLabel: safeDisplayName(user.email, user.displayName),
        createdAt: serverTimestamp()
      });
      setTitle("");
      setBody("");
      setCategory(categories[0]);
      setStatus("Posted to the Carer’s Circle.");
      await refresh();
    } catch (error) {
      setStatus(error instanceof Error ? `Could not post: ${error.message}` : "Could not post this discussion.");
    } finally {
      setBusy(false);
    }
  }

  async function addReply(postId: string) {
    const auth = getFirebaseClientAuth();
    const user = auth.currentUser;
    const text = replyText[postId]?.trim();
    if (!text) {
      setStatus("Write a reply first.");
      return;
    }
    if (!user?.email) {
      setStatus("Community sign-in is not active. Use ‘Refresh community sign-in’ and sign in again.");
      return;
    }

    try {
      await addDoc(collection(getFirebaseClientFirestore(), "communityPosts", postId, "replies"), {
        body: text,
        authorEmail: user.email.toLowerCase(),
        authorLabel: safeDisplayName(user.email, user.displayName),
        createdAt: serverTimestamp()
      });
      setReplyText((current) => ({ ...current, [postId]: "" }));
      setStatus("Reply added.");
      await refresh();
    } catch (error) {
      setStatus(error instanceof Error ? `Could not reply: ${error.message}` : "Could not add this reply.");
    }
  }

  async function removePost(post: CommunityPost) {
    if (!window.confirm("Delete this discussion?")) return;
    try {
      for (const reply of post.replies) {
        await deleteDoc(doc(getFirebaseClientFirestore(), "communityPosts", post.id, "replies", reply.id));
      }
      await deleteDoc(doc(getFirebaseClientFirestore(), "communityPosts", post.id));
      setStatus("Discussion removed.");
      await refresh();
    } catch (error) {
      setStatus(error instanceof Error ? `Could not delete: ${error.message}` : "Could not delete this discussion.");
    }
  }

  async function removeReply(postId: string, replyId: string) {
    if (!window.confirm("Delete this reply?")) return;
    try {
      await deleteDoc(doc(getFirebaseClientFirestore(), "communityPosts", postId, "replies", replyId));
      setStatus("Reply removed.");
      await refresh();
    } catch (error) {
      setStatus(error instanceof Error ? `Could not delete: ${error.message}` : "Could not delete this reply.");
    }
  }

  async function report(kind: "post" | "reply", targetId: string, postId: string) {
    const auth = getFirebaseClientAuth();
    const user = auth.currentUser;
    if (!user?.email) {
      setStatus("Community sign-in is not active. Refresh community sign-in before flagging content.");
      return;
    }
    if (!window.confirm("Flag this content for moderator review?")) return;
    try {
      await addDoc(collection(getFirebaseClientFirestore(), "communityReports"), {
        kind,
        targetId,
        postId,
        reportedBy: user.email.toLowerCase(),
        createdAt: serverTimestamp(),
        status: "open"
      });
      setStatus("Thanks. This has been flagged for moderator review.");
    } catch (error) {
      setStatus(error instanceof Error ? `Could not flag: ${error.message}` : "Could not flag this content.");
    }
  }

  async function dismissReport(id: string) {
    if (!window.confirm("Mark this report as reviewed and remove it from the queue?")) return;
    try {
      await deleteDoc(doc(getFirebaseClientFirestore(), "communityReports", id));
      setStatus("Report cleared.");
      await refresh();
    } catch (error) {
      setStatus(error instanceof Error ? `Could not clear report: ${error.message}` : "Could not clear this report.");
    }
  }

  function reportedContent(reportItem: CommunityReport) {
    const post = posts.find((item) => item.id === reportItem.postId);
    if (!post) return "Content may already have been removed.";
    if (reportItem.kind === "post") return `${post.title}: ${post.body}`;
    const reply = post.replies.find((item) => item.id === reportItem.targetId);
    return reply ? `${post.title} — reply: ${reply.body}` : "Reply may already have been removed.";
  }

  return (
    <div className="admin-publisher">
      <form className="auth-card" onSubmit={createPost} style={{ maxWidth: 760 }}>
        <p className="eyebrow">Start a discussion</p>
        <label className="auth-label">Topic
          <select className="auth-input" value={category} onChange={(event) => setCategory(event.target.value)}>
            {categories.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label className="auth-label">Title
          <input className="auth-input" maxLength={120} value={title} onChange={(event) => setTitle(event.target.value)} placeholder="What would you like to ask or share?" />
        </label>
        <label className="auth-label">Message
          <textarea className="auth-input" maxLength={2200} rows={6} value={body} onChange={(event) => setBody(event.target.value)} placeholder="Keep details general and remove names, addresses, reference numbers and medical records." />
        </label>
        <div className="hero-actions">
          <button className="button button-primary" disabled={busy} type="submit">{busy ? "Working…" : "Post to community"}</button>
          {authKnown && !userEmail ? (
            <button className="button button-secondary" disabled={busy} type="button" onClick={() => void refreshCommunitySignIn()}>
              Refresh community sign-in
            </button>
          ) : null}
        </div>
        <p className="auth-help" aria-live="polite">{status}</p>
      </form>

      {isModerator ? (
        <section style={{ marginTop: "2.5rem" }} aria-labelledby="moderation-heading">
          <div className="member-page-head">
            <p className="eyebrow">Moderator review</p>
            <h2 id="moderation-heading">Flagged community content.</h2>
          </div>
          <div className="resource-grid">
            {reports.map((reportItem) => (
              <article className="resource-card" key={reportItem.id}>
                <p className="eyebrow">{reportItem.kind} · {dateLabel(reportItem.createdAt)}</p>
                <h3>Member flag</h3>
                <p>{reportedContent(reportItem)}</p>
                <button className="button button-secondary" type="button" onClick={() => void dismissReport(reportItem.id)}>Clear report</button>
              </article>
            ))}
            {!reports.length ? <div className="notice">No community reports need review.</div> : null}
          </div>
        </section>
      ) : null}

      <section style={{ marginTop: "2.5rem" }} aria-label="Community discussions">
        <div className="resource-grid">
          {posts.map((post) => {
            const canDeletePost = isModerator || post.authorEmail.toLowerCase() === userEmail?.toLowerCase();
            return (
              <article className="resource-card" key={post.id}>
                <p className="eyebrow">{post.category} · {dateLabel(post.createdAt)}</p>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
                <p className="auth-help">Shared by {post.authorLabel}</p>
                <div className="hero-actions">
                  {!canDeletePost ? <button className="button button-secondary" type="button" onClick={() => void report("post", post.id, post.id)}>Flag for review</button> : null}
                  {canDeletePost ? <button className="button button-secondary" type="button" onClick={() => void removePost(post)}>{isModerator && post.authorEmail.toLowerCase() !== userEmail?.toLowerCase() ? "Moderator remove" : "Delete"}</button> : null}
                </div>

                <div style={{ marginTop: "1.5rem" }}>
                  {post.replies.map((reply) => {
                    const canDeleteReply = isModerator || reply.authorEmail.toLowerCase() === userEmail?.toLowerCase();
                    return (
                      <div className="notice" key={reply.id} style={{ marginBottom: "0.75rem" }}>
                        <p><strong>{reply.authorLabel}</strong> · {dateLabel(reply.createdAt)}</p>
                        <p>{reply.body}</p>
                        <div className="hero-actions">
                          {!canDeleteReply ? <button className="button button-secondary" type="button" onClick={() => void report("reply", reply.id, post.id)}>Flag</button> : null}
                          {canDeleteReply ? <button className="button button-secondary" type="button" onClick={() => void removeReply(post.id, reply.id)}>Delete reply</button> : null}
                        </div>
                      </div>
                    );
                  })}

                  <label className="auth-label">Reply
                    <textarea className="auth-input" maxLength={1200} rows={3} value={replyText[post.id] ?? ""} onChange={(event) => setReplyText((current) => ({ ...current, [post.id]: event.target.value }))} placeholder="Add a supportive, practical reply." />
                  </label>
                  <button className="button button-primary" type="button" onClick={() => void addReply(post.id)}>Reply</button>
                </div>
              </article>
            );
          })}
          {!posts.length ? <div className="notice">No discussions yet. This is a new private space—start with a general question, useful local tip or small win.</div> : null}
        </div>
      </section>
    </div>
  );
}
