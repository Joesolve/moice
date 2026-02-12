"use client";

import type { DataPoint } from "@/types";
import VerifiedDataCard from "@/components/cards/VerifiedDataCard";
import DataPointDetail from "@/components/cards/DataPointDetail";
import { useState } from "react";
import { SearchX } from "lucide-react";

interface SearchResultsProps {
  results: DataPoint[];
  query: string;
  isLoading?: boolean;
  hasFilters?: boolean;
}

export default function SearchResults({
  results,
  query,
  isLoading,
  hasFilters,
}: SearchResultsProps) {
  const [selected, setSelected] = useState<DataPoint | null>(null);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="animate-search-pulse rounded-xl border border-sl-gray-200 bg-white p-5"
          >
            <div className="mb-3 h-5 w-3/4 rounded bg-sl-gray-200" />
            <div className="mb-2 h-4 w-full rounded bg-sl-gray-100" />
            <div className="h-4 w-2/3 rounded bg-sl-gray-100" />
          </div>
        ))}
      </div>
    );
  }

  if (selected) {
    return (
      <DataPointDetail
        dataPoint={selected}
        onBack={() => setSelected(null)}
      />
    );
  }

  if ((query || hasFilters) && results.length === 0) {
    return (
      <div className="rounded-xl border border-sl-gray-200 bg-white p-10 text-center">
        <SearchX className="mx-auto mb-3 h-12 w-12 text-sl-gray-300" />
        <h3 className="text-lg font-semibold text-sl-gray-700">
          No results found
        </h3>
        <p className="mt-1 text-sm text-sl-gray-500">
          {query
            ? `No verified data matches "${query}".`
            : "No verified data matches the selected filters."}{" "}
          Try different keywords{hasFilters ? ", adjust your filters," : ""} or
          browse by category.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {results.map((dp) => (
        <VerifiedDataCard
          key={dp.id}
          dataPoint={dp}
          onSelect={setSelected}
        />
      ))}
    </div>
  );
}
