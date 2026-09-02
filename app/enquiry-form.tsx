import { getEnquiryReadiness } from "../lib/enquiry-readiness";

export function EnquiryForm() {
  const readiness = getEnquiryReadiness({
    enquiryEmail: process.env.CLARA_PATH_ENQUIRY_EMAIL,
    endpoint: process.env.CLARA_PATH_ENQUIRY_ENDPOINT,
  });
  const acceptingEnquiries = readiness.acceptingEnquiries;

  return (
    <form
      action={acceptingEnquiries ? readiness.endpoint : undefined}
      className="enquiry-form"
      method="post"
    >
      <fieldset disabled={!acceptingEnquiries}>
        <legend className="sr-only">Request help from The Clara Path</legend>

        <div className="form-grid">
          <label>
            <span>Your name</span>
            <input autoComplete="name" maxLength={100} name="name" required type="text" />
          </label>
          <label>
            <span>Email address</span>
            <input autoComplete="email" maxLength={254} name="email" required type="email" />
          </label>
          <label>
            <span>Telephone number <small>(optional)</small></span>
            <input autoComplete="tel" maxLength={30} name="telephone" type="tel" />
          </label>
          <label>
            <span>Who needs support?</span>
            <select name="supportFor" required>
              <option value="">Please select</option>
              <option value="myself">Myself</option>
              <option value="someone-else">A family member or friend</option>
              <option value="carer">I am supporting someone as a carer</option>
            </select>
          </label>
        </div>

        <label>
          <span>What would you like help navigating?</span>
          <select name="topic" required>
            <option value="">Please select</option>
            <option value="social-care">Adult social care</option>
            <option value="continuing-healthcare">NHS Continuing Healthcare</option>
            <option value="assessment-or-review">An assessment or review</option>
            <option value="decision-or-appeal">A decision or appeal route</option>
            <option value="other">Something else</option>
          </select>
        </label>

        <label aria-describedby="enquiry-privacy-note">
          <span>Briefly describe the next step you are trying to understand</span>
          <textarea maxLength={1200} name="summary" required rows={6} />
        </label>

        <p className="form-help" id="enquiry-privacy-note">
          Please give only a short outline. Do not include medical records, NHS numbers,
          financial details, passwords or unredacted documents.
        </p>

        <button className="button button-primary" type="submit">Send my enquiry</button>
      </fieldset>

      {!acceptingEnquiries ? (
        <p className="enquiry-status" role="status">
          {readiness.reason} This preview does not collect or send the information entered above.
        </p>
      ) : null}
    </form>
  );
}
