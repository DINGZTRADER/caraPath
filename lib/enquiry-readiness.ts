const CLOSED_REASON =
  "Enquiry submissions will open after the response and safeguarding process is confirmed.";

type EnquiryEnvironment = Readonly<{
  enquiryEmail?: string;
  endpoint?: string;
}>;

type EnquiryReadiness =
  | Readonly<{ acceptingEnquiries: false; reason: string }>
  | Readonly<{
      acceptingEnquiries: true;
      enquiryEmail: string;
      endpoint: string;
    }>;

export function getEnquiryReadiness(environment: EnquiryEnvironment): EnquiryReadiness {
  const enquiryEmail = environment.enquiryEmail?.trim();
  const endpoint = environment.endpoint?.trim();
  const hasValidEmail = Boolean(
    enquiryEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiryEmail),
  );
  const hasInternalEndpoint = Boolean(endpoint && /^\/api\/[a-z0-9/-]+$/i.test(endpoint));

  if (!hasValidEmail || !hasInternalEndpoint) {
    return { acceptingEnquiries: false, reason: CLOSED_REASON };
  }

  return {
    acceptingEnquiries: true,
    enquiryEmail: enquiryEmail!,
    endpoint: endpoint!,
  };
}
