export const proposedCommercialSettings = Object.freeze({
  proposedTrialDays: 7,
  membershipSalesEnabled: false,
  providerPromotionEnabled: false,
  affiliateLinksEnabled: false,
});

type MembershipApprovals = Readonly<{
  membershipPriceConfirmed?: boolean;
  vatPositionConfirmed?: boolean;
  trialBillingTermsConfirmed?: boolean;
  cancellationTermsConfirmed?: boolean;
  refundPolicyConfirmed?: boolean;
  legalReviewConfirmed?: boolean;
}>;

const approvalGates = [
  ["membershipPriceConfirmed", "membership price"],
  ["vatPositionConfirmed", "VAT position"],
  ["trialBillingTermsConfirmed", "trial billing terms"],
  ["cancellationTermsConfirmed", "cancellation and access-end rules"],
  ["refundPolicyConfirmed", "refund policy"],
  ["legalReviewConfirmed", "privacy and membership legal review"],
] as const satisfies ReadonlyArray<readonly [keyof MembershipApprovals, string]>;

export function assessMembershipLaunch(approvals: MembershipApprovals) {
  const blockers = approvalGates
    .filter(([key]) => approvals[key] !== true)
    .map(([, label]) => label);

  return {
    canActivate: blockers.length === 0,
    blockers,
  } as const;
}
