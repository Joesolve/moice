"use client";

import { useState } from "react";
import {
  BadgeCheck,
  XCircle,
  Eye,
  Clock,
  Building2,
  ArrowLeft,
} from "lucide-react";
import { MOCK_DATA_POINTS } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import type { DataPoint, DataPointStatus } from "@/types";

export default function ReviewQueueView() {
  const [items, setItems] = useState(
    MOCK_DATA_POINTS.filter(
      (dp) => dp.status === "pending_review" || dp.status === "draft"
    )
  );
  const [selectedItem, setSelectedItem] = useState<DataPoint | null>(null);

  function handleStatusChange(id: string, newStatus: DataPointStatus) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: newStatus,
              reviewed_by: "admin1",
              verified_at:
                newStatus === "verified" ? new Date().toISOString() : null,
            }
          : item
      )
    );
    setSelectedItem(null);
  }

  const statusColors: Record<string, string> = {
    draft: "bg-sl-gray-100 text-sl-gray-700",
    pending_review: "bg-amber-100 text-amber-700",
    verified: "bg-sl-green-100 text-sl-green-700",
    rejected: "bg-red-100 text-red-700",
  };

  if (selectedItem) {
    return (
      <div>
        <button
          onClick={() => setSelectedItem(null)}
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-sl-gray-500 hover:text-sl-gray-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to queue
        </button>

        <div className="rounded-xl border border-sl-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColors[selectedItem.status]}`}
            >
              {selectedItem.status.replace("_", " ")}
            </span>
            <span className="text-sm text-sl-gray-500">
              <Building2 className="mr-1 inline h-3.5 w-3.5" />
              {selectedItem.ministry?.name}
            </span>
          </div>

          <h2 className="mb-2 text-xl font-bold text-sl-gray-900">
            {selectedItem.title}
          </h2>

          <div className="mb-4 rounded-lg bg-sl-gray-50 p-4">
            <h3 className="mb-1 text-xs font-semibold uppercase tracking-wider text-sl-gray-500">
              Summary
            </h3>
            <p className="text-sm text-sl-gray-700">{selectedItem.summary}</p>
          </div>

          <div className="mb-6">
            <h3 className="mb-1 text-xs font-semibold uppercase tracking-wider text-sl-gray-500">
              Full Content
            </h3>
            <p className="text-sm leading-relaxed text-sl-gray-700">
              {selectedItem.body}
            </p>
          </div>

          {selectedItem.tags.length > 0 && (
            <div className="mb-6">
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-sl-gray-500">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedItem.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-sl-gray-100 px-3 py-1 text-xs text-sl-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3 border-t border-sl-gray-100 pt-4">
            <button
              onClick={() => handleStatusChange(selectedItem.id, "verified")}
              className="inline-flex items-center gap-2 rounded-lg bg-sl-green-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sl-green-600"
            >
              <BadgeCheck className="h-4 w-4" />
              Verify & Publish
            </button>
            <button
              onClick={() => handleStatusChange(selectedItem.id, "rejected")}
              className="inline-flex items-center gap-2 rounded-lg border border-red-300 bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-700 transition-colors hover:bg-red-100"
            >
              <XCircle className="h-4 w-4" />
              Reject
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-sl-gray-900">Review Queue</h1>
        <p className="text-sm text-sl-gray-500">
          Data submissions awaiting MOICE verification
        </p>
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl border border-sl-gray-200 bg-white p-10 text-center">
          <BadgeCheck className="mx-auto mb-3 h-12 w-12 text-sl-green-300" />
          <p className="font-semibold text-sl-gray-700">All caught up!</p>
          <p className="text-sm text-sl-gray-500">
            No items pending review.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((dp) => (
            <div
              key={dp.id}
              className="flex items-center justify-between rounded-xl border border-sl-gray-200 bg-white p-4 shadow-sm transition-colors hover:border-sl-gray-300"
            >
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${statusColors[dp.status]}`}
                  >
                    {dp.status.replace("_", " ")}
                  </span>
                  <span className="text-xs text-sl-gray-500">
                    {dp.ministry?.abbreviation}
                  </span>
                </div>
                <p className="truncate text-sm font-medium text-sl-gray-900">
                  {dp.title}
                </p>
                <p className="mt-0.5 flex items-center gap-1 text-xs text-sl-gray-400">
                  <Clock className="h-3 w-3" />
                  Submitted {formatDate(dp.created_at)}
                </p>
              </div>
              <button
                onClick={() => setSelectedItem(dp)}
                className="ml-4 inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-sl-gray-200 px-3 py-2 text-xs font-medium text-sl-gray-600 transition-colors hover:bg-sl-gray-50"
              >
                <Eye className="h-3.5 w-3.5" />
                Review
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
