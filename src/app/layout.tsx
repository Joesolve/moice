import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth/context";
import { CategoriesProvider } from "@/lib/categories/context";
import { MinistriesProvider } from "@/lib/ministries/context";
import { CivicEducationProvider } from "@/lib/civic-education/context";
import { AnnouncementsProvider } from "@/lib/announcements/context";

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
        <AuthProvider>
          <MinistriesProvider>
            <CategoriesProvider>
              <CivicEducationProvider>
                <AnnouncementsProvider>
                  {children}
                </AnnouncementsProvider>
              </CivicEducationProvider>
            </CategoriesProvider>
          </MinistriesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
