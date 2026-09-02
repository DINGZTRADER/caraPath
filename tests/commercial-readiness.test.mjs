import assert from "node:assert/strict";
import test from "node:test";

import {
  assessMembershipLaunch,
  proposedCommercialSettings,
} from "../lib/commercial-readiness.ts";

test("keeps membership sales and third-party monetisation inactive by default", () => {
  assert.equal(proposedCommercialSettings.membershipSalesEnabled, false);
  assert.equal(proposedCommercialSettings.providerPromotionEnabled, false);
  assert.equal(proposedCommercialSettings.affiliateLinksEnabled, false);
  assert.equal(proposedCommercialSettings.proposedTrialDays, 7);
});

test("blocks membership activation while required approvals are missing", () => {
  assert.deepEqual(assessMembershipLaunch({}), {
    canActivate: false,
    blockers: [
      "membership price",
      "VAT position",
      "trial billing terms",
      "cancellation and access-end rules",
      "refund policy",
      "privacy and membership legal review",
    ],
  });
});

test("allows technical activation only when every commercial and legal gate is confirmed", () => {
  assert.deepEqual(
    assessMembershipLaunch({
      membershipPriceConfirmed: true,
      vatPositionConfirmed: true,
      trialBillingTermsConfirmed: true,
      cancellationTermsConfirmed: true,
      refundPolicyConfirmed: true,
      legalReviewConfirmed: true,
    }),
    { canActivate: true, blockers: [] },
  );
});
