import {
  BadgeCheck,
  Clock,
  Building2,
  Tag,
  ExternalLink,
} from "lucide-react";
import type { DataPoint } from "@/types";
import { formatRelativeDate, truncate } from "@/lib/utils";

interface VerifiedDataCardProps {
  dataPoint: DataPoint;
  onSelect?: (dp: DataPoint) => void;
}

export default function VerifiedDataCard({
  dataPoint,
  onSelect,
}: VerifiedDataCardProps) {
  const isVerified = dataPoint.status === "verified";

  return (
    <article
      onClick={() => onSelect?.(dataPoint)}
      className={`group relative rounded-xl border bg-white p-5 shadow-sm transition-all hover:shadow-md ${
        onSelect ? "cursor-pointer" : ""
      } ${
        isVerified
          ? "border-sl-green-200 hover:border-sl-green-400"
          : "border-sl-gray-200"
      }`}
      role={onSelect ? "button" : undefined}
      tabIndex={onSelect ? 0 : undefined}
      onKeyDown={(e) => {
        if (onSelect && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onSelect(dataPoint);
        }
      }}
    >
      {/* Header row */}
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold leading-snug text-sl-gray-900 group-hover:text-sl-green-600 sm:text-lg">
          {dataPoint.title}
        </h3>
        {isVerified && (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-sl-green-50 px-2.5 py-1 text-xs font-semibold text-sl-green-700">
            <BadgeCheck className="h-3.5 w-3.5" />
            Verified
          </span>
        )}
      </div>

      {/* Summary */}
      <p className="mb-4 text-sm leading-relaxed text-sl-gray-600">
        {truncate(dataPoint.summary, 200)}
      </p>

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-sl-gray-500">
        {/* Source ministry */}
        <span className="inline-flex items-center gap-1">
          <Building2 className="h-3.5 w-3.5" />
          {dataPoint.ministry?.abbreviation ?? "Unknown"}
        </span>

        {/* Category */}
        {dataPoint.category && (
          <span className="inline-flex items-center gap-1">
            <Tag className="h-3.5 w-3.5" />
            {dataPoint.category.name}
          </span>
        )}

        {/* Date */}
        <span className="inline-flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" />
          Updated {formatRelativeDate(dataPoint.updated_at)}
        </span>

        {/* Source link */}
        {dataPoint.source_url && (
          <a
            href={dataPoint.source_url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 text-sl-blue-500 hover:text-sl-blue-600"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Source
          </a>
        )}
      </div>

      {/* Tags */}
      {dataPoint.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {dataPoint.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded bg-sl-gray-100 px-2 py-0.5 text-[11px] font-medium text-sl-gray-500"
            >
              {tag}
            </span>
          ))}
          {dataPoint.tags.length > 4 && (
            <span className="rounded bg-sl-gray-100 px-2 py-0.5 text-[11px] font-medium text-sl-gray-500">
              +{dataPoint.tags.length - 4} more
            </span>
          )}
        </div>
      )}
    </article>
  );
}
