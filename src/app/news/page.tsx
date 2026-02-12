"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ShareButtons from "@/components/cards/ShareButtons";
import { MOCK_NEWS, MOCK_MINISTRY_REPORTS } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import type { NewsArticle, MinistryReport } from "@/types";
import {
  Newspaper,
  Building2,
  Tag,
  Calendar,
  ArrowLeft,
  FileBarChart,
  ChevronRight,
} from "lucide-react";

export default function NewsPage() {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [selectedReport, setSelectedReport] = useState<MinistryReport | null>(null);
  const [activeTab, setActiveTab] = useState<"news" | "reports">("news");

  const featuredNews = MOCK_NEWS.filter((n) => n.is_featured);
  const latestNews = MOCK_NEWS.filter((n) => !n.is_featured);
  const publishedReports = MOCK_MINISTRY_REPORTS.filter((r) => r.status === "published");

  if (selectedArticle) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <button
              onClick={() => setSelectedArticle(null)}
              className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-sl-gray-500 hover:text-sl-gray-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to News
            </button>

            <article className="rounded-xl border border-sl-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1 rounded-full bg-sl-blue-50 px-3 py-1 text-xs font-medium text-sl-blue-700">
                  <Tag className="h-3 w-3" />
                  {selectedArticle.category}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-sl-gray-500">
                  <Building2 className="h-3 w-3" />
                  {selectedArticle.ministry?.abbreviation}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-sl-gray-500">
                  <Calendar className="h-3 w-3" />
                  {formatDate(selectedArticle.published_at)}
                </span>
              </div>

              <h1 className="mb-4 text-2xl font-bold text-sl-gray-900 sm:text-3xl">
                {selectedArticle.title}
              </h1>

              <div className="mb-6 rounded-lg bg-sl-green-50/50 p-4">
                <p className="text-sm font-medium leading-relaxed text-sl-gray-700">
                  {selectedArticle.excerpt}
                </p>
              </div>

              <div className="prose prose-sm max-w-none text-sl-gray-700">
                {selectedArticle.body.split("\n").map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              {selectedArticle.tags.length > 0 && (
                <div className="mt-6 border-t border-sl-gray-100 pt-4">
                  <div className="flex flex-wrap gap-2">
                    {selectedArticle.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-sl-gray-100 px-3 py-1 text-xs font-medium text-sl-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6 border-t border-sl-gray-100 pt-4">
                <ShareButtons
                  title={selectedArticle.title}
                  summary={selectedArticle.excerpt}
                  dataPointId={selectedArticle.id}
                />
              </div>
            </article>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (selectedReport) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <button
              onClick={() => setSelectedReport(null)}
              className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-sl-gray-500 hover:text-sl-gray-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Reports
            </button>

            <article className="rounded-xl border border-sl-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1 rounded-full bg-sl-blue-50 px-3 py-1 text-xs font-medium text-sl-blue-700">
                  {selectedReport.report_type.charAt(0).toUpperCase() + selectedReport.report_type.slice(1)} Report
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-sl-green-50 px-3 py-1 text-xs font-medium text-sl-green-700">
                  {selectedReport.period}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-sl-gray-500">
                  <Building2 className="h-3 w-3" />
                  {selectedReport.ministry?.abbreviation}
                </span>
              </div>

              <h1 className="mb-4 text-2xl font-bold text-sl-gray-900 sm:text-3xl">
                {selectedReport.title}
              </h1>

              <div className="mb-6 rounded-lg bg-sl-green-50/50 p-4">
                <h2 className="mb-1 text-xs font-semibold uppercase tracking-wider text-sl-green-700">
                  Executive Summary
                </h2>
                <p className="text-sm leading-relaxed text-sl-gray-700">
                  {selectedReport.summary}
                </p>
              </div>

              <div className="prose prose-sm max-w-none text-sl-gray-700">
                {selectedReport.body.split("\n").map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-2 border-t border-sl-gray-100 pt-4 text-xs text-sl-gray-500">
                <Calendar className="h-3.5 w-3.5" />
                Published {selectedReport.published_at ? formatDate(selectedReport.published_at) : "N/A"}
                <span className="mx-1">&middot;</span>
                <Building2 className="h-3.5 w-3.5" />
                {selectedReport.ministry?.name}
              </div>

              <div className="mt-4 border-t border-sl-gray-100 pt-4">
                <ShareButtons
                  title={selectedReport.title}
                  summary={selectedReport.summary}
                  dataPointId={selectedReport.id}
                />
              </div>
            </article>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Page header */}
        <section className="bg-gradient-to-br from-sl-blue-600 via-sl-blue-500 to-sl-green-600 px-4 pb-10 pt-10 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
              <Newspaper className="h-4 w-4" />
              Government News &amp; Reports
            </div>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              News &amp; Ministry Reports
            </h1>
            <p className="mt-2 max-w-2xl text-base text-white/80">
              Stay informed with the latest updates, announcements, and official reports from all government ministries.
            </p>
          </div>
        </section>

        {/* Tabs */}
        <section className="border-b border-sl-gray-200 bg-white px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="flex gap-6">
              <button
                onClick={() => setActiveTab("news")}
                className={`inline-flex items-center gap-2 border-b-2 px-1 py-4 text-sm font-semibold transition-colors ${
                  activeTab === "news"
                    ? "border-sl-green-500 text-sl-green-700"
                    : "border-transparent text-sl-gray-500 hover:text-sl-gray-700"
                }`}
              >
                <Newspaper className="h-4 w-4" />
                Latest News
              </button>
              <button
                onClick={() => setActiveTab("reports")}
                className={`inline-flex items-center gap-2 border-b-2 px-1 py-4 text-sm font-semibold transition-colors ${
                  activeTab === "reports"
                    ? "border-sl-green-500 text-sl-green-700"
                    : "border-transparent text-sl-gray-500 hover:text-sl-gray-700"
                }`}
              >
                <FileBarChart className="h-4 w-4" />
                Ministry Reports
              </button>
            </div>
          </div>
        </section>

        <section className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            {activeTab === "news" && (
              <div>
                {/* Featured articles */}
                {featuredNews.length > 0 && (
                  <div className="mb-8">
                    <h2 className="mb-4 text-lg font-bold text-sl-gray-900">Featured</h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {featuredNews.map((article) => (
                        <article
                          key={article.id}
                          onClick={() => setSelectedArticle(article)}
                          className="group cursor-pointer rounded-xl border-2 border-sl-green-200 bg-white p-5 shadow-sm transition-all hover:border-sl-green-400 hover:shadow-md"
                        >
                          <div className="mb-3 flex items-center gap-2">
                            <span className="rounded-full bg-sl-green-50 px-2.5 py-1 text-xs font-semibold text-sl-green-700">
                              Featured
                            </span>
                            <span className="rounded-full bg-sl-blue-50 px-2.5 py-1 text-xs font-medium text-sl-blue-700">
                              {article.category}
                            </span>
                          </div>
                          <h3 className="mb-2 text-lg font-semibold text-sl-gray-900 group-hover:text-sl-green-600">
                            {article.title}
                          </h3>
                          <p className="mb-3 text-sm leading-relaxed text-sl-gray-600 line-clamp-3">
                            {article.excerpt}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 text-xs text-sl-gray-500">
                              <span className="inline-flex items-center gap-1">
                                <Building2 className="h-3 w-3" />
                                {article.ministry?.abbreviation}
                              </span>
                              <span className="inline-flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {formatDate(article.published_at)}
                              </span>
                            </div>
                            <ChevronRight className="h-4 w-4 text-sl-gray-400 group-hover:text-sl-green-500" />
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                )}

                {/* Latest news */}
                <h2 className="mb-4 text-lg font-bold text-sl-gray-900">Latest Updates</h2>
                <div className="space-y-4">
                  {latestNews.map((article) => (
                    <article
                      key={article.id}
                      onClick={() => setSelectedArticle(article)}
                      className="group flex cursor-pointer items-start gap-4 rounded-xl border border-sl-gray-200 bg-white p-5 shadow-sm transition-all hover:border-sl-green-300 hover:shadow-md"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="mb-2 flex items-center gap-2">
                          <span className="rounded-full bg-sl-blue-50 px-2.5 py-0.5 text-xs font-medium text-sl-blue-700">
                            {article.category}
                          </span>
                          <span className="text-xs text-sl-gray-500">
                            {article.ministry?.abbreviation}
                          </span>
                        </div>
                        <h3 className="mb-1 text-base font-semibold text-sl-gray-900 group-hover:text-sl-green-600">
                          {article.title}
                        </h3>
                        <p className="mb-2 text-sm text-sl-gray-600 line-clamp-2">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-sl-gray-400">
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(article.published_at)}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="mt-1 h-5 w-5 shrink-0 text-sl-gray-300 group-hover:text-sl-green-500" />
                    </article>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "reports" && (
              <div>
                <h2 className="mb-4 text-lg font-bold text-sl-gray-900">Published Ministry Reports</h2>
                <div className="space-y-4">
                  {publishedReports.map((report) => (
                    <article
                      key={report.id}
                      onClick={() => setSelectedReport(report)}
                      className="group cursor-pointer rounded-xl border border-sl-gray-200 bg-white p-5 shadow-sm transition-all hover:border-sl-green-300 hover:shadow-md"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0 flex-1">
                          <div className="mb-2 flex flex-wrap items-center gap-2">
                            <span className="inline-flex items-center gap-1 rounded-full bg-sl-blue-50 px-2.5 py-1 text-xs font-medium text-sl-blue-700">
                              <FileBarChart className="h-3 w-3" />
                              {report.report_type.charAt(0).toUpperCase() + report.report_type.slice(1)} Report
                            </span>
                            <span className="rounded-full bg-sl-green-50 px-2.5 py-1 text-xs font-medium text-sl-green-700">
                              {report.period}
                            </span>
                            <span className="inline-flex items-center gap-1 text-xs text-sl-gray-500">
                              <Building2 className="h-3 w-3" />
                              {report.ministry?.abbreviation}
                            </span>
                          </div>
                          <h3 className="mb-1 text-base font-semibold text-sl-gray-900 group-hover:text-sl-green-600">
                            {report.title}
                          </h3>
                          <p className="mb-2 text-sm text-sl-gray-600 line-clamp-2">
                            {report.summary}
                          </p>
                          <span className="inline-flex items-center gap-1 text-xs text-sl-gray-400">
                            <Calendar className="h-3 w-3" />
                            Published {report.published_at ? formatDate(report.published_at) : "N/A"}
                          </span>
                        </div>
                        <ChevronRight className="mt-1 h-5 w-5 shrink-0 text-sl-gray-300 group-hover:text-sl-green-500" />
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
