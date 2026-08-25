import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";

const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const MARGIN = 44;
const NAVY = rgb(13 / 255, 43 / 255, 100 / 255);
const BLUE = rgb(36 / 255, 83 / 255, 166 / 255);
const SAGE = rgb(95 / 255, 127 / 255, 55 / 255);
const INK = rgb(21 / 255, 32 / 255, 51 / 255);
const MUTED = rgb(83 / 255, 100 / 255, 124 / 255);
const LINE = rgb(218 / 255, 226 / 255, 236 / 255);
const PALE = rgb(247 / 255, 249 / 255, 252 / 255);

const eligibilityOutcomes = [
  ["Managing and maintaining nutrition", "Can the person access, prepare and consume food and drink safely and reliably?"],
  ["Maintaining personal hygiene", "Can they wash and maintain personal hygiene, including laundry, without unsafe difficulty or necessary prompting?"],
  ["Managing toilet needs", "Can they access and use the toilet and manage continence needs safely?"],
  ["Being appropriately clothed", "Can they dress and remain appropriately clothed for their health, situation and weather?"],
  ["Maintaining a habitable home", "Can the home be kept sufficiently clean, safe and supplied with essential amenities?"],
  ["Using the home safely", "Can they move around the home, use essential rooms and enter or leave the property safely?"],
  ["Maintaining relationships", "Do their needs prevent them from developing or maintaining family or other personal relationships?"],
  ["Work, training, education or volunteering", "Do their needs prevent safe access to or participation in work, training, education or volunteering where this matters to them?"],
  ["Using community facilities and services", "Can they safely use necessary community services, public transport, shops or recreational facilities?"],
  ["Caring responsibilities for a child", "Do their needs prevent them from carrying out caring responsibilities they have for a child?"],
] as const;

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

function drawWrapped(page: PDFPage, text: string, font: PDFFont, size: number, x: number, y: number, maxWidth: number, color = INK, lineHeight = size * 1.35) {
  const lines = wrapText(text, font, size, maxWidth);
  lines.forEach((line, index) => page.drawText(line, { x, y: y - index * lineHeight, size, font, color }));
  return y - lines.length * lineHeight;
}

export async function generateUkCareAssessmentGuide() {
  const pdf = await PDFDocument.create();
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const form = pdf.getForm();
  let pageNumber = 0;

  function addPage(title?: string) {
    const page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    pageNumber += 1;
    page.drawRectangle({ x: 0, y: PAGE_HEIGHT - 72, width: PAGE_WIDTH, height: 72, color: NAVY });
    page.drawText("THE CLARA PATH", { x: MARGIN, y: PAGE_HEIGHT - 34, size: 10, font: bold, color: rgb(1, 1, 1) });
    page.drawText("Carer’s Circle Member Resource", { x: MARGIN, y: PAGE_HEIGHT - 52, size: 9, font: regular, color: rgb(0.9, 0.94, 1) });
    page.drawText(String(pageNumber), { x: PAGE_WIDTH - MARGIN - 8, y: 24, size: 9, font: regular, color: MUTED });
    if (title) page.drawText(title, { x: MARGIN, y: PAGE_HEIGHT - 103, size: 18, font: bold, color: NAVY });
    return page;
  }

  function addTextField(page: PDFPage, name: string, label: string, y: number, height = 54) {
    page.drawText(label, { x: MARGIN, y, size: 10, font: bold, color: INK });
    const field = form.createTextField(name);
    field.enableMultiline();
    field.addToPage(page, {
      x: MARGIN,
      y: y - height - 10,
      width: PAGE_WIDTH - MARGIN * 2,
      height,
      borderColor: LINE,
      backgroundColor: PALE,
      textColor: INK,
      borderWidth: 1,
      font: regular,
    });
    return y - height - 28;
  }

  // Cover
  {
    const page = addPage();
    page.drawText("The UK Care Assessment Prep Guide", { x: MARGIN, y: 640, size: 28, font: bold, color: NAVY });
    let y = 604;
    y = drawWrapped(page, "A Plain-English Guide & Fillable Logbook to Secure the Funding and Support Your Family is Legally Entitled To.", bold, 16, MARGIN, y, PAGE_WIDTH - MARGIN * 2, BLUE, 22);
    y -= 22;
    page.drawRectangle({ x: MARGIN, y: y - 142, width: PAGE_WIDTH - MARGIN * 2, height: 142, color: PALE, borderColor: LINE, borderWidth: 1 });
    drawWrapped(page, "Use this guide to organise accurate evidence before a Local Authority assessment: what support is needed, what happens without help, how often difficulties occur, and the questions you want answered. Eligibility and funding are determined by the relevant statutory body after assessment; this guide does not guarantee an outcome.", regular, 11, MARGIN + 18, y - 28, PAGE_WIDTH - MARGIN * 2 - 36, INK, 16);
    page.drawText("Member edition • Fillable PDF", { x: MARGIN, y: 260, size: 12, font: bold, color: SAGE });
    page.drawText("Keep completed copies on your own device. Do not upload private case records to The Clara Path.", { x: MARGIN, y: 236, size: 9, font: regular, color: MUTED });
  }

  // How eligibility works
  {
    const page = addPage("1. The eligibility test in plain English");
    let y = PAGE_HEIGHT - 138;
    y = drawWrapped(page, "For adults with care and support needs in England, the Care and Support Statutory Guidance explains a three-part test: needs arise from a physical or mental impairment or illness; because of those needs the adult is unable to achieve two or more specified outcomes; and this causes, or is likely to cause, a significant impact on wellbeing. See chapter 6, especially paragraphs 6.102–6.112.", regular, 10.5, MARGIN, y, PAGE_WIDTH - MARGIN * 2, INK, 15);
    y -= 12;
    y = drawWrapped(page, "‘Unable’ can include needing assistance or prompting, experiencing significant pain, distress or anxiety, facing danger to health or safety, or taking significantly longer than would normally be expected.", regular, 10, MARGIN, y, PAGE_WIDTH - MARGIN * 2, MUTED, 14);
    y -= 18;
    page.drawText("Checklist — mark the areas that need discussion", { x: MARGIN, y, size: 12, font: bold, color: NAVY });
    y -= 24;

    eligibilityOutcomes.forEach(([title, help], index) => {
      if (y < 95) return;
      const checkbox = form.createCheckBox(`eligibility_${index + 1}`);
      checkbox.addToPage(page, { x: MARGIN, y: y - 3, width: 13, height: 13, borderColor: BLUE, borderWidth: 1 });
      page.drawText(title, { x: MARGIN + 22, y, size: 9.5, font: bold, color: INK });
      y = drawWrapped(page, help, regular, 8.5, MARGIN + 22, y - 14, PAGE_WIDTH - MARGIN * 2 - 22, MUTED, 11.5) - 10;
    });
  }

  // Evidence prompts
  {
    const page = addPage("2. Build the evidence before the meeting");
    let y = PAGE_HEIGHT - 140;
    y = drawWrapped(page, "For each difficulty, record what the person can and cannot do, what help or prompting is needed, whether doing it causes pain, distress, anxiety or risk, how long it takes, and how needs vary on difficult days.", regular, 10.5, MARGIN, y, PAGE_WIDTH - MARGIN * 2, INK, 15) - 18;
    y = addTextField(page, "support_now", "What support is currently provided — and by whom?", y, 72);
    y = addTextField(page, "without_support", "What happens if that support is not provided?", y, 72);
    y = addTextField(page, "fluctuating_needs", "How do needs vary across good days, difficult days, evenings or nights?", y, 72);
    y = addTextField(page, "risks", "Pain, distress, anxiety, falls, safety concerns or other risks to mention", y, 72);
    addTextField(page, "outcomes_affected", "Which Care Act outcomes above are affected, and how?", y, 84);
  }

  // 14-day care log
  for (let week = 1; week <= 2; week += 1) {
    const page = addPage(`3. Fillable Daily Care Log — week ${week}`);
    let y = PAGE_HEIGHT - 140;
    y = drawWrapped(page, "Use one row per day. Keep entries factual. Focus on support actually provided, prompting or supervision, difficulties or incidents, night-time interruptions and approximate time spent.", regular, 9.5, MARGIN, y, PAGE_WIDTH - MARGIN * 2, MUTED, 13) - 16;

    for (let day = 1; day <= 7; day += 1) {
      const dayNo = (week - 1) * 7 + day;
      page.drawText(`Day ${dayNo}`, { x: MARGIN, y, size: 10, font: bold, color: NAVY });
      const dateField = form.createTextField(`care_log_${dayNo}_date`);
      dateField.addToPage(page, { x: MARGIN + 52, y: y - 7, width: 112, height: 21, borderColor: LINE, backgroundColor: PALE, borderWidth: 1, font: regular });
      page.drawText("Date", { x: MARGIN + 169, y, size: 8.5, font: regular, color: MUTED });

      const details = form.createTextField(`care_log_${dayNo}_details`);
      details.enableMultiline();
      details.addToPage(page, {
        x: MARGIN,
        y: y - 71,
        width: PAGE_WIDTH - MARGIN * 2,
        height: 52,
        borderColor: LINE,
        backgroundColor: PALE,
        borderWidth: 1,
        font: regular,
      });
      page.drawText("Support, prompting/supervision, difficulty or incident, night-time care, approximate time", { x: MARGIN + 6, y: y - 33, size: 7.5, font: regular, color: MUTED });
      y -= 91;
    }
  }

  // Meeting cheat sheet
  {
    const page = addPage("4. Social Work Meeting Cheat Sheet & Pitch");
    let y = PAGE_HEIGHT - 140;
    y = drawWrapped(page, "Your aim is not to perform or exaggerate. Describe the real situation clearly, using examples from the two-week log, and ask for the reasoning behind important decisions to be explained.", regular, 10.5, MARGIN, y, PAGE_WIDTH - MARGIN * 2, INK, 15) - 22;

    const questions = [
      "Can you confirm whether a referral for an NHS Continuing Healthcare (CHC) Checklist may be appropriate here?",
      "If Direct Payments are available to meet eligible needs, what is the current local hourly rate or personal-budget rate used, and how is it calculated?",
      "I am providing unpaid care. Can we arrange my separate Carer’s Assessment, and what is the next step?",
    ];

    page.drawText("Three questions to take into the meeting", { x: MARGIN, y, size: 13, font: bold, color: NAVY });
    y -= 28;
    questions.forEach((question, index) => {
      page.drawCircle({ x: MARGIN + 9, y: y + 3, size: 9, color: BLUE });
      page.drawText(String(index + 1), { x: MARGIN + 6.5, y, size: 8, font: bold, color: rgb(1, 1, 1) });
      y = drawWrapped(page, question, regular, 10.5, MARGIN + 28, y + 3, PAGE_WIDTH - MARGIN * 2 - 28, INK, 15) - 18;
    });

    y -= 8;
    y = addTextField(page, "meeting_priority", "The main outcome or support I need clarified", y, 70);
    y = addTextField(page, "meeting_evidence", "Examples from my care log I want to mention", y, 92);
    addTextField(page, "meeting_notes", "What was agreed, who will do what, and by when?", y, 92);
  }

  // References
  {
    const page = addPage("5. Official references to keep with the guide");
    let y = PAGE_HEIGHT - 140;
    const refs = [
      ["Care and Support Statutory Guidance — chapter 6", "Adult assessment and eligibility. For the national adult eligibility threshold and the 10 outcomes, see paragraphs 6.102–6.112. For a carer’s assessment, see paragraphs 6.16–6.18."],
      ["Care and Support Statutory Guidance — chapter 12", "Direct Payments. Paragraphs 12.1–12.10 explain their purpose, personalisation principles and how requests are considered."],
      ["NHS Continuing Healthcare Checklist guidance", "The Checklist is a screening tool for identifying people who may need a full CHC assessment. A positive Checklist does not itself establish eligibility."],
      ["GOV.UK Mandatory Reconsideration", "Use the official route and current deadlines when asking for a benefit decision to be looked at again."],
    ] as const;

    refs.forEach(([title, body], index) => {
      page.drawText(`${index + 1}. ${title}`, { x: MARGIN, y, size: 11, font: bold, color: NAVY });
      y = drawWrapped(page, body, regular, 9.5, MARGIN, y - 18, PAGE_WIDTH - MARGIN * 2, INK, 13) - 22;
    });

    page.drawRectangle({ x: MARGIN, y: 168, width: PAGE_WIDTH - MARGIN * 2, height: 116, color: PALE, borderColor: LINE, borderWidth: 1 });
    drawWrapped(page, "Important: This is an educational preparation resource. It is not legal advice, benefits advice, clinical advice or a promise of eligibility, funding or a particular assessment outcome. Check current official guidance and seek specialist advice where needed.", bold, 9.5, MARGIN + 16, 252, PAGE_WIDTH - MARGIN * 2 - 32, INK, 14);
  }

  form.updateFieldAppearances(regular);
  const bytes = await pdf.save();
  return {
    filename: "The-UK-Care-Assessment-Prep-Guide-Clara-Path.pdf",
    bytes,
  };
}
