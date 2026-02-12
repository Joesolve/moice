"use client";

import { useState } from "react";
import {
  BadgeCheck,
  XCircle,
  Eye,
  Clock,
  Building2,
  ArrowLeft,
  Megaphone,
} from "lucide-react";
import { useAnnouncements } from "@/lib/announcements/context";
import { formatDate } from "@/lib/utils";
import type { Announcement, AnnouncementStatus } from "@/types";
import ShareButtons from "@/components/cards/ShareButtons";

const statusColors: Record<string, string> = {
  draft: "bg-sl-gray-100 text-sl-gray-700",
  submitted: "bg-amber-100 text-amber-700",
  published: "bg-sl-green-100 text-sl-green-700",
  rejected: "bg-red-100 text-red-700",
};

export default function ReportsView() {
  const { announcements, updateAnnouncementStatus } = useAnnouncements();
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [filter, setFilter] = useState<"all" | AnnouncementStatus>("all");

  const filteredAnnouncements =
    filter === "all"
      ? announcements
      : announcements.filter((a) => a.status === filter);

  function handleStatusChange(id: string, newStatus: AnnouncementStatus) {
    updateAnnouncementStatus(id, newStatus);
    setSelectedAnnouncement(null);
  }

  if (selectedAnnouncement) {
    const current = announcements.find((a) => a.id === selectedAnnouncement.id) ?? selectedAnnouncement;

    return (
      <div>
        <button
          onClick={() => setSelectedAnnouncement(null)}
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-sl-gray-500 hover:text-sl-gray-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to announcements
        </button>

        <div className="rounded-xl border border-sl-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColors[current.status]}`}
            >
              {current.status}
            </span>
            <span className="text-sm text-sl-gray-500">
              <Building2 className="mr-1 inline h-3.5 w-3.5" />
              {current.ministry?.name}
            </span>
          </div>

          <h2 className="mb-2 text-xl font-bold text-sl-gray-900">
            {current.title}
          </h2>

          <div className="mb-4 rounded-lg bg-sl-gray-50 p-4">
            <h3 className="mb-1 text-xs font-semibold uppercase tracking-wider text-sl-gray-500">
              Summary
            </h3>
            <p className="text-sm text-sl-gray-700">{current.summary}</p>
          </div>

          <div className="mb-6">
            <h3 className="mb-1 text-xs font-semibold uppercase tracking-wider text-sl-gray-500">
              Full Announcement
            </h3>
            <p className="text-sm leading-relaxed text-sl-gray-700">
              {current.body}
            </p>
          </div>

          <div className="mb-4 border-t border-sl-gray-100 pt-4">
            <ShareButtons
              title={current.title}
              summary={current.summary}
              dataPointId={current.id}
            />
          </div>

          <div className="flex gap-3 border-t border-sl-gray-100 pt-4">
            {current.status !== "published" && (
              <button
                onClick={() => handleStatusChange(current.id, "published")}
                className="inline-flex items-center gap-2 rounded-lg bg-sl-green-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sl-green-600"
              >
                <BadgeCheck className="h-4 w-4" />
                Publish
              </button>
            )}
            {current.status !== "rejected" && current.status !== "published" && (
              <button
                onClick={() => handleStatusChange(current.id, "rejected")}
                className="inline-flex items-center gap-2 rounded-lg border border-red-300 bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-700 transition-colors hover:bg-red-100"
              >
                <XCircle className="h-4 w-4" />
                Reject
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-sl-gray-900">Announcements</h1>
        <p className="text-sm text-sl-gray-500">
          Review and manage announcements submitted by government ministries
        </p>
      </div>

      {/* Filter tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {(["all", "submitted", "published", "draft", "rejected"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              filter === f
                ? "bg-sl-green-500 text-white"
                : "border border-sl-gray-200 bg-white text-sl-gray-600 hover:bg-sl-gray-50"
            }`}
          >
            {f === "all" ? "All Announcements" : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {filteredAnnouncements.length === 0 ? (
        <div className="rounded-xl border border-sl-gray-200 bg-white p-10 text-center">
          <Megaphone className="mx-auto mb-3 h-12 w-12 text-sl-gray-300" />
          <p className="font-semibold text-sl-gray-700">No announcements found</p>
          <p className="text-sm text-sl-gray-500">
            No announcements match the selected filter.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredAnnouncements.map((ann) => (
            <div
              key={ann.id}
              className="flex items-center justify-between rounded-xl border border-sl-gray-200 bg-white p-4 shadow-sm transition-colors hover:border-sl-gray-300"
            >
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${statusColors[ann.status]}`}
                  >
                    {ann.status}
                  </span>
                  <span className="text-xs text-sl-gray-500">
                    {ann.ministry?.abbreviation}
                  </span>
                </div>
                <p className="truncate text-sm font-medium text-sl-gray-900">
                  {ann.title}
                </p>
                <p className="mt-0.5 flex items-center gap-1 text-xs text-sl-gray-400">
                  <Clock className="h-3 w-3" />
                  Submitted {formatDate(ann.created_at)}
                </p>
              </div>
              <button
                onClick={() => setSelectedAnnouncement(ann)}
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
