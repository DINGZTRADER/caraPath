import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";

const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const MARGIN = 48;
const NAVY = rgb(13 / 255, 43 / 255, 100 / 255);
const BLUE = rgb(36 / 255, 83 / 255, 166 / 255);
const INK = rgb(21 / 255, 32 / 255, 51 / 255);
const MUTED = rgb(83 / 255, 100 / 255, 124 / 255);
const PALE = rgb(247 / 255, 249 / 255, 252 / 255);
const LINE = rgb(218 / 255, 226 / 255, 236 / 255);

function wrap(text: string, font: PDFFont, size: number, maxWidth: number) {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, size) <= maxWidth) line = candidate;
    else {
      if (line) lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function drawWrapped(page: PDFPage, text: string, font: PDFFont, size: number, x: number, y: number, maxWidth: number, color = INK, lineHeight = size * 1.35) {
  const lines = wrap(text, font, size, maxWidth);
  lines.forEach((line, index) => page.drawText(line, { x, y: y - index * lineHeight, size, font, color }));
  return y - lines.length * lineHeight;
}

export async function generateFreeCareAssessmentStarter() {
  const pdf = await PDFDocument.create();
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const form = pdf.getForm();

  const addHeader = (page: PDFPage, title: string) => {
    page.drawRectangle({ x: 0, y: PAGE_HEIGHT - 78, width: PAGE_WIDTH, height: 78, color: NAVY });
    page.drawText("THE CLARA PATH", { x: MARGIN, y: PAGE_HEIGHT - 36, size: 11, font: bold, color: rgb(1, 1, 1) });
    page.drawText(title, { x: MARGIN, y: PAGE_HEIGHT - 112, size: 20, font: bold, color: NAVY });
  };

  const page1 = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  addHeader(page1, "Free Care Assessment Starter Pages");
  let y = PAGE_HEIGHT - 150;
  y = drawWrapped(page1, "A short sample from The UK Care Assessment Prep Guide. Use it to start organising the real-life examples you may want to discuss before a Local Authority assessment.", regular, 10.5, MARGIN, y, PAGE_WIDTH - MARGIN * 2, INK, 15) - 18;

  page1.drawText("Four sample eligibility outcomes", { x: MARGIN, y, size: 13, font: bold, color: BLUE });
  y -= 28;
  const samples = [
    ["Managing and maintaining nutrition", "Can the person prepare and consume food and drink safely and reliably without necessary help or prompting?"],
    ["Maintaining personal hygiene", "Can they wash and maintain personal hygiene safely and sustainably?"],
    ["Using the home safely", "Can they move around the home, use essential rooms and enter or leave safely?"],
    ["Maintaining relationships", "Do their needs create isolation or prevent important relationships being maintained?"],
  ] as const;

  samples.forEach(([title, help], index) => {
    const checkbox = form.createCheckBox(`starter_outcome_${index + 1}`);
    checkbox.addToPage(page1, { x: MARGIN, y: y - 3, width: 14, height: 14, borderColor: BLUE, borderWidth: 1 });
    page1.drawText(title, { x: MARGIN + 24, y, size: 10, font: bold, color: INK });
    y = drawWrapped(page1, help, regular, 9, MARGIN + 24, y - 16, PAGE_WIDTH - MARGIN * 2 - 24, MUTED, 12) - 18;
  });

  page1.drawRectangle({ x: MARGIN, y: 146, width: PAGE_WIDTH - MARGIN * 2, height: 112, color: PALE, borderColor: LINE, borderWidth: 1 });
  drawWrapped(page1, "The full member guide includes all 10 adult Care Act outcomes, a two-week fillable care log, evidence prompts, a Social Work Meeting Cheat Sheet and official statutory-reference notes.", bold, 10, MARGIN + 16, 230, PAGE_WIDTH - MARGIN * 2 - 32, INK, 14);

  const page2 = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  addHeader(page2, "One-Day Care Evidence Log");
  y = PAGE_HEIGHT - 150;
  y = drawWrapped(page2, "Write down what actually happened today. Record the help, prompting or supervision needed, what would have happened without it, any risk or distress, and how long support took.", regular, 10, MARGIN, y, PAGE_WIDTH - MARGIN * 2, INK, 14) - 18;

  const fields = [
    ["starter_date", "Date", 32],
    ["starter_support", "What support, prompting or supervision was needed?", 92],
    ["starter_without_help", "What would have happened without that help?", 82],
    ["starter_risk", "Any pain, distress, anxiety, safety issue or incident?", 82],
    ["starter_time", "Approximate time spent and any night-time interruption", 70],
  ] as const;

  for (const [name, label, height] of fields) {
    page2.drawText(label, { x: MARGIN, y, size: 10, font: bold, color: INK });
    const field = form.createTextField(name);
    if (height > 40) field.enableMultiline();
    field.addToPage(page2, {
      x: MARGIN,
      y: y - height - 10,
      width: PAGE_WIDTH - MARGIN * 2,
      height,
      borderColor: LINE,
      backgroundColor: PALE,
      borderWidth: 1,
      font: regular,
    });
    y -= height + 28;
  }

  drawWrapped(page2, "This starter is an educational preparation tool, not legal, benefits or clinical advice and not a guarantee of eligibility or funding. The full member guide uses the current Care and Support Statutory Guidance as its reference point.", regular, 8.5, MARGIN, 62, PAGE_WIDTH - MARGIN * 2, MUTED, 11.5);

  form.updateFieldAppearances(regular);
  return {
    filename: "Clara-Path-Free-Care-Assessment-Starter.pdf",
    bytes: await pdf.save(),
  };
}
