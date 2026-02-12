"use client";

import { useState } from "react";
import { Shield, LogIn, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/context";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const result = await login(email, password);

    if (result.success) {
      if (email.includes("admin")) {
        router.push("/admin");
      } else {
        router.push("/contributor");
      }
    } else {
      setError(result.error ?? "Login failed");
    }
    setIsLoading(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-sl-gray-50 px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-sl-green-600">
            <Shield className="h-10 w-10" />
          </Link>
          <h1 className="mt-4 text-2xl font-bold text-sl-gray-900">
            Sign In
          </h1>
          <p className="mt-1 text-sm text-sl-gray-500">
            Access the Knowledge Hub administrative portal
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleLogin}
          className="rounded-xl border border-sl-gray-200 bg-white p-6 shadow-sm"
        >
          {error && (
            <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-sl-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-11 w-full rounded-lg border border-sl-gray-300 px-3 text-sm focus:border-sl-green-500 focus:outline-none focus:ring-2 focus:ring-sl-green-500/20"
              placeholder="you@ministry.gov.sl"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium text-sl-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-11 w-full rounded-lg border border-sl-gray-300 px-3 text-sm focus:border-sl-green-500 focus:outline-none focus:ring-2 focus:ring-sl-green-500/20"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-sl-green-500 text-sm font-semibold text-white transition-colors hover:bg-sl-green-600 disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <LogIn className="h-4 w-4" />
            )}
            Sign In
          </button>
        </form>

        {/* Demo credentials */}
        <div className="mt-6 rounded-xl border border-sl-blue-200 bg-sl-blue-50 p-4">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-sl-blue-700">
            Demo Credentials
          </h3>
          <div className="space-y-2 text-xs text-sl-blue-600">
            <div>
              <span className="font-semibold">MOICE Admin:</span>{" "}
              admin@moice.gov.sl / admin123
            </div>
            <div>
              <span className="font-semibold">Ministry Contributor:</span>{" "}
              contributor@mohs.gov.sl / contributor123
            </div>
          </div>
        </div>

        <div className="mt-4 text-center">
          <Link
            href="/"
            className="text-sm text-sl-gray-500 hover:text-sl-gray-700"
          >
            &larr; Back to public portal
          </Link>
        </div>
      </div>
    </div>
  );
}
