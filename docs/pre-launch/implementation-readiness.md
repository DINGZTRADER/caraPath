# Implementation readiness

Status checked: 2 September 2026

## Safe inactive defaults

- Proposed trial length is recorded as seven days for planning only.
- Membership sales are disabled in `lib/commercial-readiness.ts`.
- Paid provider promotion is disabled.
- Affiliate links are disabled.
- The enquiry form remains closed unless both an internal API endpoint and monitored inbox are configured.
- No real inbox, credentials, prices or approval evidence are stored in source control.

## Activation gates

Membership cannot be considered launch-ready until all of these are confirmed:

1. membership price;
2. VAT position;
3. trial billing terms;
4. cancellation and access-end rules;
5. refund policy; and
6. privacy and membership legal review.

Enquiries cannot open until the monitored inbox, internal endpoint, response workflow, privacy information and safeguarding escalation process are operational.

## Deferred commercial features

Provider promotion and affiliate links stay disabled until verification criteria, conflicts, labels, pricing, moderation/removal rules and ownership disclosures are approved.

