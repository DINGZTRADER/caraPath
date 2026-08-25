import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";

export type MemberPdfSlug =
  | "care-assessment-preparation-guide"
  | "benefit-decision-preparation-template"
  | "chc-review-preparation-template"
  | "ehcp-review-preparation-template"
  | "dfg-preparation-checklist"
  | "care-decision-challenge-template";

type FieldSpec = {
  label: string;
  name: string;
  prompt?: string;
  height?: number;
};

type SectionSpec = {
  title: string;
  intro?: string;
  fields: FieldSpec[];
};

type PdfSpec = {
  filename: string;
  title: string;
  subtitle: string;
  sections: SectionSpec[];
  note: string;
};

export const memberPdfMeta: Record<MemberPdfSlug, { filename: string; title: string }> = {
  "care-assessment-preparation-guide": {
    filename: "Clara-Path-Care-Assessment-Preparation-Guide.pdf",
    title: "Care Assessment Preparation Guide"
  },
  "benefit-decision-preparation-template": {
    filename: "Clara-Path-Benefit-Decision-Preparation-Template.pdf",
    title: "Benefit Decision Preparation Template"
  },
  "chc-review-preparation-template": {
    filename: "Clara-Path-CHC-Review-Preparation-Template.pdf",
    title: "CHC Review Preparation Template"
  },
  "ehcp-review-preparation-template": {
    filename: "Clara-Path-EHCP-Review-Preparation-Template.pdf",
    title: "EHCP Review Preparation Template"
  },
  "dfg-preparation-checklist": {
    filename: "Clara-Path-DFG-Preparation-Checklist.pdf",
    title: "DFG Preparation Checklist"
  },
  "care-decision-challenge-template": {
    filename: "Clara-Path-Care-Decision-Challenge-Template.pdf",
    title: "Care Decision Challenge Preparation Template"
  }
};

const specs: Record<MemberPdfSlug, PdfSpec> = {
  "care-assessment-preparation-guide": {
    ...memberPdfMeta["care-assessment-preparation-guide"],
    subtitle: "A structured, fillable guide to help you prepare for a carer's assessment.",
    sections: [
      {
        title: "1. Your caring role",
        intro: "Describe what you do and the time caring takes. Keep this factual and specific.",
        fields: [
          { label: "Main caring tasks", name: "care_tasks", height: 88 },
          { label: "Approximate hours caring each day or week", name: "care_hours", height: 52 },
          { label: "Night-time caring or interruptions", name: "night_care", height: 72 }
        ]
      },
      {
        title: "2. Impact on you",
        fields: [
          { label: "Sleep and rest", name: "impact_sleep", height: 58 },
          { label: "Physical health", name: "impact_physical", height: 58 },
          { label: "Emotional wellbeing", name: "impact_emotional", height: 58 },
          { label: "Work, education, relationships and social life", name: "impact_life", height: 82 }
        ]
      },
      {
        title: "3. What is becoming difficult?",
        fields: [
          { label: "Parts of caring that are difficult to sustain", name: "difficulties", height: 88 },
          { label: "Safety concerns or risks", name: "safety", height: 72 },
          { label: "Support already in place and current gaps", name: "support_gaps", height: 88 }
        ]
      },
      {
        title: "4. Support to ask about",
        intro: "You might ask about breaks or respite, equipment, adaptations, Direct Payments, emergency planning or local carer support.",
        fields: [
          { label: "Support I want to discuss", name: "support_to_discuss", height: 100 }
        ]
      },
      {
        title: "5. Questions for the assessor",
        fields: [
          { label: "My questions", name: "questions", height: 120 }
        ]
      }
    ],
    note: "Describe your circumstances accurately, including how needs vary and what happens on difficult days. Do not exaggerate or minimise. This guide is for general preparation only and does not replace legal, clinical, benefits or statutory advice or guarantee an assessment outcome."
  },
  "benefit-decision-preparation-template": {
    ...memberPdfMeta["benefit-decision-preparation-template"],
    subtitle: "Organise a benefit decision, your reasons for disagreement and the evidence you want considered.",
    sections: [
      {
        title: "Decision details",
        fields: [
          { label: "Benefit / decision being challenged", name: "decision_name", height: 52 },
          { label: "Date of decision", name: "decision_date", height: 42 },
          { label: "Relevant deadline, if known", name: "deadline", height: 42 }
        ]
      },
      {
        title: "What I disagree with",
        fields: [{ label: "List the points you believe are wrong or incomplete", name: "disagreement", height: 140 }]
      },
      {
        title: "Evidence I want considered",
        fields: [{ label: "Documents, reports, records or other evidence", name: "evidence", height: 120 }]
      },
      {
        title: "Real-life examples",
        intro: "Use accurate examples, including frequency, support needed and how needs vary.",
        fields: [{ label: "Examples", name: "examples", height: 150 }]
      },
      {
        title: "Questions and next action",
        fields: [
          { label: "Questions to discuss with an adviser or official body", name: "questions", height: 110 },
          { label: "Who will I contact and by what date?", name: "next_action", height: 70 }
        ]
      }
    ],
    note: "This template is an organisational aid only. It is not legal or benefits advice and does not guarantee that a decision will change. Check current deadlines and official challenge routes."
  },
  "chc-review-preparation-template": {
    ...memberPdfMeta["chc-review-preparation-template"],
    subtitle: "Prepare for an NHS Continuing Healthcare review, assessment discussion or challenge.",
    sections: [
      {
        title: "Assessment / review details",
        fields: [
          { label: "Date", name: "review_date", height: 42 },
          { label: "NHS body or team", name: "nhs_body", height: 52 },
          { label: "Stage of the process, if known", name: "stage", height: 52 }
        ]
      },
      {
        title: "Needs I want clearly described",
        fields: [
          { label: "Nature", name: "nature", height: 74 },
          { label: "Intensity", name: "intensity", height: 74 },
          { label: "Complexity", name: "complexity", height: 74 },
          { label: "Unpredictability", name: "unpredictability", height: 74 }
        ]
      },
      {
        title: "Areas I want clarified",
        fields: [{ label: "Questions, inaccuracies or missing information", name: "clarifications", height: 120 }]
      },
      {
        title: "Evidence I want considered",
        fields: [{ label: "Relevant evidence", name: "evidence", height: 120 }]
      },
      {
        title: "Questions for the NHS team",
        intro: "For example: how were needs characterised, what evidence was relied on, what is missing, and what review route applies?",
        fields: [{ label: "My questions", name: "questions", height: 130 }]
      }
    ],
    note: "CHC eligibility is determined through the official NHS process. The Clara Path cannot determine or guarantee eligibility. This template supports preparation only and does not replace specialist advice."
  },
  "ehcp-review-preparation-template": {
    ...memberPdfMeta["ehcp-review-preparation-template"],
    subtitle: "A fillable structure for an EHCP review, meeting or disagreement.",
    sections: [
      {
        title: "Current plan",
        fields: [
          { label: "Date of current EHCP", name: "ehcp_date", height: 42 },
          { label: "Next review date", name: "review_date", height: 42 }
        ]
      },
      {
        title: "Current needs",
        fields: [
          { label: "Education needs", name: "education_needs", height: 88 },
          { label: "Health needs related to education", name: "health_needs", height: 88 },
          { label: "Social care needs related to education", name: "social_care_needs", height: 88 }
        ]
      },
      {
        title: "What is working and what has changed",
        fields: [
          { label: "What is working", name: "working", height: 100 },
          { label: "What is not working or has changed", name: "not_working", height: 110 }
        ]
      },
      {
        title: "Provision and evidence",
        fields: [
          { label: "Provision to check against the plan", name: "provision", height: 110 },
          { label: "Evidence to bring or request", name: "evidence", height: 100 }
        ]
      },
      {
        title: "Questions for the school / Local Authority",
        fields: [{ label: "My questions", name: "questions", height: 140 }]
      }
    ],
    note: "This template is for general preparation only. It is not legal advice and does not replace specialist SEND advice where needed. Check current statutory processes and deadlines with the relevant official source."
  },
  "dfg-preparation-checklist": {
    ...memberPdfMeta["dfg-preparation-checklist"],
    subtitle: "Organise the practical need, proposed adaptation and questions before approaching your Local Authority.",
    sections: [
      {
        title: "The practical problem",
        fields: [{ label: "What is difficult, inaccessible or unsafe in the home?", name: "practical_problem", height: 120 }]
      },
      {
        title: "The adaptation being considered",
        fields: [{ label: "Describe the proposed adaptation", name: "adaptation", height: 110 }]
      },
      {
        title: "How the current home affects daily life",
        fields: [
          { label: "Access into or around the home", name: "access", height: 78 },
          { label: "Bathroom, washing or essential facilities", name: "facilities", height: 78 },
          { label: "Safety, independence or other daily-life impact", name: "daily_impact", height: 88 }
        ]
      },
      {
        title: "Professional information already available",
        fields: [{ label: "OT assessments, recommendations or previous adaptation information", name: "professional_info", height: 120 }]
      },
      {
        title: "Questions for the Local Authority",
        intro: "Consider asking how to start the process, whether assessment is required before works begin, what financial assessment applies and what costs may be covered.",
        fields: [{ label: "My questions", name: "questions", height: 140 }]
      }
    ],
    note: "Do not commit to building work on the assumption it will be funded. Check the current Local Authority process before proceeding. This checklist is general information only and does not guarantee eligibility or funding."
  },
  "care-decision-challenge-template": {
    ...memberPdfMeta["care-decision-challenge-template"],
    subtitle: "A general preparation template for questioning or challenging a care-related decision.",
    sections: [
      {
        title: "Decision details",
        fields: [
          { label: "Organisation that made the decision", name: "organisation", height: 52 },
          { label: "Decision or issue", name: "decision", height: 82 },
          { label: "Date of decision", name: "decision_date", height: 42 },
          { label: "Any review, complaint or appeal deadline", name: "deadline", height: 52 }
        ]
      },
      {
        title: "Why I want the decision reviewed",
        fields: [{ label: "What appears wrong, incomplete, unfair or unsupported?", name: "reasons", height: 150 }]
      },
      {
        title: "What outcome I am asking for",
        fields: [{ label: "Describe the review, correction, reassessment or other outcome sought", name: "outcome", height: 110 }]
      },
      {
        title: "Evidence and chronology",
        fields: [
          { label: "Evidence I want considered", name: "evidence", height: 120 },
          { label: "Key dates, contacts and events", name: "chronology", height: 130 }
        ]
      },
      {
        title: "Questions and next action",
        fields: [
          { label: "Questions to ask", name: "questions", height: 110 },
          { label: "Who will I contact, how, and by what date?", name: "next_action", height: 80 }
        ]
      }
    ],
    note: "This is a general preparation tool, not legal, clinical or statutory advice. Different organisations use different review, complaint and appeal routes and deadlines. Check the official process for the specific decision before acting."
  }
};

const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const MARGIN = 48;
const NAVY = rgb(13 / 255, 43 / 255, 100 / 255);
const BLUE = rgb(36 / 255, 83 / 255, 166 / 255);
const SAGE = rgb(95 / 255, 127 / 255, 55 / 255);
const INK = rgb(21 / 255, 32 / 255, 51 / 255);
const MUTED = rgb(83 / 255, 100 / 255, 124 / 255);
const LINE = rgb(219 / 255, 227 / 255, 236 / 255);
const PALE = rgb(246 / 255, 249 / 255, 252 / 255);

function wrapText(text: string, font: PDFFont, size: number, maxWidth: number) {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, size) <= maxWidth) {
      line = candidate;
    } else {
      if (line) lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function drawWrapped(page: PDFPage, text: string, font: PDFFont, size: number, x: number, y: number, maxWidth: number, color = MUTED, lineHeight = size * 1.35) {
  const lines = wrapText(text, font, size, maxWidth);
  lines.forEach((line, index) => page.drawText(line, { x, y: y - index * lineHeight, size, font, color }));
  return y - lines.length * lineHeight;
}

export async function generateMemberPdf(slug: MemberPdfSlug) {
  const spec = specs[slug];
  if (!spec) return null;

  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const form = pdfDoc.getForm();
  let page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  let y = PAGE_HEIGHT - MARGIN;
  let pageNumber = 1;

  const drawHeader = () => {
    page.drawRectangle({ x: 0, y: PAGE_HEIGHT - 118, width: PAGE_WIDTH, height: 118, color: NAVY });
    page.drawText("THE CLARA PATH", { x: MARGIN, y: PAGE_HEIGHT - 45, size: 12, font: bold, color: rgb(1, 1, 1) });
    page.drawText(spec.title, { x: MARGIN, y: PAGE_HEIGHT - 72, size: 20, font: bold, color: rgb(1, 1, 1) });
    drawWrapped(page, spec.subtitle, font, 9.5, MARGIN, PAGE_HEIGHT - 92, PAGE_WIDTH - MARGIN * 2, rgb(0.86, 0.91, 0.98), 12);
    y = PAGE_HEIGHT - 145;
  };

  const drawFooter = () => {
    page.drawLine({ start: { x: MARGIN, y: 34 }, end: { x: PAGE_WIDTH - MARGIN, y: 34 }, thickness: 0.7, color: LINE });
    page.drawText("The Clara Path Consultants Ltd", { x: MARGIN, y: 19, size: 7.5, font: bold, color: NAVY });
    page.drawText(`Page ${pageNumber}`, { x: PAGE_WIDTH - MARGIN - 40, y: 19, size: 7.5, font, color: MUTED });
  };

  const newPage = () => {
    drawFooter();
    pageNumber += 1;
    page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    drawHeader();
  };

  drawHeader();

  for (const section of spec.sections) {
    const estimatedIntro = section.intro ? 42 : 0;
    const firstFieldHeight = section.fields[0]?.height ?? 70;
    if (y - estimatedIntro - firstFieldHeight < 100) newPage();

    page.drawText(section.title, { x: MARGIN, y, size: 13, font: bold, color: NAVY });
    y -= 19;
    if (section.intro) {
      y = drawWrapped(page, section.intro, font, 8.8, MARGIN, y, PAGE_WIDTH - MARGIN * 2, MUTED, 11.5) - 8;
    }

    for (const fieldSpec of section.fields) {
      const fieldHeight = fieldSpec.height ?? 70;
      const blockHeight = fieldHeight + 38;
      if (y - blockHeight < 70) newPage();

      page.drawText(fieldSpec.label, { x: MARGIN, y, size: 9.2, font: bold, color: INK });
      y -= 15;
      if (fieldSpec.prompt) {
        y = drawWrapped(page, fieldSpec.prompt, font, 8, MARGIN, y, PAGE_WIDTH - MARGIN * 2, MUTED, 10.5) - 5;
      }

      const textField = form.createTextField(`${slug}.${fieldSpec.name}`);
      textField.enableMultiline();
      textField.addToPage(page, {
        x: MARGIN,
        y: y - fieldHeight,
        width: PAGE_WIDTH - MARGIN * 2,
        height: fieldHeight,
        borderColor: LINE,
        borderWidth: 1,
        backgroundColor: PALE,
        textColor: INK
      });
      y -= fieldHeight + 20;
    }
    y -= 5;
  }

  if (y < 155) newPage();
  page.drawRectangle({ x: MARGIN, y: y - 92, width: PAGE_WIDTH - MARGIN * 2, height: 92, color: rgb(0.94, 0.97, 0.91), borderColor: rgb(0.78, 0.86, 0.67), borderWidth: 1 });
  page.drawText("IMPORTANT", { x: MARGIN + 14, y: y - 20, size: 9.5, font: bold, color: SAGE });
  drawWrapped(page, spec.note, font, 8.3, MARGIN + 14, y - 37, PAGE_WIDTH - MARGIN * 2 - 28, INK, 10.5);

  drawFooter();
  form.updateFieldAppearances(font);
  pdfDoc.setTitle(spec.title);
  pdfDoc.setAuthor("The Clara Path Consultants Ltd");
  pdfDoc.setSubject("Carer's Circle member resource");
  pdfDoc.setCreator("The Clara Path");

  return {
    bytes: await pdfDoc.save(),
    filename: spec.filename,
    title: spec.title
  };
}

export function isMemberPdfSlug(value: string): value is MemberPdfSlug {
  return value in specs;
}
