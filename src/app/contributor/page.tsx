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
  FileBarChart,
  Upload,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MOCK_DATA_POINTS, MINISTRIES, MOCK_MINISTRY_REPORTS } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import { useAuth } from "@/lib/auth/context";
import { useCategories } from "@/lib/categories/context";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import type { DataPointStatus, ReportStatus } from "@/types";

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

const reportStatusConfig: Record<
  ReportStatus,
  { icon: typeof Clock; color: string; bg: string; label: string }
> = {
  draft: {
    icon: FileText,
    color: "text-sl-gray-600",
    bg: "bg-sl-gray-100",
    label: "Draft",
  },
  submitted: {
    icon: Clock,
    color: "text-amber-600",
    bg: "bg-amber-100",
    label: "Submitted",
  },
  published: {
    icon: BadgeCheck,
    color: "text-sl-green-600",
    bg: "bg-sl-green-100",
    label: "Published",
  },
  rejected: {
    icon: XCircle,
    color: "text-red-600",
    bg: "bg-red-100",
    label: "Rejected",
  },
};

export default function ContributorPage() {
  return (
    <ProtectedRoute requiredRole={["contributor", "admin"]}>
      <ContributorContent />
    </ProtectedRoute>
  );
}

function ContributorContent() {
  const { user, logout } = useAuth();
  const { categories } = useCategories();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<"facts" | "reports">("facts");
  const [view, setView] = useState<"list" | "new" | "success">("list");
  const [selectedMinistry, setSelectedMinistry] = useState("m1");

  // Fact sheet form
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [body, setBody] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [tags, setTags] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");

  // Report form
  const [reportTitle, setReportTitle] = useState("");
  const [reportSummary, setReportSummary] = useState("");
  const [reportBody, setReportBody] = useState("");
  const [reportType, setReportType] = useState<"quarterly" | "annual" | "special" | "update">("quarterly");
  const [reportPeriod, setReportPeriod] = useState("");

  const currentMinistry = MINISTRIES.find((m) => m.id === selectedMinistry);

  // Filter items by selected ministry
  const myItems = MOCK_DATA_POINTS.filter((dp) => dp.ministry_id === selectedMinistry);
  const myReports = MOCK_MINISTRY_REPORTS.filter((r) => r.ministry_id === selectedMinistry);

  function handleFactSubmit(e: React.FormEvent) {
    e.preventDefault();
    setView("success");
  }

  function handleReportSubmit(e: React.FormEvent) {
    e.preventDefault();
    setView("success");
  }

  function resetForm() {
    setTitle("");
    setSummary("");
    setBody("");
    setCategoryId("");
    setTags("");
    setSourceUrl("");
    setReportTitle("");
    setReportSummary("");
    setReportBody("");
    setReportType("quarterly");
    setReportPeriod("");
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
                {currentMinistry?.name ?? "Select Ministry"}
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
            <button
              onClick={() => { logout(); router.push("/login"); }}
              className="inline-flex items-center gap-1 rounded-lg border border-sl-gray-200 px-3 py-1.5 text-xs font-medium text-sl-gray-600 hover:bg-sl-gray-50"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        {/* Ministry selector */}
        <div className="mb-6 rounded-xl border border-sl-gray-200 bg-white p-4 shadow-sm">
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-sl-gray-500">
            Your Ministry
          </label>
          <select
            value={selectedMinistry}
            onChange={(e) => setSelectedMinistry(e.target.value)}
            className="h-11 w-full rounded-lg border border-sl-gray-300 px-3 text-sm font-medium text-sl-gray-900 focus:border-sl-green-500 focus:outline-none focus:ring-2 focus:ring-sl-green-500/20"
          >
            {MINISTRIES.map((m) => (
              <option key={m.id} value={m.id}>
                {m.abbreviation} — {m.name}
              </option>
            ))}
          </select>
        </div>

        {/* Section tabs */}
        <div className="mb-6 flex gap-2">
          <button
            onClick={() => { setActiveSection("facts"); setView("list"); }}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
              activeSection === "facts"
                ? "bg-sl-green-500 text-white"
                : "border border-sl-gray-200 bg-white text-sl-gray-600 hover:bg-sl-gray-50"
            }`}
          >
            <FileText className="h-4 w-4" />
            Fact Sheets
          </button>
          <button
            onClick={() => { setActiveSection("reports"); setView("list"); }}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
              activeSection === "reports"
                ? "bg-sl-green-500 text-white"
                : "border border-sl-gray-200 bg-white text-sl-gray-600 hover:bg-sl-gray-50"
            }`}
          >
            <FileBarChart className="h-4 w-4" />
            Ministry Reports
          </button>
        </div>

        {/* Success state */}
        {view === "success" && (
          <div className="mb-8 rounded-xl border border-sl-green-200 bg-sl-green-50 p-6 text-center">
            <CheckCircle className="mx-auto mb-3 h-12 w-12 text-sl-green-500" />
            <h2 className="text-lg font-bold text-sl-green-800">
              {activeSection === "facts" ? "Fact Sheet Submitted" : "Report Submitted"}
            </h2>
            <p className="mt-1 text-sm text-sl-green-600">
              Your {activeSection === "facts" ? "fact sheet" : "ministry report"} has been submitted for MOICE review. You will be
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

        {/* FACT SHEETS SECTION */}
        {activeSection === "facts" && view === "list" && (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-sl-gray-900">
                  Fact Sheets
                </h1>
                <p className="text-sm text-sl-gray-500">
                  Submit and manage verified data points for {currentMinistry?.abbreviation}
                </p>
              </div>
              <button
                onClick={() => setView("new")}
                className="inline-flex items-center gap-2 rounded-lg bg-sl-green-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sl-green-600"
              >
                <Plus className="h-4 w-4" />
                New Fact Sheet
              </button>
            </div>

            {myItems.length === 0 ? (
              <div className="rounded-xl border border-sl-gray-200 bg-white p-10 text-center">
                <FileText className="mx-auto mb-3 h-12 w-12 text-sl-gray-300" />
                <p className="font-semibold text-sl-gray-700">No submissions yet</p>
                <p className="text-sm text-sl-gray-500">
                  Submit your first fact sheet for {currentMinistry?.abbreviation} verification.
                </p>
              </div>
            ) : (
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
            )}
          </div>
        )}

        {activeSection === "facts" && view === "new" && (
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
                Submit data from <span className="font-semibold">{currentMinistry?.name}</span> for MOICE verification.
              </p>

              <form onSubmit={handleFactSubmit} className="space-y-5">
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
                    {categories.map((cat) => (
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

        {/* MINISTRY REPORTS SECTION */}
        {activeSection === "reports" && view === "list" && (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-sl-gray-900">
                  Ministry Reports
                </h1>
                <p className="text-sm text-sl-gray-500">
                  Submit quarterly, annual, and special reports for {currentMinistry?.abbreviation}
                </p>
              </div>
              <button
                onClick={() => setView("new")}
                className="inline-flex items-center gap-2 rounded-lg bg-sl-green-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sl-green-600"
              >
                <Upload className="h-4 w-4" />
                New Report
              </button>
            </div>

            {myReports.length === 0 ? (
              <div className="rounded-xl border border-sl-gray-200 bg-white p-10 text-center">
                <FileBarChart className="mx-auto mb-3 h-12 w-12 text-sl-gray-300" />
                <p className="font-semibold text-sl-gray-700">No reports yet</p>
                <p className="text-sm text-sl-gray-500">
                  Submit your first ministry report for {currentMinistry?.abbreviation}.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {myReports.map((report) => {
                  const config = reportStatusConfig[report.status];
                  const Icon = config.icon;

                  return (
                    <div
                      key={report.id}
                      className="rounded-xl border border-sl-gray-200 bg-white p-4 shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="mb-1 flex flex-wrap items-center gap-2">
                            <span
                              className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${config.bg} ${config.color}`}
                            >
                              <Icon className="h-3.5 w-3.5" />
                              {config.label}
                            </span>
                            <span className="rounded-full bg-sl-blue-50 px-2.5 py-1 text-xs font-medium text-sl-blue-700">
                              {report.report_type.charAt(0).toUpperCase() + report.report_type.slice(1)} — {report.period}
                            </span>
                          </div>
                          <p className="text-sm font-medium text-sl-gray-900">
                            {report.title}
                          </p>
                          <p className="mt-1 text-xs text-sl-gray-500 line-clamp-2">
                            {report.summary}
                          </p>
                          <p className="mt-1 text-xs text-sl-gray-400">
                            Submitted {formatDate(report.created_at)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeSection === "reports" && view === "new" && (
          <div>
            <button
              onClick={() => setView("list")}
              className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-sl-gray-500 hover:text-sl-gray-700"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to reports
            </button>

            <div className="rounded-xl border border-sl-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-1 text-xl font-bold text-sl-gray-900">
                Submit Ministry Report
              </h2>
              <p className="mb-6 text-sm text-sl-gray-500">
                Submit an official report from <span className="font-semibold">{currentMinistry?.name}</span> for publication.
              </p>

              <form onSubmit={handleReportSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-sl-gray-700">
                      Report Type *
                    </label>
                    <select
                      value={reportType}
                      onChange={(e) => setReportType(e.target.value as typeof reportType)}
                      required
                      className="h-11 w-full rounded-lg border border-sl-gray-300 px-3 text-sm focus:border-sl-green-500 focus:outline-none focus:ring-2 focus:ring-sl-green-500/20"
                    >
                      <option value="quarterly">Quarterly Report</option>
                      <option value="annual">Annual Report</option>
                      <option value="special">Special Report</option>
                      <option value="update">Progress Update</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-sl-gray-700">
                      Reporting Period *
                    </label>
                    <input
                      type="text"
                      value={reportPeriod}
                      onChange={(e) => setReportPeriod(e.target.value)}
                      required
                      className="h-11 w-full rounded-lg border border-sl-gray-300 px-3 text-sm focus:border-sl-green-500 focus:outline-none focus:ring-2 focus:ring-sl-green-500/20"
                      placeholder="e.g., Q4 2025 or FY2025"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-sl-gray-700">
                    Report Title *
                  </label>
                  <input
                    type="text"
                    value={reportTitle}
                    onChange={(e) => setReportTitle(e.target.value)}
                    required
                    className="h-11 w-full rounded-lg border border-sl-gray-300 px-3 text-sm focus:border-sl-green-500 focus:outline-none focus:ring-2 focus:ring-sl-green-500/20"
                    placeholder="e.g., Q4 2025 Health Sector Performance Report"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-sl-gray-700">
                    Executive Summary *
                  </label>
                  <textarea
                    value={reportSummary}
                    onChange={(e) => setReportSummary(e.target.value)}
                    required
                    rows={3}
                    className="w-full rounded-lg border border-sl-gray-300 px-3 py-2.5 text-sm focus:border-sl-green-500 focus:outline-none focus:ring-2 focus:ring-sl-green-500/20"
                    placeholder="A brief executive summary of the report findings"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-sl-gray-700">
                    Full Report Content *
                  </label>
                  <textarea
                    value={reportBody}
                    onChange={(e) => setReportBody(e.target.value)}
                    required
                    rows={12}
                    className="w-full rounded-lg border border-sl-gray-300 px-3 py-2.5 text-sm focus:border-sl-green-500 focus:outline-none focus:ring-2 focus:ring-sl-green-500/20"
                    placeholder="Full report content including key achievements, challenges, statistics, and recommendations"
                  />
                </div>

                <div className="flex gap-3 border-t border-sl-gray-100 pt-5">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-lg bg-sl-green-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-sl-green-600"
                  >
                    <Send className="h-4 w-4" />
                    Submit Report
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
