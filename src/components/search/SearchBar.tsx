"use client";

import { Search, Loader2 } from "lucide-react";
import { useState, useCallback } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
  initialQuery?: string;
}

export default function SearchBar({
  onSearch,
  isLoading = false,
  initialQuery = "",
}: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onSearch(query.trim());
    },
    [query, onSearch]
  );

  return (
    <form onSubmit={handleSubmit} className="w-full" role="search">
      <div className="relative flex items-center">
        <div className="pointer-events-none absolute left-4 text-sl-gray-400">
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Search className="h-5 w-5" />
          )}
        </div>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Search verified government data (e.g. "Bridge Budget", "Health Stats")'
          className="h-14 w-full rounded-xl border-2 border-sl-gray-200 bg-white pl-12 pr-28 text-base text-sl-gray-900 placeholder:text-sl-gray-400 focus:border-sl-green-500 focus:outline-none focus:ring-4 focus:ring-sl-green-500/20 sm:text-lg"
          aria-label="Search government data"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="absolute right-2 rounded-lg bg-sl-green-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sl-green-600 disabled:opacity-50 sm:px-6"
        >
          Search
        </button>
      </div>

      {/* Quick filter chips */}
      <div className="mt-3 flex flex-wrap gap-2">
        {["Health", "Budget", "Education", "Infrastructure", "Agriculture"].map(
          (tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => {
                setQuery(tag);
                onSearch(tag);
              }}
              className="rounded-full border border-sl-gray-200 bg-white px-3 py-1 text-xs font-medium text-sl-gray-600 transition-colors hover:border-sl-green-500 hover:bg-sl-green-50 hover:text-sl-green-700"
            >
              {tag}
            </button>
          )
        )}
      </div>
    </form>
  );
}
