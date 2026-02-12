"use client";

import Link from "next/link";
import {
  Shield,
  LayoutDashboard,
  FileCheck,
  Building2,
  History,
  LogOut,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "review", label: "Review Queue", icon: FileCheck },
  { id: "ministries", label: "Ministries", icon: Building2 },
  { id: "audit", label: "Audit Trail", icon: History },
];

export default function AdminSidebar({
  activeTab,
  onTabChange,
}: AdminSidebarProps) {
  return (
    <aside className="flex h-screen w-64 flex-col border-r border-sl-gray-200 bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-sl-gray-200 px-4">
        <Shield className="h-7 w-7 text-sl-green-600" />
        <div className="leading-tight">
          <span className="block text-sm font-bold text-sl-gray-900">
            MOICE Admin
          </span>
          <span className="block text-[11px] text-sl-gray-500">
            Knowledge Hub
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onTabChange(item.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  activeTab === item.id
                    ? "bg-sl-green-50 text-sl-green-700"
                    : "text-sl-gray-600 hover:bg-sl-gray-50 hover:text-sl-gray-900"
                )}
              >
                <item.icon className="h-4.5 w-4.5" />
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-sl-gray-200 p-3">
        <div className="mb-3 rounded-lg bg-sl-gray-50 px-3 py-2">
          <p className="text-xs font-semibold text-sl-gray-700">
            Admin User
          </p>
          <p className="text-[11px] text-sl-gray-500">admin@moice.gov.sl</p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-sl-gray-200 py-2 text-xs font-medium text-sl-gray-600 hover:bg-sl-gray-50"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            Public Site
          </Link>
          <Link
            href="/login"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-sl-gray-200 py-2 text-xs font-medium text-sl-gray-600 hover:bg-sl-gray-50"
          >
            <LogOut className="h-3.5 w-3.5" />
            Sign Out
          </Link>
        </div>
      </div>
    </aside>
  );
}
