import assert from "node:assert/strict";
import test from "node:test";

import { getEnquiryReadiness } from "../lib/enquiry-readiness.ts";

const closedState = {
  acceptingEnquiries: false,
  reason: "Enquiry submissions will open after the response and safeguarding process is confirmed.",
};

test("keeps the enquiry form closed until its operations are configured", () => {
  assert.deepEqual(getEnquiryReadiness({}), closedState);
  assert.deepEqual(
    getEnquiryReadiness({ enquiryEmail: "enquiries@theclarapath.org" }),
    closedState,
  );
});

test("opens the enquiry form when its inbox and delivery endpoint are configured", () => {
  assert.deepEqual(
    getEnquiryReadiness({
      enquiryEmail: " enquiries@theclarapath.org ",
      endpoint: "/api/enquiries",
    }),
    {
      acceptingEnquiries: true,
      enquiryEmail: "enquiries@theclarapath.org",
      endpoint: "/api/enquiries",
    },
  );
});

test("rejects malformed or external delivery configuration", () => {
  assert.deepEqual(
    getEnquiryReadiness({ enquiryEmail: "not-an-email", endpoint: "/api/enquiries" }),
    closedState,
  );
  assert.deepEqual(
    getEnquiryReadiness({
      enquiryEmail: "enquiries@theclarapath.org",
      endpoint: "https://example.com/collect",
    }),
    closedState,
  );
});
