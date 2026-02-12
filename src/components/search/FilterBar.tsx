"use client";

import { Building2, Calendar, X } from "lucide-react";
import { MINISTRIES } from "@/lib/mock-data";

export interface FilterValues {
  ministryId: string;
  dateFrom: string;
  dateTo: string;
}

interface FilterBarProps {
  filters: FilterValues;
  onChange: (filters: FilterValues) => void;
}

export default function FilterBar({ filters, onChange }: FilterBarProps) {
  const hasActiveFilters =
    filters.ministryId || filters.dateFrom || filters.dateTo;

  const clearAll = () => {
    onChange({ ministryId: "", dateFrom: "", dateTo: "" });
  };

  return (
    <div className="rounded-xl border border-sl-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-sl-gray-700">
          Filter by Ministry & Date
        </h3>
        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium text-sl-gray-500 transition-colors hover:bg-sl-gray-100 hover:text-sl-gray-700"
          >
            <X className="h-3 w-3" />
            Clear filters
          </button>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        {/* Ministry filter */}
        <div className="flex-1">
          <label
            htmlFor="filter-ministry"
            className="mb-1 flex items-center gap-1.5 text-xs font-medium text-sl-gray-500"
          >
            <Building2 className="h-3.5 w-3.5" />
            Ministry
          </label>
          <select
            id="filter-ministry"
            value={filters.ministryId}
            onChange={(e) =>
              onChange({ ...filters, ministryId: e.target.value })
            }
            className="h-10 w-full rounded-lg border border-sl-gray-200 bg-white px-3 text-sm text-sl-gray-700 focus:border-sl-green-500 focus:outline-none focus:ring-2 focus:ring-sl-green-500/20"
          >
            <option value="">All Ministries</option>
            {MINISTRIES.map((m) => (
              <option key={m.id} value={m.id}>
                {m.abbreviation} — {m.name}
              </option>
            ))}
          </select>
        </div>

        {/* Date from */}
        <div className="flex-1">
          <label
            htmlFor="filter-date-from"
            className="mb-1 flex items-center gap-1.5 text-xs font-medium text-sl-gray-500"
          >
            <Calendar className="h-3.5 w-3.5" />
            Verified from
          </label>
          <input
            id="filter-date-from"
            type="date"
            value={filters.dateFrom}
            onChange={(e) =>
              onChange({ ...filters, dateFrom: e.target.value })
            }
            className="h-10 w-full rounded-lg border border-sl-gray-200 bg-white px-3 text-sm text-sl-gray-700 focus:border-sl-green-500 focus:outline-none focus:ring-2 focus:ring-sl-green-500/20"
          />
        </div>

        {/* Date to */}
        <div className="flex-1">
          <label
            htmlFor="filter-date-to"
            className="mb-1 flex items-center gap-1.5 text-xs font-medium text-sl-gray-500"
          >
            <Calendar className="h-3.5 w-3.5" />
            Verified until
          </label>
          <input
            id="filter-date-to"
            type="date"
            value={filters.dateTo}
            onChange={(e) =>
              onChange({ ...filters, dateTo: e.target.value })
            }
            className="h-10 w-full rounded-lg border border-sl-gray-200 bg-white px-3 text-sm text-sl-gray-700 focus:border-sl-green-500 focus:outline-none focus:ring-2 focus:ring-sl-green-500/20"
          />
        </div>
      </div>

      {/* Active filter summary */}
      {hasActiveFilters && (
        <div className="mt-3 flex flex-wrap gap-2">
          {filters.ministryId && (
            <span className="inline-flex items-center gap-1 rounded-full bg-sl-green-50 px-2.5 py-1 text-xs font-medium text-sl-green-700">
              <Building2 className="h-3 w-3" />
              {MINISTRIES.find((m) => m.id === filters.ministryId)
                ?.abbreviation ?? "Ministry"}
              <button
                onClick={() => onChange({ ...filters, ministryId: "" })}
                className="ml-0.5 rounded-full p-0.5 hover:bg-sl-green-100"
                aria-label="Remove ministry filter"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          {filters.dateFrom && (
            <span className="inline-flex items-center gap-1 rounded-full bg-sl-blue-50 px-2.5 py-1 text-xs font-medium text-sl-blue-700">
              <Calendar className="h-3 w-3" />
              From {filters.dateFrom}
              <button
                onClick={() => onChange({ ...filters, dateFrom: "" })}
                className="ml-0.5 rounded-full p-0.5 hover:bg-sl-blue-100"
                aria-label="Remove start date filter"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          {filters.dateTo && (
            <span className="inline-flex items-center gap-1 rounded-full bg-sl-blue-50 px-2.5 py-1 text-xs font-medium text-sl-blue-700">
              <Calendar className="h-3 w-3" />
              Until {filters.dateTo}
              <button
                onClick={() => onChange({ ...filters, dateTo: "" })}
                className="ml-0.5 rounded-full p-0.5 hover:bg-sl-blue-100"
                aria-label="Remove end date filter"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
