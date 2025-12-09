import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Somalia Government Complaint & Feedback System",
  description:
    "a digital platform designed to strengthen communication between Somali citizens and government authorities. It provides a reliable, transparent, and organized way for the public to submit complaints, give feedback, and track the progress of their cases.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
