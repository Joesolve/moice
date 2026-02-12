"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ShareButtons from "@/components/cards/ShareButtons";
import { MOCK_NEWS } from "@/lib/mock-data";
import { useAnnouncements } from "@/lib/announcements/context";
import { formatDate } from "@/lib/utils";
import type { NewsArticle, Announcement } from "@/types";
import {
  Newspaper,
  Building2,
  Tag,
  Calendar,
  ArrowLeft,
  Megaphone,
  ChevronRight,
} from "lucide-react";

export default function NewsPage() {
  const { announcements } = useAnnouncements();
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [activeTab, setActiveTab] = useState<"news" | "announcements">("news");

  const featuredNews = MOCK_NEWS.filter((n) => n.is_featured);
  const latestNews = MOCK_NEWS.filter((n) => !n.is_featured);
  const publishedAnnouncements = announcements.filter((a) => a.status === "published");

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

  if (selectedAnnouncement) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <button
              onClick={() => setSelectedAnnouncement(null)}
              className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-sl-gray-500 hover:text-sl-gray-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Announcements
            </button>

            <article className="rounded-xl border border-sl-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                  <Megaphone className="h-3 w-3" />
                  Announcement
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-sl-gray-500">
                  <Building2 className="h-3 w-3" />
                  {selectedAnnouncement.ministry?.abbreviation}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-sl-gray-500">
                  <Calendar className="h-3 w-3" />
                  {selectedAnnouncement.published_at
                    ? formatDate(selectedAnnouncement.published_at)
                    : formatDate(selectedAnnouncement.created_at)}
                </span>
              </div>

              <h1 className="mb-4 text-2xl font-bold text-sl-gray-900 sm:text-3xl">
                {selectedAnnouncement.title}
              </h1>

              <div className="mb-6 rounded-lg bg-amber-50/50 p-4">
                <p className="text-sm font-medium leading-relaxed text-sl-gray-700">
                  {selectedAnnouncement.summary}
                </p>
              </div>

              <div className="prose prose-sm max-w-none text-sl-gray-700">
                {selectedAnnouncement.body.split("\n").map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-2 border-t border-sl-gray-100 pt-4 text-xs text-sl-gray-500">
                <Calendar className="h-3.5 w-3.5" />
                Published{" "}
                {selectedAnnouncement.published_at
                  ? formatDate(selectedAnnouncement.published_at)
                  : "N/A"}
                <span className="mx-1">&middot;</span>
                <Building2 className="h-3.5 w-3.5" />
                {selectedAnnouncement.ministry?.name}
              </div>

              <div className="mt-4 border-t border-sl-gray-100 pt-4">
                <ShareButtons
                  title={selectedAnnouncement.title}
                  summary={selectedAnnouncement.summary}
                  dataPointId={selectedAnnouncement.id}
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
              Government News &amp; Announcements
            </div>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              News &amp; Announcements
            </h1>
            <p className="mt-2 max-w-2xl text-base text-white/80">
              Stay informed with the latest updates, announcements, and official
              communications from all government ministries.
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
                onClick={() => setActiveTab("announcements")}
                className={`inline-flex items-center gap-2 border-b-2 px-1 py-4 text-sm font-semibold transition-colors ${
                  activeTab === "announcements"
                    ? "border-sl-green-500 text-sl-green-700"
                    : "border-transparent text-sl-gray-500 hover:text-sl-gray-700"
                }`}
              >
                <Megaphone className="h-4 w-4" />
                Announcements
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

            {activeTab === "announcements" && (
              <div>
                <h2 className="mb-4 text-lg font-bold text-sl-gray-900">
                  Ministry Announcements
                </h2>
                {publishedAnnouncements.length === 0 ? (
                  <div className="rounded-xl border border-sl-gray-200 bg-white p-10 text-center">
                    <Megaphone className="mx-auto mb-3 h-12 w-12 text-sl-gray-300" />
                    <p className="font-semibold text-sl-gray-700">No announcements yet</p>
                    <p className="text-sm text-sl-gray-500">
                      Check back soon for official government announcements.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {publishedAnnouncements.map((announcement) => (
                      <article
                        key={announcement.id}
                        onClick={() => setSelectedAnnouncement(announcement)}
                        className="group cursor-pointer rounded-xl border border-sl-gray-200 bg-white p-5 shadow-sm transition-all hover:border-sl-green-300 hover:shadow-md"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0 flex-1">
                            <div className="mb-2 flex flex-wrap items-center gap-2">
                              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                                <Megaphone className="h-3 w-3" />
                                Announcement
                              </span>
                              <span className="inline-flex items-center gap-1 text-xs text-sl-gray-500">
                                <Building2 className="h-3 w-3" />
                                {announcement.ministry?.abbreviation}
                              </span>
                            </div>
                            <h3 className="mb-1 text-base font-semibold text-sl-gray-900 group-hover:text-sl-green-600">
                              {announcement.title}
                            </h3>
                            <p className="mb-2 text-sm text-sl-gray-600 line-clamp-2">
                              {announcement.summary}
                            </p>
                            <span className="inline-flex items-center gap-1 text-xs text-sl-gray-400">
                              <Calendar className="h-3 w-3" />
                              Published{" "}
                              {announcement.published_at
                                ? formatDate(announcement.published_at)
                                : "N/A"}
                            </span>
                          </div>
                          <ChevronRight className="mt-1 h-5 w-5 shrink-0 text-sl-gray-300 group-hover:text-sl-green-500" />
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
