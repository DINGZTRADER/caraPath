import { redirect } from "next/navigation";
import { getMemberSession } from "../../lib/auth/session";

export default async function MembersPage() {
  const session = await getMemberSession();
  if (!session) redirect("/sign-in?redirect_url=/members");

  return (
    <main className="member-shell">
      <section className="member-card">
        <h1>Carer’s Circle Member Area</h1>
        <p>Signed in as {session.email ?? "member"}.</p>
        <p>Your secure member resources, events and community features will appear here.</p>
      </section>
    </main>
  );
}
