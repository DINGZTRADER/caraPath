export type InsightSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type InsightArticle = {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  updated: string;
  sections: InsightSection[];
  sources: { label: string; href: string }[];
};

export const insightArticles: InsightArticle[] = [
  {
    slug: "appeal-nhs-chc-fast-track-decision",
    title: "NHS CHC Fast Track: what to do if a referral is refused or funding is reviewed",
    description: "A plain-English guide to the NHS Continuing Healthcare Fast Track pathway, what the official rules say, and practical questions to raise if access or ongoing funding is disputed.",
    eyebrow: "NHS Continuing Healthcare",
    updated: "26 August 2026",
    sections: [
      {
        heading: "First, understand what Fast Track is",
        paragraphs: [
          "The NHS Continuing Healthcare Fast Track pathway is for a person with a rapidly deteriorating condition who may be entering a terminal phase. It is designed to secure an appropriate package of NHS Continuing Healthcare quickly and with minimum delay.",
          "A properly completed Fast Track Pathway Tool replaces the usual Checklist and Decision Support Tool process at that point. An appropriate clinician records why the Fast Track criteria are met and sends the tool to the Integrated Care Board (ICB)."
        ]
      },
      {
        heading: "If a Fast Track referral is not being made",
        paragraphs: [
          "There is not a single national form called a 'Fast Track appeal'. The useful first step is to establish exactly where the disagreement sits: whether an appropriate clinician has declined to complete the Fast Track Tool, whether the ICB has not acted on a completed tool, or whether existing Fast Track funding is later being reviewed."
        ],
        bullets: [
          "Ask for the decision and reasons in writing.",
          "Ask which clinician considered the Fast Track criteria and what current evidence was considered.",
          "If the person's condition has changed, ask the responsible clinical team to consider the current position rather than relying on older evidence.",
          "If a completed Fast Track Tool has been sent to the ICB but action is delayed or disputed, ask the ICB to explain its position and its complaints or review route in writing.",
          "For urgent deterioration, raise the matter promptly with the treating team; do not rely on a website article where immediate clinical or safeguarding action is required."
        ]
      },
      {
        heading: "If Fast Track funding is later reviewed",
        paragraphs: [
          "Fast Track eligibility does not mean that the care package can never be reviewed. The official framework expects review of the person's needs and the effectiveness of the care arrangements. If it becomes appropriate to reconsider CHC eligibility, that process should be handled sensitively and the person or representative should be told what is happening and why.",
          "Keep a dated record of changes in needs, care interventions, risks, medication, night-time support and professional observations. The purpose is not to exaggerate need, but to make sure the current picture is accurately recorded."
        ]
      },
      {
        heading: "Questions to take into the conversation",
        bullets: [
          "Has an appropriate clinician considered the Fast Track Pathway Tool against the person's current condition?",
          "If Fast Track was not used, what evidence or criterion was considered not to be met?",
          "If existing funding is being reviewed, is this a care-plan review or a reassessment of CHC eligibility?",
          "What written reasons, documents and review or complaint routes will be provided to the family?"
        ]
      }
    ],
    sources: [
      { label: "GOV.UK — Fast Track Pathway Tool guidance", href: "https://www.gov.uk/government/publications/nhs-continuing-healthcare-fast-track-pathway-tool/fast-track-pathway-tool-for-nhs-continuing-healthcare-guidance" },
      { label: "GOV.UK — NHS CHC public information leaflet", href: "https://www.gov.uk/government/publications/nhs-continuing-healthcare-and-nhs-funded-nursing-care-public-information-leaflet/public-information-leaflet-nhs-continuing-healthcare-and-nhs-funded-nursing-care--2" }
    ]
  },
  {
    slug: "nhs-continuing-healthcare-12-month-review",
    title: "What happens at an NHS Continuing Healthcare 12-month review?",
    description: "What the NHS CHC framework says about annual reviews, what they should focus on, and how families can prepare accurate evidence without assuming eligibility will be reassessed.",
    eyebrow: "NHS CHC reviews",
    updated: "26 August 2026",
    sections: [
      {
        heading: "The review timetable",
        paragraphs: [
          "After someone is found eligible for NHS Continuing Healthcare, the national framework says there should be a review within three months of the eligibility decision. Further reviews should then take place at least annually, although clinical circumstances can justify more frequent review."
        ]
      },
      {
        heading: "A review is not automatically a fresh eligibility assessment",
        paragraphs: [
          "The guiding purpose of the review is to check whether the existing care plan and arrangements remain appropriate to meet the person's needs. The framework says that, in the majority of cases, there should be no need to reassess eligibility.",
          "If needs have changed significantly, however, the ICB may decide that a fresh eligibility assessment is appropriate. Families should ask whether the meeting is a care-package review or a formal reconsideration of CHC eligibility so that everyone understands the purpose of the process."
        ]
      },
      {
        heading: "What to prepare",
        bullets: [
          "The current care plan and any changes since the last review.",
          "A short chronology of hospital admissions, infections, falls, behavioural incidents, seizures or other relevant changes.",
          "Medication and treatment changes that materially affect care needs.",
          "Evidence of the amount, frequency and skill level of support actually required.",
          "Questions about parts of the current package that are no longer working or are creating risk."
        ]
      },
      {
        heading: "During the review",
        paragraphs: [
          "Keep the discussion factual and current. CHC is based on the totality of relevant needs, not on a diagnosis alone. If the family disagrees with how needs are being recorded, ask for that disagreement and the supporting evidence to be noted rather than relying only on a verbal objection."
        ]
      }
    ],
    sources: [
      { label: "GOV.UK — National Framework for NHS CHC and NHS-funded Nursing Care", href: "https://www.gov.uk/government/publications/national-framework-for-nhs-continuing-healthcare-and-nhs-funded-nursing-care" },
      { label: "NHS — Continuing Healthcare overview", href: "https://www.nhs.uk/social-care-and-support/money-work-and-benefits/nhs-continuing-healthcare/" }
    ]
  },
  {
    slug: "social-care-vs-primary-health-need",
    title: "What is the difference between social care and a primary health need?",
    description: "A plain-English explanation of the boundary between Local Authority social care and NHS Continuing Healthcare, including nature, intensity, complexity and unpredictability.",
    eyebrow: "Care Act & NHS CHC",
    updated: "26 August 2026",
    sections: [
      {
        heading: "Why the distinction matters",
        paragraphs: [
          "A 'primary health need' is the concept used in NHS Continuing Healthcare to help decide whether the NHS, rather than the Local Authority, is responsible for arranging and funding the person's overall package of assessed health and associated social-care needs.",
          "It is not a simple test of whether the person has a medical diagnosis. The assessment looks at the totality of relevant needs and the quantity and quality of care required to meet them."
        ]
      },
      {
        heading: "The four characteristics used in CHC",
        bullets: [
          "Nature — the type and characteristics of the needs and the interventions required.",
          "Intensity — the severity and quantity of the needs and the support required.",
          "Complexity — how needs interact and the skill required to manage them.",
          "Unpredictability — how much needs fluctuate and the risks created if timely care is not available."
        ]
      },
      {
        heading: "Where the Care Act fits",
        paragraphs: [
          "Local Authorities have duties under the Care Act to assess adults who appear to have needs for care and support. If a person is not eligible for NHS Continuing Healthcare, that does not remove the Local Authority's duty to consider care and support needs under the Care Act where the statutory assessment duty applies.",
          "If it appears during a Care Act assessment that NHS Continuing Healthcare may be relevant, the statutory guidance says the Local Authority should notify the relevant NHS body."
        ]
      },
      {
        heading: "A practical way to prepare",
        paragraphs: [
          "Instead of arguing only about labels, organise evidence around what care is actually required: frequency, duration, risk, skilled interventions, interactions between needs and what happens when support is delayed or unavailable. That gives the professionals a clearer factual picture to assess against the correct legal and policy framework."
        ]
      }
    ],
    sources: [
      { label: "GOV.UK — NHS CHC National Framework", href: "https://www.gov.uk/government/publications/national-framework-for-nhs-continuing-healthcare-and-nhs-funded-nursing-care" },
      { label: "GOV.UK — Care and Support Statutory Guidance", href: "https://www.gov.uk/government/publications/care-act-statutory-guidance/care-and-support-statutory-guidance" },
      { label: "GOV.UK — NHS CHC public information leaflet", href: "https://www.gov.uk/government/publications/nhs-continuing-healthcare-and-nhs-funded-nursing-care-public-information-leaflet/public-information-leaflet-nhs-continuing-healthcare-and-nhs-funded-nursing-care--2" }
    ]
  },
  {
    slug: "council-care-assessment-rejected-how-to-challenge",
    title: "My council care assessment was rejected: how can I challenge the decision?",
    description: "What to do if you disagree with an adult social-care needs assessment in England, including the council complaints route and the Local Government and Social Care Ombudsman.",
    eyebrow: "Local Authority assessments",
    updated: "26 August 2026",
    sections: [
      {
        heading: "Start by identifying what was actually decided",
        paragraphs: [
          "People often say that a council assessment was 'rejected', but several different things may have happened: the council may have declined to carry out an assessment, completed an assessment but found no eligible needs, or accepted needs but proposed a care plan that the person believes is inadequate.",
          "The route you take depends on the actual decision, so ask for the assessment, eligibility decision, reasons and any care-and-support plan in writing."
        ]
      },
      {
        heading: "The Care Act assessment duty",
        paragraphs: [
          "Sections 9 and 10 of the Care Act require a Local Authority to assess an adult who appears to have needs for care and support. The assessment duty is not limited to people who the council already believes will qualify for funded support, and it is not dependent on the person's finances."
        ]
      },
      {
        heading: "If you disagree with the result",
        paragraphs: [
          "There is not one universal national 'appeal form' for an adult social-care needs assessment. NHS public guidance says to complain first through the Local Authority's formal complaints procedure. If you remain dissatisfied with how the complaint was handled, you can normally take the complaint to the Local Government and Social Care Ombudsman."
        ],
        bullets: [
          "Identify factual errors or important needs that were omitted.",
          "Explain how those needs affect wellbeing and the outcomes the person is trying to achieve.",
          "Attach concise supporting evidence rather than sending an unstructured bundle of documents.",
          "State the remedy you are asking for — for example, correction of factual errors, reconsideration, reassessment or a revised care-and-support plan.",
          "Keep a dated record of correspondence and the council's complaint responses."
        ]
      },
      {
        heading: "If the council says there are no eligible needs",
        paragraphs: [
          "Even where a needs assessment concludes that a person does not qualify for council-funded care and support, NHS guidance says the council should still provide free advice about other sources of help in the community. Ask for that information if it has not been provided."
        ]
      }
    ],
    sources: [
      { label: "NHS — Getting a care needs assessment", href: "https://www.nhs.uk/social-care-and-support/help-from-social-services-and-charities/getting-a-needs-assessment/" },
      { label: "GOV.UK — Care and Support Statutory Guidance", href: "https://www.gov.uk/government/publications/care-act-statutory-guidance/care-and-support-statutory-guidance" },
      { label: "Local Government & Social Care Ombudsman", href: "https://www.lgo.org.uk/" }
    ]
  }
];

export function findInsight(slug: string) {
  return insightArticles.find((article) => article.slug === slug);
}
