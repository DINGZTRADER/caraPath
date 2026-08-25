import { NextResponse } from "next/server";
import { getMemberSession } from "../../../../lib/auth/session";
import { memberDownloads } from "../../../../lib/member-downloads";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const session = await getMemberSession();
  if (!session) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  const { slug } = await context.params;
  const file = memberDownloads[slug];
  if (!file) {
    return NextResponse.json({ error: "Download not found." }, { status: 404 });
  }

  return new NextResponse(file.content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": `attachment; filename="${file.filename}"`,
      "Cache-Control": "private, no-store"
    }
  });
}
