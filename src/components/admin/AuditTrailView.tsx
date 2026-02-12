"use client";

import { History, User, FileText, BadgeCheck, Edit, Plus } from "lucide-react";

interface AuditEntry {
  id: string;
  action: string;
  dataPointTitle: string;
  user: string;
  ministry: string;
  timestamp: string;
}

const MOCK_AUDIT: AuditEntry[] = [
  {
    id: "a1",
    action: "verified",
    dataPointTitle: "2025 National Health Statistics Summary",
    user: "Admin User (MOICE)",
    ministry: "MOICE",
    timestamp: "2025-12-01T14:00:00Z",
  },
  {
    id: "a2",
    action: "submitted_for_review",
    dataPointTitle: "Water and Sanitation Coverage Report 2025",
    user: "Dr. Koroma (MoHS)",
    ministry: "MoHS",
    timestamp: "2026-01-20T11:00:00Z",
  },
  {
    id: "a3",
    action: "created",
    dataPointTitle: "Teacher Training Programme Outcomes 2025",
    user: "Mrs. Sesay (MBSSE)",
    ministry: "MBSSE",
    timestamp: "2026-02-01T14:00:00Z",
  },
  {
    id: "a4",
    action: "verified",
    dataPointTitle: "FY2025 National Budget Allocation Breakdown",
    user: "Admin User (MOICE)",
    ministry: "MOICE",
    timestamp: "2025-10-20T11:30:00Z",
  },
  {
    id: "a5",
    action: "updated",
    dataPointTitle: "Wellington-Masiaka Highway Bridge Rehabilitation Project",
    user: "Eng. Bangura (MoWPA)",
    ministry: "MoWPA",
    timestamp: "2026-01-15T10:00:00Z",
  },
  {
    id: "a6",
    action: "verified",
    dataPointTitle: "MOICE Community Radio Expansion Initiative",
    user: "Admin User (MOICE)",
    ministry: "MOICE",
    timestamp: "2026-01-18T15:00:00Z",
  },
  {
    id: "a7",
    action: "verified",
    dataPointTitle: "School Enrollment Rates 2024-2025",
    user: "Admin User (MOICE)",
    ministry: "MOICE",
    timestamp: "2025-10-05T16:00:00Z",
  },
  {
    id: "a8",
    action: "created",
    dataPointTitle: "Rice Production Output Q3 2025",
    user: "Mr. Kamara (MAF)",
    ministry: "MAF",
    timestamp: "2025-11-01T12:00:00Z",
  },
];

const actionConfig: Record<
  string,
  { icon: typeof History; color: string; bg: string; label: string }
> = {
  created: {
    icon: Plus,
    color: "text-sl-blue-600",
    bg: "bg-sl-blue-50",
    label: "Created",
  },
  updated: {
    icon: Edit,
    color: "text-amber-600",
    bg: "bg-amber-50",
    label: "Updated",
  },
  submitted_for_review: {
    icon: FileText,
    color: "text-purple-600",
    bg: "bg-purple-50",
    label: "Submitted for Review",
  },
  verified: {
    icon: BadgeCheck,
    color: "text-sl-green-600",
    bg: "bg-sl-green-50",
    label: "Verified",
  },
};

export default function AuditTrailView() {
  const sorted = [...MOCK_AUDIT].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-sl-gray-900">Audit Trail</h1>
        <p className="text-sm text-sl-gray-500">
          Complete history of all data point actions across ministries
        </p>
      </div>

      <div className="rounded-xl border border-sl-gray-200 bg-white shadow-sm">
        <div className="divide-y divide-sl-gray-100">
          {sorted.map((entry) => {
            const config = actionConfig[entry.action] ?? {
              icon: History,
              color: "text-sl-gray-600",
              bg: "bg-sl-gray-50",
              label: entry.action,
            };
            const Icon = config.icon;

            return (
              <div
                key={entry.id}
                className="flex items-start gap-4 px-5 py-4"
              >
                <div className={`rounded-lg ${config.bg} p-2`}>
                  <Icon className={`h-4 w-4 ${config.color}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-sl-gray-900">
                    <span className="font-semibold">{entry.user}</span>{" "}
                    <span className={`font-medium ${config.color}`}>
                      {config.label.toLowerCase()}
                    </span>{" "}
                    <span className="font-medium">
                      &quot;{entry.dataPointTitle}&quot;
                    </span>
                  </p>
                  <p className="mt-0.5 flex items-center gap-2 text-xs text-sl-gray-400">
                    <User className="h-3 w-3" />
                    {entry.ministry}
                    <span>&middot;</span>
                    {new Date(entry.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
