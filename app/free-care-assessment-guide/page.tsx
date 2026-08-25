import type { Metadata } from "next";
import { PublicHeader } from "../public-header";
import { FreeGuideLeadForm } from "./lead-form";

export const metadata: Metadata = {
  title: "Free Care Assessment Starter Guide | The Clara Path",
  description: "Free fillable starter pages to help family carers begin preparing for a Local Authority care assessment.",
};

export default function FreeCareAssessmentGuidePage() {
  return (
    <>
      <PublicHeader />
      <main>
        <section className="hero">
          <div className="container hero-grid">
            <div>
              <p className="eyebrow">Free Clara Path resource</p>
              <h1>Start preparing before the assessment meeting.</h1>
              <p className="lede">Download a short, fillable sample from The UK Care Assessment Prep Guide and begin recording the real-life support, prompting, risks and difficulties that are easy to forget under pressure.</p>
              <div className="notice">
                The free starter includes four sample Care Act outcome prompts and a one-day care evidence log. Premium members receive the complete guide with all 10 outcomes, a two-week logbook, meeting cheat sheet and the wider Resource Vault.
              </div>
            </div>
            <FreeGuideLeadForm />
          </div>
        </section>

        <section className="quick-start-section">
          <div className="container">
            <div className="section-intro">
              <div><p className="eyebrow">What the full member guide adds</p><h2>From starter page to organised evidence pack.</h2></div>
              <p>The premium guide is designed to help families capture accurate examples and ask clearer questions. It does not determine eligibility or guarantee funding.</p>
            </div>
            <div className="steps">
              <article className="step"><span className="step-number">01</span><h3>All 10 Care Act outcomes</h3><p>Plain-English prompts covering the complete adult eligibility outcome list rather than a partial checklist.</p></article>
              <article className="step"><span className="step-number">02</span><h3>Two-week care log</h3><p>Fillable daily evidence pages for support, prompting, supervision, risk, difficult days and night-time interruptions.</p></article>
              <article className="step"><span className="step-number">03</span><h3>Meeting cheat sheet</h3><p>Questions covering CHC screening, Direct Payments and a separate Carer’s Assessment, plus space to record what was agreed.</p></article>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
