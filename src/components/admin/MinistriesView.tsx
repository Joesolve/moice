"use client";

import { Building2 } from "lucide-react";
import { MINISTRIES, MOCK_DATA_POINTS } from "@/lib/mock-data";

export default function MinistriesView() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-sl-gray-900">Ministries</h1>
        <p className="text-sm text-sl-gray-500">
          Government ministries contributing to the Knowledge Hub
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {MINISTRIES.map((ministry) => {
          const dataPoints = MOCK_DATA_POINTS.filter(
            (dp) => dp.ministry_id === ministry.id
          );
          const verified = dataPoints.filter(
            (dp) => dp.status === "verified"
          ).length;
          const pending = dataPoints.filter(
            (dp) => dp.status === "pending_review"
          ).length;

          return (
            <div
              key={ministry.id}
              className="rounded-xl border border-sl-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="rounded-lg bg-sl-blue-50 p-2.5">
                  <Building2 className="h-5 w-5 text-sl-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-sl-gray-900">
                    {ministry.abbreviation}
                  </h3>
                  <p className="text-xs text-sl-gray-500">{ministry.name}</p>
                </div>
              </div>
              <p className="mb-3 text-sm text-sl-gray-600">
                {ministry.description}
              </p>
              <div className="flex gap-4 border-t border-sl-gray-100 pt-3 text-xs">
                <span className="text-sl-gray-500">
                  <span className="font-semibold text-sl-green-600">
                    {verified}
                  </span>{" "}
                  verified
                </span>
                <span className="text-sl-gray-500">
                  <span className="font-semibold text-amber-600">
                    {pending}
                  </span>{" "}
                  pending
                </span>
                <span className="text-sl-gray-500">
                  <span className="font-semibold text-sl-gray-700">
                    {dataPoints.length}
                  </span>{" "}
                  total
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
