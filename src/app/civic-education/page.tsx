"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useCivicEducation } from "@/lib/civic-education/context";
import {
  GraduationCap,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  BookOpen,
} from "lucide-react";

export default function CivicEducationPage() {
  const { topics } = useCivicEducation();
  const [expandedTopic, setExpandedTopic] = useState<string | null>(
    topics[0]?.id ?? null
  );

  const toggleTopic = (id: string) => {
    setExpandedTopic((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Page header */}
        <section className="bg-gradient-to-br from-sl-green-600 via-sl-green-500 to-sl-blue-600 px-4 pb-10 pt-10 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
              <GraduationCap className="h-4 w-4" />
              Civic Education
            </div>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Know Your Government
            </h1>
            <p className="mt-2 max-w-2xl text-base text-white/80">
              Understanding how government works empowers you to participate in
              democracy, access public services, and hold leaders accountable.
            </p>
          </div>
        </section>

        {/* Quick navigation */}
        <section className="border-b border-sl-gray-200 bg-white px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-sl-gray-500">
              Topics
            </h2>
            <div className="flex flex-wrap gap-2">
              {topics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => {
                    setExpandedTopic(topic.id);
                    document
                      .getElementById(topic.id)
                      ?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                    expandedTopic === topic.id
                      ? "border-sl-green-500 bg-sl-green-50 text-sl-green-700"
                      : "border-sl-gray-200 text-sl-gray-600 hover:border-sl-green-300 hover:text-sl-green-700"
                  }`}
                >
                  <GraduationCap className="h-3.5 w-3.5" />
                  {topic.title}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Topics */}
        <section className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-4">
            {topics.map((topic) => {
              const isExpanded = expandedTopic === topic.id;
              return (
                <div
                  key={topic.id}
                  id={topic.id}
                  className="scroll-mt-24 rounded-xl border border-sl-gray-200 bg-white shadow-sm"
                >
                  <button
                    onClick={() => toggleTopic(topic.id)}
                    className="flex w-full items-start gap-4 p-5 text-left"
                    aria-expanded={isExpanded}
                  >
                    <div className="rounded-lg bg-sl-green-50 p-2.5">
                      <GraduationCap className="h-5 w-5 text-sl-green-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-semibold text-sl-gray-900 sm:text-lg">
                        {topic.title}
                      </h3>
                      <p className="mt-1 text-sm text-sl-gray-500">
                        {topic.summary}
                      </p>
                    </div>
                    <div className="mt-1 shrink-0 text-sl-gray-400">
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="border-t border-sl-gray-100 px-5 pb-5 pt-4 pl-[4.5rem]">
                      <div className="space-y-3">
                        {topic.content.map((paragraph, i) => (
                          <p
                            key={i}
                            className="text-sm leading-relaxed text-sl-gray-700"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {topics.length === 0 && (
              <div className="rounded-xl border border-sl-gray-200 bg-white p-10 text-center">
                <GraduationCap className="mx-auto mb-3 h-12 w-12 text-sl-gray-300" />
                <p className="font-semibold text-sl-gray-700">
                  No topics available yet
                </p>
                <p className="text-sm text-sl-gray-500">
                  Civic education content is being prepared. Check back soon.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-sl-gray-50 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <BookOpen className="mx-auto mb-4 h-10 w-10 text-sl-green-500" />
            <h2 className="mb-2 text-xl font-bold text-sl-gray-900">
              Knowledge is Power
            </h2>
            <p className="mb-6 text-sm text-sl-gray-600">
              Use the National Knowledge Hub to verify government data, track
              ministry performance, and stay informed about public services in
              your community.
            </p>
            <a
              href="/"
              className="inline-flex items-center gap-2 rounded-lg bg-sl-green-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-sl-green-600"
            >
              <ShieldCheck className="h-4 w-4" />
              Search Verified Data
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
