"use client";

import { useState, useCallback } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SearchBar from "@/components/search/SearchBar";
import SearchResults from "@/components/search/SearchResults";
import StatsBar from "@/components/cards/StatsBar";
import { searchMockData, MOCK_DATA_POINTS } from "@/lib/mock-data";
import type { DataPoint } from "@/types";
import { Shield, FileCheck, Eye } from "lucide-react";

export default function HomePage() {
  const [results, setResults] = useState<DataPoint[]>([]);
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = useCallback((searchQuery: string) => {
    setQuery(searchQuery);
    setIsLoading(true);
    setHasSearched(true);

    // Simulate network latency for realism
    setTimeout(() => {
      const found = searchMockData(searchQuery);
      setResults(found);
      setIsLoading(false);
    }, 400);
  }, []);

  const verifiedCount = MOCK_DATA_POINTS.filter(
    (dp) => dp.status === "verified"
  ).length;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero section */}
        <section className="bg-gradient-to-br from-sl-green-600 via-sl-green-500 to-sl-blue-600 px-4 pb-16 pt-12 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
              <Shield className="h-4 w-4" />
              Official Government Data Repository
            </div>
            <h1 className="mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Sierra Leone National
              <br />
              Knowledge Hub
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-base text-white/80 sm:text-lg">
              Access verified data and statistics from all government
              ministries. Transparent, accurate, and up-to-date information for
              every citizen.
            </p>

            {/* Search */}
            <div id="search" className="mx-auto max-w-2xl">
              <SearchBar onSearch={handleSearch} isLoading={isLoading} />
            </div>
          </div>
        </section>

        {/* Trust pillars */}
        <section className="border-b border-sl-gray-200 bg-white px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-3">
            {[
              {
                icon: Shield,
                title: "Verified by MOICE",
                desc: "Every data point is reviewed and verified by the Ministry of Information and Civic Education before publication.",
              },
              {
                icon: FileCheck,
                title: "Full Audit Trail",
                desc: "Complete transparency with a tracked history of every edit, submission, and verification action.",
              },
              {
                icon: Eye,
                title: "Open & Accessible",
                desc: "Designed for all Sierra Leoneans. Optimized for mobile and low-bandwidth environments.",
              },
            ].map((pillar) => (
              <div key={pillar.title} className="flex gap-3">
                <div className="rounded-lg bg-sl-green-50 p-2.5">
                  <pillar.icon className="h-5 w-5 text-sl-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-sl-gray-900">
                    {pillar.title}
                  </h3>
                  <p className="mt-1 text-sm text-sl-gray-500">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <StatsBar />
          </div>
        </section>

        {/* Results / Browse */}
        <section className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            {hasSearched ? (
              <SearchResults
                results={results}
                query={query}
                isLoading={isLoading}
              />
            ) : (
              <div>
                <h2 className="mb-4 text-xl font-bold text-sl-gray-900">
                  Recently Verified Data
                </h2>
                <p className="mb-6 text-sm text-sl-gray-500">
                  Showing the {verifiedCount} most recently verified data points
                  across all ministries.
                </p>
                <SearchResults
                  results={MOCK_DATA_POINTS.filter(
                    (dp) => dp.status === "verified"
                  )}
                  query=""
                />
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
