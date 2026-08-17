import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Clara Path Member Area",
  description: "Secure access to The Clara Path Carer’s Circle Member Area."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB">
      <body>{children}</body>
    </html>
  );
}
