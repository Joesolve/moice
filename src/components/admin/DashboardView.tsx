"use client";

import {
  BadgeCheck,
  Clock,
  FileText,
  AlertTriangle,
  TrendingUp,
  Building2,
} from "lucide-react";
import { MOCK_DATA_POINTS, MINISTRIES } from "@/lib/mock-data";

export default function DashboardView() {
  const verified = MOCK_DATA_POINTS.filter((d) => d.status === "verified");
  const pending = MOCK_DATA_POINTS.filter((d) => d.status === "pending_review");
  const drafts = MOCK_DATA_POINTS.filter((d) => d.status === "draft");

  const statCards = [
    {
      label: "Verified",
      value: verified.length,
      icon: BadgeCheck,
      color: "text-sl-green-600",
      bg: "bg-sl-green-50",
    },
    {
      label: "Pending Review",
      value: pending.length,
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "Drafts",
      value: drafts.length,
      icon: FileText,
      color: "text-sl-blue-600",
      bg: "bg-sl-blue-50",
    },
    {
      label: "Ministries Active",
      value: MINISTRIES.length,
      icon: Building2,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-sl-gray-900">Dashboard</h1>
        <p className="text-sm text-sl-gray-500">
          Overview of the National Knowledge Hub data
        </p>
      </div>

      {/* Stat cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-sl-gray-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-sl-gray-500">{stat.label}</p>
                <p className="mt-1 text-3xl font-bold text-sl-gray-900">
                  {stat.value}
                </p>
              </div>
              <div className={`rounded-lg ${stat.bg} p-3`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pending items requiring attention */}
      {pending.length > 0 && (
        <div className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-5">
          <div className="mb-3 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            <h2 className="font-semibold text-amber-800">
              Items Awaiting Review
            </h2>
          </div>
          <div className="space-y-2">
            {pending.map((dp) => (
              <div
                key={dp.id}
                className="flex items-center justify-between rounded-lg bg-white px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-sl-gray-900">
                    {dp.title}
                  </p>
                  <p className="text-xs text-sl-gray-500">
                    From {dp.ministry?.abbreviation}
                  </p>
                </div>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                  Pending
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent activity */}
      <div className="rounded-xl border border-sl-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-sl-green-600" />
          <h2 className="font-semibold text-sl-gray-900">
            Recently Verified
          </h2>
        </div>
        <div className="divide-y divide-sl-gray-100">
          {verified.slice(0, 5).map((dp) => (
            <div key={dp.id} className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium text-sl-gray-900">
                  {dp.title}
                </p>
                <p className="text-xs text-sl-gray-500">
                  {dp.ministry?.abbreviation} &middot; Verified{" "}
                  {dp.verified_at
                    ? new Date(dp.verified_at).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
              <BadgeCheck className="h-5 w-5 text-sl-green-500" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
