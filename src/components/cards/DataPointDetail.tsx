"use client";

import type { DataPoint } from "@/types";
import { formatDate } from "@/lib/utils";
import {
  ArrowLeft,
  BadgeCheck,
  Building2,
  Calendar,
  Tag,
  ExternalLink,
  History,
} from "lucide-react";
import ShareButtons from "@/components/cards/ShareButtons";

interface DataPointDetailProps {
  dataPoint: DataPoint;
  onBack: () => void;
}

export default function DataPointDetail({
  dataPoint,
  onBack,
}: DataPointDetailProps) {
  return (
    <div className="rounded-xl border border-sl-gray-200 bg-white shadow-sm">
      {/* Back button */}
      <div className="border-b border-sl-gray-100 px-5 py-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-sl-gray-500 hover:text-sl-gray-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to results
        </button>
      </div>

      <div className="p-5 sm:p-8">
        {/* Status badge */}
        <div className="mb-4 flex items-center gap-3">
          {dataPoint.status === "verified" && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sl-green-50 px-3 py-1 text-sm font-semibold text-sl-green-700">
              <BadgeCheck className="h-4 w-4" />
              Verified by MOICE
            </span>
          )}
          {dataPoint.category && (
            <span className="inline-flex items-center gap-1 rounded-full bg-sl-blue-50 px-3 py-1 text-sm font-medium text-sl-blue-700">
              <Tag className="h-3.5 w-3.5" />
              {dataPoint.category.name}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="mb-4 text-2xl font-bold text-sl-gray-900 sm:text-3xl">
          {dataPoint.title}
        </h1>

        {/* Meta row */}
        <div className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-sl-gray-500">
          <span className="inline-flex items-center gap-1.5">
            <Building2 className="h-4 w-4" />
            {dataPoint.ministry?.name ?? "Unknown Ministry"}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            Last updated {formatDate(dataPoint.updated_at)}
          </span>
          {dataPoint.verified_at && (
            <span className="inline-flex items-center gap-1.5">
              <BadgeCheck className="h-4 w-4 text-sl-green-500" />
              Verified {formatDate(dataPoint.verified_at)}
            </span>
          )}
        </div>

        {/* Summary */}
        <div className="mb-6 rounded-lg bg-sl-green-50/50 p-4">
          <h2 className="mb-1 text-xs font-semibold uppercase tracking-wider text-sl-green-700">
            Summary
          </h2>
          <p className="text-sm leading-relaxed text-sl-gray-700">
            {dataPoint.summary}
          </p>
        </div>

        {/* Full body */}
        <div className="prose prose-sm max-w-none text-sl-gray-700">
          {dataPoint.body.split("\n").map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        {/* Tags */}
        {dataPoint.tags.length > 0 && (
          <div className="mt-6 border-t border-sl-gray-100 pt-4">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-sl-gray-500">
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {dataPoint.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-sl-gray-100 px-3 py-1 text-xs font-medium text-sl-gray-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Social sharing */}
        {dataPoint.status === "verified" && (
          <div className="mt-6 border-t border-sl-gray-100 pt-4">
            <ShareButtons
              title={dataPoint.title}
              summary={dataPoint.summary}
              dataPointId={dataPoint.id}
            />
          </div>
        )}

        {/* Footer links */}
        <div className="mt-4 flex flex-wrap gap-4 border-t border-sl-gray-100 pt-4">
          {dataPoint.source_url && (
            <a
              href={dataPoint.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-sl-blue-500 hover:text-sl-blue-600"
            >
              <ExternalLink className="h-4 w-4" />
              View original source
            </a>
          )}
          <button className="inline-flex items-center gap-1.5 text-sm font-medium text-sl-gray-500 hover:text-sl-gray-700">
            <History className="h-4 w-4" />
            View audit trail
          </button>
        </div>
      </div>
    </div>
  );
}
