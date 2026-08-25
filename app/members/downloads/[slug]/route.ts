import { NextResponse } from "next/server";
import { getMemberSession } from "../../../../lib/auth/session";
import { generateMemberPdf, isMemberPdfSlug } from "../../../../lib/member-pdfs";
import { generateUkCareAssessmentGuide } from "../../../../lib/uk-care-assessment-guide";

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
  if (!isMemberPdfSlug(slug)) {
    return NextResponse.json({ error: "Download not found." }, { status: 404 });
  }

  const file = slug === "care-assessment-preparation-guide"
    ? await generateUkCareAssessmentGuide()
    : await generateMemberPdf(slug);

  if (!file) {
    return NextResponse.json({ error: "Download not found." }, { status: 404 });
  }

  return new NextResponse(Buffer.from(file.bytes), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${file.filename}"`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff"
    }
  });
}
