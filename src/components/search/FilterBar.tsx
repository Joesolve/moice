"use client";

import { Building2, Calendar } from "lucide-react";
import { MINISTRIES } from "@/lib/mock-data";

export interface FilterValues {
  ministryId: string;
  date: string;
}

interface FilterBarProps {
  filters: FilterValues;
  onChange: (filters: FilterValues) => void;
}

export default function FilterBar({ filters, onChange }: FilterBarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      {/* Ministry filter */}
      <div className="flex-1">
        <label
          htmlFor="filter-ministry"
          className="mb-1 flex items-center gap-1.5 text-xs font-medium text-white/70"
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
          className="h-11 w-full rounded-lg border-2 border-white/20 bg-white/10 px-3 text-sm text-white backdrop-blur-sm placeholder:text-white/50 focus:border-white/50 focus:outline-none focus:ring-2 focus:ring-white/20"
        >
          <option value="" className="text-sl-gray-700">All Ministries</option>
          {MINISTRIES.map((m) => (
            <option key={m.id} value={m.id} className="text-sl-gray-700">
              {m.abbreviation} — {m.name}
            </option>
          ))}
        </select>
      </div>

      {/* Date filter */}
      <div className="flex-1">
        <label
          htmlFor="filter-date"
          className="mb-1 flex items-center gap-1.5 text-xs font-medium text-white/70"
        >
          <Calendar className="h-3.5 w-3.5" />
          Date
        </label>
        <input
          id="filter-date"
          type="date"
          value={filters.date}
          onChange={(e) =>
            onChange({ ...filters, date: e.target.value })
          }
          className="h-11 w-full rounded-lg border-2 border-white/20 bg-white/10 px-3 text-sm text-white backdrop-blur-sm focus:border-white/50 focus:outline-none focus:ring-2 focus:ring-white/20"
        />
      </div>
    </div>
  );
}
