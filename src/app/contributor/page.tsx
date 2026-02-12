"use client";

import { useState } from "react";
import {
  Shield,
  FileText,
  Send,
  CheckCircle,
  ChevronLeft,
  Plus,
  Clock,
  BadgeCheck,
  XCircle,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { CATEGORIES, MOCK_DATA_POINTS } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import type { DataPointStatus } from "@/types";

const statusConfig: Record<
  DataPointStatus,
  { icon: typeof Clock; color: string; bg: string; label: string }
> = {
  draft: {
    icon: FileText,
    color: "text-sl-gray-600",
    bg: "bg-sl-gray-100",
    label: "Draft",
  },
  pending_review: {
    icon: Clock,
    color: "text-amber-600",
    bg: "bg-amber-100",
    label: "Pending Review",
  },
  verified: {
    icon: BadgeCheck,
    color: "text-sl-green-600",
    bg: "bg-sl-green-100",
    label: "Verified",
  },
  rejected: {
    icon: XCircle,
    color: "text-red-600",
    bg: "bg-red-100",
    label: "Rejected",
  },
  archived: {
    icon: FileText,
    color: "text-sl-gray-500",
    bg: "bg-sl-gray-100",
    label: "Archived",
  },
};

export default function ContributorPage() {
  const [view, setView] = useState<"list" | "new" | "success">("list");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [body, setBody] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [tags, setTags] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");

  // Mock: items submitted by this contributor
  const myItems = MOCK_DATA_POINTS.filter((dp) => dp.ministry_id === "m1");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Mock submission — in production this writes to Supabase
    setView("success");
  }

  function resetForm() {
    setTitle("");
    setSummary("");
    setBody("");
    setCategoryId("");
    setTags("");
    setSourceUrl("");
    setView("list");
  }

  return (
    <div className="min-h-screen bg-sl-gray-50">
      {/* Header */}
      <header className="border-b border-sl-gray-200 bg-white">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-sl-green-600" />
            <div className="leading-tight">
              <span className="block text-sm font-bold text-sl-gray-900">
                Contributor Portal
              </span>
              <span className="block text-[11px] text-sl-gray-500">
                Ministry of Health and Sanitation
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="hidden items-center gap-1 text-xs text-sl-gray-500 hover:text-sl-gray-700 sm:inline-flex"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              Public Site
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-1 rounded-lg border border-sl-gray-200 px-3 py-1.5 text-xs font-medium text-sl-gray-600 hover:bg-sl-gray-50"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign Out
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        {view === "success" && (
          <div className="mb-8 rounded-xl border border-sl-green-200 bg-sl-green-50 p-6 text-center">
            <CheckCircle className="mx-auto mb-3 h-12 w-12 text-sl-green-500" />
            <h2 className="text-lg font-bold text-sl-green-800">
              Submission Received
            </h2>
            <p className="mt-1 text-sm text-sl-green-600">
              Your fact sheet has been submitted for MOICE review. You will be
              notified once it is verified and published.
            </p>
            <button
              onClick={resetForm}
              className="mt-4 rounded-lg bg-sl-green-500 px-5 py-2 text-sm font-semibold text-white hover:bg-sl-green-600"
            >
              Back to Dashboard
            </button>
          </div>
        )}

        {view === "list" && (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-sl-gray-900">
                  My Submissions
                </h1>
                <p className="text-sm text-sl-gray-500">
                  Manage and submit fact sheets for verification
                </p>
              </div>
              <button
                onClick={() => setView("new")}
                className="inline-flex items-center gap-2 rounded-lg bg-sl-green-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sl-green-600"
              >
                <Plus className="h-4 w-4" />
                New Submission
              </button>
            </div>

            <div className="space-y-3">
              {myItems.map((dp) => {
                const config = statusConfig[dp.status];
                const Icon = config.icon;

                return (
                  <div
                    key={dp.id}
                    className="flex items-center justify-between rounded-xl border border-sl-gray-200 bg-white p-4 shadow-sm"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-sl-gray-900">
                        {dp.title}
                      </p>
                      <p className="mt-0.5 text-xs text-sl-gray-400">
                        Submitted {formatDate(dp.created_at)}
                      </p>
                    </div>
                    <span
                      className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${config.bg} ${config.color}`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {config.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {view === "new" && (
          <div>
            <button
              onClick={() => setView("list")}
              className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-sl-gray-500 hover:text-sl-gray-700"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to submissions
            </button>

            <div className="rounded-xl border border-sl-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-1 text-xl font-bold text-sl-gray-900">
                Submit New Fact Sheet
              </h2>
              <p className="mb-6 text-sm text-sl-gray-500">
                Complete the form below to submit data for MOICE verification.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-sl-gray-700">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="h-11 w-full rounded-lg border border-sl-gray-300 px-3 text-sm focus:border-sl-green-500 focus:outline-none focus:ring-2 focus:ring-sl-green-500/20"
                    placeholder="e.g., Q4 2025 Malaria Incidence Report"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-sl-gray-700">
                    Category
                  </label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="h-11 w-full rounded-lg border border-sl-gray-300 px-3 text-sm focus:border-sl-green-500 focus:outline-none focus:ring-2 focus:ring-sl-green-500/20"
                  >
                    <option value="">Select a category</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-sl-gray-700">
                    Summary *
                  </label>
                  <textarea
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    required
                    rows={3}
                    className="w-full rounded-lg border border-sl-gray-300 px-3 py-2.5 text-sm focus:border-sl-green-500 focus:outline-none focus:ring-2 focus:ring-sl-green-500/20"
                    placeholder="A brief summary of the data point (shown on result cards)"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-sl-gray-700">
                    Full Content *
                  </label>
                  <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    required
                    rows={8}
                    className="w-full rounded-lg border border-sl-gray-300 px-3 py-2.5 text-sm focus:border-sl-green-500 focus:outline-none focus:ring-2 focus:ring-sl-green-500/20"
                    placeholder="Detailed content including statistics, findings, and sources"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-sl-gray-700">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="h-11 w-full rounded-lg border border-sl-gray-300 px-3 text-sm focus:border-sl-green-500 focus:outline-none focus:ring-2 focus:ring-sl-green-500/20"
                    placeholder="e.g., health, malaria, statistics"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-sl-gray-700">
                    Source URL (optional)
                  </label>
                  <input
                    type="url"
                    value={sourceUrl}
                    onChange={(e) => setSourceUrl(e.target.value)}
                    className="h-11 w-full rounded-lg border border-sl-gray-300 px-3 text-sm focus:border-sl-green-500 focus:outline-none focus:ring-2 focus:ring-sl-green-500/20"
                    placeholder="https://..."
                  />
                </div>

                <div className="flex gap-3 border-t border-sl-gray-100 pt-5">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-lg bg-sl-green-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-sl-green-600"
                  >
                    <Send className="h-4 w-4" />
                    Submit for Review
                  </button>
                  <button
                    type="button"
                    onClick={() => setView("list")}
                    className="rounded-lg border border-sl-gray-200 px-6 py-2.5 text-sm font-medium text-sl-gray-600 hover:bg-sl-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
