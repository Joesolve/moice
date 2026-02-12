"use client";

import { useState } from "react";
import {
  Building2,
  Plus,
  Pencil,
  Trash2,
  ArrowLeft,
  BadgeCheck,
  XCircle,
  Clock,
  FileText,
  Eye,
  FileBarChart,
  Search,
} from "lucide-react";
import { MOCK_DATA_POINTS, MOCK_MINISTRY_REPORTS } from "@/lib/mock-data";
import { useMinistries } from "@/lib/ministries/context";
import { formatDate } from "@/lib/utils";
import type { Ministry, DataPoint, MinistryReport, DataPointStatus, ReportStatus } from "@/types";
import ShareButtons from "@/components/cards/ShareButtons";

type ContentFilter = "all" | "verified" | "pending" | "draft" | "rejected";

const filterConfig: Record<ContentFilter, { label: string; color: string }> = {
  all: { label: "All", color: "bg-sl-green-500 text-white" },
  verified: { label: "Verified", color: "bg-sl-green-100 text-sl-green-700" },
  pending: { label: "Pending", color: "bg-amber-100 text-amber-700" },
  draft: { label: "Draft", color: "bg-sl-gray-100 text-sl-gray-700" },
  rejected: { label: "Rejected", color: "bg-red-100 text-red-700" },
};

const dpStatusColors: Record<DataPointStatus, string> = {
  draft: "bg-sl-gray-100 text-sl-gray-700",
  pending_review: "bg-amber-100 text-amber-700",
  verified: "bg-sl-green-100 text-sl-green-700",
  rejected: "bg-red-100 text-red-700",
  archived: "bg-sl-gray-100 text-sl-gray-500",
};

const reportStatusColors: Record<ReportStatus, string> = {
  draft: "bg-sl-gray-100 text-sl-gray-700",
  submitted: "bg-amber-100 text-amber-700",
  published: "bg-sl-green-100 text-sl-green-700",
  rejected: "bg-red-100 text-red-700",
};

export default function MinistriesView() {
  const { ministries, addMinistry, updateMinistry, removeMinistry } = useMinistries();

  // View state
  const [selectedMinistry, setSelectedMinistry] = useState<Ministry | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Add form state
  const [newName, setNewName] = useState("");
  const [newAbbrev, setNewAbbrev] = useState("");
  const [newDesc, setNewDesc] = useState("");

  // Edit form state
  const [editName, setEditName] = useState("");
  const [editAbbrev, setEditAbbrev] = useState("");
  const [editDesc, setEditDesc] = useState("");

  // Detail view state
  const [contentTab, setContentTab] = useState<"data" | "reports">("data");
  const [contentFilter, setContentFilter] = useState<ContentFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Data points and reports (with local state for actions)
  const [dataPoints, setDataPoints] = useState(MOCK_DATA_POINTS);
  const [reports, setReports] = useState(MOCK_MINISTRY_REPORTS);

  // Selected item detail
  const [selectedReport, setSelectedReport] = useState<MinistryReport | null>(null);
  const [selectedDataPoint, setSelectedDataPoint] = useState<DataPoint | null>(null);

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    addMinistry(newName, newAbbrev, newDesc);
    setNewName("");
    setNewAbbrev("");
    setNewDesc("");
    setShowAddForm(false);
  }

  function startEdit(ministry: Ministry) {
    setEditingId(ministry.id);
    setEditName(ministry.name);
    setEditAbbrev(ministry.abbreviation);
    setEditDesc(ministry.description ?? "");
  }

  function handleEdit(e: React.FormEvent) {
    e.preventDefault();
    if (editingId) {
      updateMinistry(editingId, editName, editAbbrev, editDesc);
      setEditingId(null);
    }
  }

  function handleDelete(id: string) {
    removeMinistry(id);
    setDeleteConfirmId(null);
  }

  function handleDataPointAction(id: string, newStatus: DataPointStatus) {
    setDataPoints((prev) =>
      prev.map((dp) =>
        dp.id === id
          ? {
              ...dp,
              status: newStatus,
              verified_at: newStatus === "verified" ? new Date().toISOString() : dp.verified_at,
              reviewed_by: newStatus === "verified" || newStatus === "rejected" ? "admin1" : dp.reviewed_by,
            }
          : dp
      )
    );
    setSelectedDataPoint(null);
  }

  function handleReportAction(id: string, newStatus: ReportStatus) {
    setReports((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status: newStatus,
              published_at: newStatus === "published" ? new Date().toISOString() : r.published_at,
            }
          : r
      )
    );
    setSelectedReport(null);
  }

  // --- Ministry Detail: Data Point Detail View ---
  if (selectedMinistry && selectedDataPoint) {
    return (
      <div>
        <button
          onClick={() => setSelectedDataPoint(null)}
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-sl-gray-500 hover:text-sl-gray-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to {selectedMinistry.abbreviation}
        </button>

        <div className="rounded-xl border border-sl-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${dpStatusColors[selectedDataPoint.status]}`}>
              {selectedDataPoint.status === "pending_review" ? "Pending Review" : selectedDataPoint.status.charAt(0).toUpperCase() + selectedDataPoint.status.slice(1)}
            </span>
            {selectedDataPoint.category && (
              <span className="rounded-full bg-sl-blue-50 px-3 py-1 text-xs font-medium text-sl-blue-700">
                {selectedDataPoint.category.name}
              </span>
            )}
          </div>

          <h2 className="mb-2 text-xl font-bold text-sl-gray-900">{selectedDataPoint.title}</h2>

          <div className="mb-4 rounded-lg bg-sl-gray-50 p-4">
            <h3 className="mb-1 text-xs font-semibold uppercase tracking-wider text-sl-gray-500">Summary</h3>
            <p className="text-sm text-sl-gray-700">{selectedDataPoint.summary}</p>
          </div>

          <div className="mb-6">
            <h3 className="mb-1 text-xs font-semibold uppercase tracking-wider text-sl-gray-500">Full Content</h3>
            <p className="text-sm leading-relaxed text-sl-gray-700">{selectedDataPoint.body}</p>
          </div>

          {selectedDataPoint.tags.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-1.5">
              {selectedDataPoint.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-sl-gray-100 px-2.5 py-0.5 text-xs text-sl-gray-600">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="mb-4 border-t border-sl-gray-100 pt-4">
            <ShareButtons title={selectedDataPoint.title} summary={selectedDataPoint.summary} dataPointId={selectedDataPoint.id} />
          </div>

          <div className="flex gap-3 border-t border-sl-gray-100 pt-4">
            {selectedDataPoint.status !== "verified" && (
              <button
                onClick={() => handleDataPointAction(selectedDataPoint.id, "verified")}
                className="inline-flex items-center gap-2 rounded-lg bg-sl-green-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sl-green-600"
              >
                <BadgeCheck className="h-4 w-4" />
                Verify
              </button>
            )}
            {selectedDataPoint.status !== "rejected" && selectedDataPoint.status !== "verified" && (
              <button
                onClick={() => handleDataPointAction(selectedDataPoint.id, "rejected")}
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

  // --- Ministry Detail: Report Detail View ---
  if (selectedMinistry && selectedReport) {
    return (
      <div>
        <button
          onClick={() => setSelectedReport(null)}
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-sl-gray-500 hover:text-sl-gray-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to {selectedMinistry.abbreviation}
        </button>

        <div className="rounded-xl border border-sl-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${reportStatusColors[selectedReport.status]}`}>
              {selectedReport.status.charAt(0).toUpperCase() + selectedReport.status.slice(1)}
            </span>
            <span className="rounded-full bg-sl-blue-50 px-3 py-1 text-xs font-medium text-sl-blue-700">
              {selectedReport.report_type.charAt(0).toUpperCase() + selectedReport.report_type.slice(1)} — {selectedReport.period}
            </span>
          </div>

          <h2 className="mb-2 text-xl font-bold text-sl-gray-900">{selectedReport.title}</h2>

          <div className="mb-4 rounded-lg bg-sl-gray-50 p-4">
            <h3 className="mb-1 text-xs font-semibold uppercase tracking-wider text-sl-gray-500">Executive Summary</h3>
            <p className="text-sm text-sl-gray-700">{selectedReport.summary}</p>
          </div>

          <div className="mb-6">
            <h3 className="mb-1 text-xs font-semibold uppercase tracking-wider text-sl-gray-500">Full Report</h3>
            <p className="text-sm leading-relaxed text-sl-gray-700">{selectedReport.body}</p>
          </div>

          <div className="mb-4 border-t border-sl-gray-100 pt-4">
            <ShareButtons title={selectedReport.title} summary={selectedReport.summary} dataPointId={selectedReport.id} />
          </div>

          <div className="flex gap-3 border-t border-sl-gray-100 pt-4">
            {selectedReport.status !== "published" && (
              <button
                onClick={() => handleReportAction(selectedReport.id, "published")}
                className="inline-flex items-center gap-2 rounded-lg bg-sl-green-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sl-green-600"
              >
                <BadgeCheck className="h-4 w-4" />
                Publish Report
              </button>
            )}
            {selectedReport.status !== "rejected" && selectedReport.status !== "published" && (
              <button
                onClick={() => handleReportAction(selectedReport.id, "rejected")}
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

  // --- Ministry Detail View (list of reports + data points) ---
  if (selectedMinistry) {
    const ministryDataPoints = dataPoints.filter((dp) => dp.ministry_id === selectedMinistry.id);
    const ministryReports = reports.filter((r) => r.ministry_id === selectedMinistry.id);

    // Apply filter
    const filteredDataPoints = contentFilter === "all"
      ? ministryDataPoints
      : ministryDataPoints.filter((dp) => {
          if (contentFilter === "pending") return dp.status === "pending_review";
          return dp.status === contentFilter;
        });

    const filteredReports = contentFilter === "all"
      ? ministryReports
      : ministryReports.filter((r) => {
          if (contentFilter === "verified") return r.status === "published";
          if (contentFilter === "pending") return r.status === "submitted";
          return r.status === contentFilter;
        });

    // Apply search
    const searchedDataPoints = searchQuery
      ? filteredDataPoints.filter((dp) =>
          [dp.title, dp.summary, ...dp.tags].join(" ").toLowerCase().includes(searchQuery.toLowerCase())
        )
      : filteredDataPoints;

    const searchedReports = searchQuery
      ? filteredReports.filter((r) =>
          [r.title, r.summary, r.period].join(" ").toLowerCase().includes(searchQuery.toLowerCase())
        )
      : filteredReports;

    const totalDataPoints = ministryDataPoints.length;
    const totalReports = ministryReports.length;
    const verifiedCount = ministryDataPoints.filter((dp) => dp.status === "verified").length;
    const pendingCount = ministryDataPoints.filter((dp) => dp.status === "pending_review").length;
    const publishedReports = ministryReports.filter((r) => r.status === "published").length;
    const submittedReports = ministryReports.filter((r) => r.status === "submitted").length;

    return (
      <div>
        <button
          onClick={() => {
            setSelectedMinistry(null);
            setContentTab("data");
            setContentFilter("all");
            setSearchQuery("");
          }}
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-sl-gray-500 hover:text-sl-gray-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all ministries
        </button>

        {/* Ministry header */}
        <div className="mb-6 rounded-xl border border-sl-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-sl-blue-50 p-3">
              <Building2 className="h-6 w-6 text-sl-blue-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-sl-gray-900">{selectedMinistry.abbreviation}</h1>
              <p className="text-sm text-sl-gray-500">{selectedMinistry.name}</p>
            </div>
          </div>
          {selectedMinistry.description && (
            <p className="mt-3 text-sm text-sl-gray-600">{selectedMinistry.description}</p>
          )}

          {/* Stats row */}
          <div className="mt-4 flex flex-wrap gap-4 border-t border-sl-gray-100 pt-4 text-sm">
            <span className="text-sl-gray-500">
              <span className="font-semibold text-sl-green-600">{verifiedCount}</span> verified
            </span>
            <span className="text-sl-gray-500">
              <span className="font-semibold text-amber-600">{pendingCount}</span> pending data
            </span>
            <span className="text-sl-gray-500">
              <span className="font-semibold text-sl-blue-600">{totalDataPoints}</span> total data points
            </span>
            <span className="text-sl-gray-500">
              <span className="font-semibold text-sl-green-600">{publishedReports}</span> published reports
            </span>
            <span className="text-sl-gray-500">
              <span className="font-semibold text-amber-600">{submittedReports}</span> pending reports
            </span>
          </div>
        </div>

        {/* Content tabs: Data Points | Reports */}
        <div className="mb-4 flex gap-2">
          <button
            onClick={() => { setContentTab("data"); setContentFilter("all"); setSearchQuery(""); }}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              contentTab === "data"
                ? "bg-sl-green-500 text-white"
                : "border border-sl-gray-200 bg-white text-sl-gray-600 hover:bg-sl-gray-50"
            }`}
          >
            <FileText className="h-4 w-4" />
            Data Points ({totalDataPoints})
          </button>
          <button
            onClick={() => { setContentTab("reports"); setContentFilter("all"); setSearchQuery(""); }}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              contentTab === "reports"
                ? "bg-sl-green-500 text-white"
                : "border border-sl-gray-200 bg-white text-sl-gray-600 hover:bg-sl-gray-50"
            }`}
          >
            <FileBarChart className="h-4 w-4" />
            Reports ({totalReports})
          </button>
        </div>

        {/* Search + Filter bar */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sl-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={contentTab === "data" ? "Search data points..." : "Search reports..."}
              className="h-10 w-full rounded-lg border border-sl-gray-200 pl-9 pr-3 text-sm focus:border-sl-green-500 focus:outline-none focus:ring-2 focus:ring-sl-green-500/20"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {(Object.keys(filterConfig) as ContentFilter[]).map((f) => (
              <button
                key={f}
                onClick={() => setContentFilter(f)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                  contentFilter === f
                    ? "bg-sl-green-500 text-white"
                    : "border border-sl-gray-200 bg-white text-sl-gray-600 hover:bg-sl-gray-50"
                }`}
              >
                {filterConfig[f].label}
              </button>
            ))}
          </div>
        </div>

        {/* Data Points list */}
        {contentTab === "data" && (
          <>
            {searchedDataPoints.length === 0 ? (
              <div className="rounded-xl border border-sl-gray-200 bg-white p-10 text-center">
                <FileText className="mx-auto mb-3 h-12 w-12 text-sl-gray-300" />
                <p className="font-semibold text-sl-gray-700">No data points found</p>
                <p className="text-sm text-sl-gray-500">
                  {contentFilter !== "all" || searchQuery
                    ? "Try adjusting your filter or search query."
                    : `No data points from ${selectedMinistry.abbreviation} yet.`}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {searchedDataPoints.map((dp) => (
                  <div
                    key={dp.id}
                    className="flex items-center justify-between rounded-xl border border-sl-gray-200 bg-white p-4 shadow-sm transition-colors hover:border-sl-gray-300"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${dpStatusColors[dp.status]}`}>
                          {dp.status === "pending_review" ? "Pending Review" : dp.status.charAt(0).toUpperCase() + dp.status.slice(1)}
                        </span>
                        {dp.category && (
                          <span className="text-xs text-sl-gray-500">{dp.category.name}</span>
                        )}
                      </div>
                      <p className="truncate text-sm font-medium text-sl-gray-900">{dp.title}</p>
                      <p className="mt-0.5 text-xs text-sl-gray-400">
                        <Clock className="mr-1 inline h-3 w-3" />
                        {formatDate(dp.created_at)}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedDataPoint(dp)}
                      className="ml-4 inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-sl-gray-200 px-3 py-2 text-xs font-medium text-sl-gray-600 transition-colors hover:bg-sl-gray-50"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      View
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Reports list */}
        {contentTab === "reports" && (
          <>
            {searchedReports.length === 0 ? (
              <div className="rounded-xl border border-sl-gray-200 bg-white p-10 text-center">
                <FileBarChart className="mx-auto mb-3 h-12 w-12 text-sl-gray-300" />
                <p className="font-semibold text-sl-gray-700">No reports found</p>
                <p className="text-sm text-sl-gray-500">
                  {contentFilter !== "all" || searchQuery
                    ? "Try adjusting your filter or search query."
                    : `No reports from ${selectedMinistry.abbreviation} yet.`}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {searchedReports.map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center justify-between rounded-xl border border-sl-gray-200 bg-white p-4 shadow-sm transition-colors hover:border-sl-gray-300"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${reportStatusColors[report.status]}`}>
                          {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                        </span>
                        <span className="rounded-full bg-sl-blue-50 px-2.5 py-0.5 text-[11px] font-medium text-sl-blue-700">
                          {report.report_type.charAt(0).toUpperCase() + report.report_type.slice(1)} — {report.period}
                        </span>
                      </div>
                      <p className="truncate text-sm font-medium text-sl-gray-900">{report.title}</p>
                      <p className="mt-0.5 text-xs text-sl-gray-400">
                        <Clock className="mr-1 inline h-3 w-3" />
                        {formatDate(report.created_at)}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedReport(report)}
                      className="ml-4 inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-sl-gray-200 px-3 py-2 text-xs font-medium text-sl-gray-600 transition-colors hover:bg-sl-gray-50"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      Review
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    );
  }

  // --- Main Ministries List View (CRUD) ---
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-sl-gray-900">Ministries</h1>
          <p className="text-sm text-sl-gray-500">
            Manage government ministries contributing to the Knowledge Hub
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center gap-2 rounded-lg bg-sl-green-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sl-green-600"
        >
          <Plus className="h-4 w-4" />
          Add Ministry
        </button>
      </div>

      {/* Add Ministry Form */}
      {showAddForm && (
        <form
          onSubmit={handleAdd}
          className="mb-6 rounded-xl border border-sl-green-200 bg-sl-green-50 p-5"
        >
          <h3 className="mb-4 font-semibold text-sl-gray-900">Add New Ministry</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-sl-gray-700">Full Name *</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
                placeholder="e.g., Ministry of Tourism and Cultural Affairs"
                className="h-10 w-full rounded-lg border border-sl-gray-300 bg-white px-3 text-sm focus:border-sl-green-500 focus:outline-none focus:ring-2 focus:ring-sl-green-500/20"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-sl-gray-700">Abbreviation *</label>
              <input
                type="text"
                value={newAbbrev}
                onChange={(e) => setNewAbbrev(e.target.value)}
                required
                placeholder="e.g., MoTCA"
                className="h-10 w-full rounded-lg border border-sl-gray-300 bg-white px-3 text-sm focus:border-sl-green-500 focus:outline-none focus:ring-2 focus:ring-sl-green-500/20"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="mb-1 block text-xs font-medium text-sl-gray-700">Description</label>
            <input
              type="text"
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="Brief description of the ministry's mandate"
              className="h-10 w-full rounded-lg border border-sl-gray-300 bg-white px-3 text-sm focus:border-sl-green-500 focus:outline-none focus:ring-2 focus:ring-sl-green-500/20"
            />
          </div>
          <div className="mt-4 flex gap-2">
            <button
              type="submit"
              className="rounded-lg bg-sl-green-500 px-5 py-2 text-sm font-semibold text-white hover:bg-sl-green-600"
            >
              Add Ministry
            </button>
            <button
              type="button"
              onClick={() => { setShowAddForm(false); setNewName(""); setNewAbbrev(""); setNewDesc(""); }}
              className="rounded-lg border border-sl-gray-200 px-5 py-2 text-sm font-medium text-sl-gray-600 hover:bg-white"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Ministry cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {ministries.map((ministry) => {
          const dpCount = dataPoints.filter((dp) => dp.ministry_id === ministry.id);
          const verified = dpCount.filter((dp) => dp.status === "verified").length;
          const pending = dpCount.filter((dp) => dp.status === "pending_review").length;
          const reportCount = reports.filter((r) => r.ministry_id === ministry.id).length;

          if (editingId === ministry.id) {
            return (
              <form
                key={ministry.id}
                onSubmit={handleEdit}
                className="rounded-xl border border-sl-blue-200 bg-sl-blue-50 p-5"
              >
                <div className="mb-3">
                  <label className="mb-1 block text-xs font-medium text-sl-gray-700">Full Name *</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    required
                    className="h-10 w-full rounded-lg border border-sl-gray-300 bg-white px-3 text-sm focus:border-sl-green-500 focus:outline-none focus:ring-2 focus:ring-sl-green-500/20"
                  />
                </div>
                <div className="mb-3">
                  <label className="mb-1 block text-xs font-medium text-sl-gray-700">Abbreviation *</label>
                  <input
                    type="text"
                    value={editAbbrev}
                    onChange={(e) => setEditAbbrev(e.target.value)}
                    required
                    className="h-10 w-full rounded-lg border border-sl-gray-300 bg-white px-3 text-sm focus:border-sl-green-500 focus:outline-none focus:ring-2 focus:ring-sl-green-500/20"
                  />
                </div>
                <div className="mb-3">
                  <label className="mb-1 block text-xs font-medium text-sl-gray-700">Description</label>
                  <input
                    type="text"
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                    className="h-10 w-full rounded-lg border border-sl-gray-300 bg-white px-3 text-sm focus:border-sl-green-500 focus:outline-none focus:ring-2 focus:ring-sl-green-500/20"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="rounded-lg bg-sl-green-500 px-4 py-2 text-xs font-semibold text-white hover:bg-sl-green-600"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingId(null)}
                    className="rounded-lg border border-sl-gray-200 px-4 py-2 text-xs font-medium text-sl-gray-600 hover:bg-white"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            );
          }

          return (
            <div
              key={ministry.id}
              className="rounded-xl border border-sl-gray-200 bg-white p-5 shadow-sm transition-colors hover:border-sl-gray-300"
            >
              <div className="mb-3 flex items-start justify-between">
                <button
                  onClick={() => {
                    setSelectedMinistry(ministry);
                    setContentTab("data");
                    setContentFilter("all");
                    setSearchQuery("");
                  }}
                  className="flex items-center gap-3 text-left"
                >
                  <div className="rounded-lg bg-sl-blue-50 p-2.5">
                    <Building2 className="h-5 w-5 text-sl-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sl-gray-900 hover:text-sl-green-600">
                      {ministry.abbreviation}
                    </h3>
                    <p className="text-xs text-sl-gray-500">{ministry.name}</p>
                  </div>
                </button>

                <div className="flex gap-1">
                  <button
                    onClick={() => startEdit(ministry)}
                    className="rounded-lg p-1.5 text-sl-gray-400 transition-colors hover:bg-sl-gray-100 hover:text-sl-gray-700"
                    title="Edit ministry"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  {deleteConfirmId === ministry.id ? (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleDelete(ministry.id)}
                        className="rounded-lg bg-red-500 px-2 py-1 text-[10px] font-semibold text-white hover:bg-red-600"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(null)}
                        className="rounded-lg border border-sl-gray-200 px-2 py-1 text-[10px] font-medium text-sl-gray-600 hover:bg-sl-gray-50"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirmId(ministry.id)}
                      className="rounded-lg p-1.5 text-sl-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                      title="Delete ministry"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {ministry.description && (
                <p className="mb-3 text-sm text-sl-gray-600">{ministry.description}</p>
              )}

              <div className="flex gap-4 border-t border-sl-gray-100 pt-3 text-xs">
                <span className="text-sl-gray-500">
                  <span className="font-semibold text-sl-green-600">{verified}</span> verified
                </span>
                <span className="text-sl-gray-500">
                  <span className="font-semibold text-amber-600">{pending}</span> pending
                </span>
                <span className="text-sl-gray-500">
                  <span className="font-semibold text-sl-blue-600">{reportCount}</span> reports
                </span>
              </div>

              <button
                onClick={() => {
                  setSelectedMinistry(ministry);
                  setContentTab("data");
                  setContentFilter("all");
                  setSearchQuery("");
                }}
                className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-sl-gray-200 py-2 text-xs font-medium text-sl-gray-600 transition-colors hover:bg-sl-gray-50"
              >
                <Eye className="h-3.5 w-3.5" />
                View All Content
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
