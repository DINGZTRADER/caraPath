import { NextResponse } from "next/server";
import { generateFreeCareAssessmentStarter } from "../../../lib/free-care-assessment-starter";

export const runtime = "nodejs";

export async function GET() {
  const file = await generateFreeCareAssessmentStarter();
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
