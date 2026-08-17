export default function MemberResourcesPage() {
  return (
    <main className="member-main">
      <section className="member-card">
        <p className="eyebrow">Resource Vault</p>
        <h1>Member resources</h1>
        <p>Use these starting points to prepare for common health and social-care conversations. Keep personal records and identifying information out of the Member Area.</p>
        <div className="resource-list">
          <a href="https://www.surreycc.gov.uk/adults/carers/assessing-your-needs" target="_blank" rel="noreferrer">Carer’s assessment guidance</a>
          <a href="https://www.gov.uk/mandatory-reconsideration" target="_blank" rel="noreferrer">PIP mandatory reconsideration</a>
          <a href="https://www.gov.uk/government/publications/national-framework-for-nhs-continuing-healthcare-and-nhs-funded-nursing-care" target="_blank" rel="noreferrer">NHS Continuing Healthcare framework</a>
        </div>
      </section>
    </main>
  );
}
