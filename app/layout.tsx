import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "The Clara Path | Carer’s Circle",
    template: "%s | The Clara Path"
  },
  description:
    "The Clara Path helps individuals, unpaid carers, family members and friends navigate health and social care in England and Wales.",
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB">
      <body>{children}</body>
    </html>
  );
}
