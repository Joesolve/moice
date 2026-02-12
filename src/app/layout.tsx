import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "National Knowledge Hub - Sierra Leone",
  description:
    "The official central repository for verified government data from the Republic of Sierra Leone. Search verified facts, statistics, and reports from all government ministries.",
  keywords: ["Sierra Leone", "government data", "MOICE", "verified data", "transparency"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-sl-gray-50 text-sl-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
