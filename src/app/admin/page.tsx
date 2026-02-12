"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import DashboardView from "@/components/admin/DashboardView";
import ReviewQueueView from "@/components/admin/ReviewQueueView";
import MinistriesView from "@/components/admin/MinistriesView";
import AuditTrailView from "@/components/admin/AuditTrailView";
import { Menu, X } from "lucide-react";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const views: Record<string, React.ReactNode> = {
    dashboard: <DashboardView />,
    review: <ReviewQueueView />,
    ministries: <MinistriesView />,
    audit: <AuditTrailView />,
  };

  return (
    <div className="flex h-screen overflow-hidden bg-sl-gray-50">
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative z-10">
            <AdminSidebar
              activeTab={activeTab}
              onTabChange={(tab) => {
                setActiveTab(tab);
                setSidebarOpen(false);
              }}
            />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile header */}
        <header className="flex h-14 items-center gap-3 border-b border-sl-gray-200 bg-white px-4 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-sl-gray-600"
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="text-sm font-bold text-sl-gray-900">
            MOICE Admin
          </span>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {views[activeTab]}
        </main>
      </div>
    </div>
  );
}
