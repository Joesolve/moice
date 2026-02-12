"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Shield } from "lucide-react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-sl-green-500 text-white shadow-md">
      {/* Top accent bar */}
      <div className="h-1 bg-gradient-to-r from-sl-green-700 via-sl-blue-500 to-sl-green-700" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo / Title */}
          <Link href="/" className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-white" />
            <div className="leading-tight">
              <span className="block text-lg font-bold tracking-tight">
                National Knowledge Hub
              </span>
              <span className="block text-xs font-medium text-sl-green-100">
                Republic of Sierra Leone
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="/"
              className="text-sm font-medium text-white/90 transition-colors hover:text-white"
            >
              Home
            </Link>
            <Link
              href="/#search"
              className="text-sm font-medium text-white/90 transition-colors hover:text-white"
            >
              Search Data
            </Link>
            <Link
              href="/admin"
              className="rounded-md bg-sl-blue-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-sl-blue-600"
            >
              Admin Portal
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="border-t border-sl-green-400 pb-4 pt-2 md:hidden">
            <Link
              href="/"
              className="block py-2 text-sm font-medium text-white/90"
              onClick={() => setMobileOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/#search"
              className="block py-2 text-sm font-medium text-white/90"
              onClick={() => setMobileOpen(false)}
            >
              Search Data
            </Link>
            <Link
              href="/admin"
              className="mt-2 block rounded-md bg-sl-blue-500 px-4 py-2 text-center text-sm font-semibold text-white"
              onClick={() => setMobileOpen(false)}
            >
              Admin Portal
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
