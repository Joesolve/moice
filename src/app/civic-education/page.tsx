"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  GraduationCap,
  Building2,
  Vote,
  Scale,
  Landmark,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Users,
  HandCoins,
  Radio,
} from "lucide-react";

interface TopicSection {
  id: string;
  icon: React.ElementType;
  title: string;
  summary: string;
  content: string[];
}

const TOPICS: TopicSection[] = [
  {
    id: "government-structure",
    icon: Landmark,
    title: "How Government Works in Sierra Leone",
    summary:
      "Sierra Leone operates as a constitutional republic with three branches of government working together to serve the people.",
    content: [
      "The Executive Branch is led by the President, who serves as both Head of State and Head of Government. The President appoints a Cabinet of Ministers who oversee individual government ministries such as Health, Education, Finance, and Agriculture.",
      "The Legislative Branch consists of Parliament, a single-chamber body of 149 members. Parliament makes laws, approves the national budget, and holds the executive accountable through oversight committees.",
      "The Judicial Branch, led by the Supreme Court, interprets the law and ensures that government actions comply with the Constitution. The judiciary operates independently to protect citizens' rights.",
      "Local government is organised into 5 regions, 16 districts, and 190 chiefdoms. District councils deliver services like water, sanitation, and primary healthcare at the community level.",
    ],
  },
  {
    id: "citizen-rights",
    icon: Scale,
    title: "Your Rights and Responsibilities",
    summary:
      "Every Sierra Leonean citizen has fundamental rights guaranteed by the Constitution, and responsibilities to uphold.",
    content: [
      "The 1991 Constitution guarantees fundamental rights including: the right to life, freedom of speech and expression, freedom of the press, freedom of assembly, the right to education, and protection from discrimination.",
      "Citizens have the right to access information held by public bodies. The Right to Access Information Act (2013) allows any person to request records from government institutions. This Knowledge Hub is built on that principle.",
      "Your responsibilities as a citizen include: obeying the law, paying taxes, respecting the rights of others, participating in the democratic process through voting, and reporting corruption or misuse of public funds.",
      "If your rights are violated, you can seek redress through the courts, the Human Rights Commission of Sierra Leone, or the Office of the Ombudsman.",
    ],
  },
  {
    id: "budget-taxes",
    icon: HandCoins,
    title: "Understanding the National Budget",
    summary:
      "The national budget determines how your tax money is spent. Knowing how it works helps you hold government accountable.",
    content: [
      "The national budget is prepared annually by the Ministry of Finance. It outlines how much money the government plans to collect (revenue) and how it will be spent across ministries, departments, and agencies.",
      "Revenue comes from several sources: domestic taxes (income tax, goods and services tax), customs duties on imports, mining royalties and licenses, and grants from international development partners.",
      "Major spending areas include Education (21% of the FY2025 budget), Infrastructure (18%), Health (15%), Debt Servicing (12%), and Agriculture (10%). The remaining funds are allocated across other ministries and agencies.",
      "Citizens can track how the budget is being executed through this Knowledge Hub. The Ministry of Finance publishes quarterly and annual budget execution reports showing how much of each allocation has actually been spent.",
      "Budget transparency matters because it allows citizens, journalists, and civil society organisations to verify whether funds are reaching their intended purpose — schools, clinics, roads, and public services.",
    ],
  },
  {
    id: "elections-voting",
    icon: Vote,
    title: "Elections and Voting",
    summary:
      "Free and fair elections are the foundation of democracy. Every eligible citizen has the right and duty to vote.",
    content: [
      "Sierra Leone holds general elections every five years to elect the President, Members of Parliament, and local council representatives. The next elections are managed by the National Electoral Commission (NEC).",
      "To vote, you must be a Sierra Leonean citizen aged 18 or older and registered with the NEC. Voter registration is conducted periodically — listen to community radio announcements and NEC notices for registration drives in your area.",
      "On election day, go to your assigned polling station with your voter ID card. Voting is by secret ballot — no one can see who you voted for. Results are tallied publicly at each polling station before being sent to the national tally centre.",
      "Between elections, citizens can engage with their elected representatives through town hall meetings, petitions, and community forums. Members of Parliament hold constituency offices where you can raise concerns.",
    ],
  },
  {
    id: "fact-checking",
    icon: ShieldCheck,
    title: "How to Fact-Check Using This Platform",
    summary:
      "This Knowledge Hub gives you the tools to verify claims about government data and hold leaders accountable with verified facts.",
    content: [
      "When you hear a claim about government performance — for example, 'The health budget was increased by 20%' — you can verify it here. Use the search bar on the homepage to look up budget data, or filter by the Ministry of Finance.",
      "Every data point on this platform has been submitted by a government ministry and verified by MOICE before publication. Look for the green 'Verified' badge — it means the information has been reviewed for accuracy.",
      "Each data point includes the source ministry, the date it was verified, and the original source URL where available. This audit trail lets you trace information back to its origin.",
      "If you find a discrepancy between a public claim and verified data on this platform, you can share the data point directly via WhatsApp, Facebook, or X (Twitter) using the share buttons on every data card.",
      "Community radio stations across all 16 districts regularly reference verified data from this platform. Tune in for governance updates in Mende, Temne, Limba, and Krio.",
    ],
  },
  {
    id: "public-services",
    icon: Users,
    title: "Accessing Public Services",
    summary:
      "Government ministries provide essential services to citizens. Know what is available and how to access it.",
    content: [
      "Healthcare: Public health facilities provide free services for pregnant women, lactating mothers, and children under 5 through the Free Health Care Initiative. Community Health Workers in your chiefdom can direct you to the nearest facility.",
      "Education: The Free Quality School Education (FQSE) programme covers tuition, textbooks, and exam fees for all children in government-approved primary and secondary schools. Currently 3.2 million students are enrolled.",
      "Agriculture: Smallholder farmers can enrol in the Smallholder Commercialisation Programme (SCP) for access to improved seeds, fertiliser, and mechanised farming equipment. Contact your district agricultural office for enrolment.",
      "Infrastructure: Report road damage, broken bridges, or water supply problems to your district council or the Ministry of Works and Public Assets. The Wellington-Masiaka corridor and other major routes are under active rehabilitation.",
      "Civil Registration: Birth certificates, marriage certificates, and national identification cards are issued by the National Civil Registration Authority (NCRA). Mobile registration drives are conducted in rural areas periodically.",
    ],
  },
  {
    id: "community-radio",
    icon: Radio,
    title: "Community Radio and Information Access",
    summary:
      "Community radio is the backbone of information access in rural Sierra Leone, reaching communities where internet is limited.",
    content: [
      "MOICE has licensed 22 new community radio stations to be operational by mid-2026, extending coverage to 1.8 million citizens in underserved chiefdoms. These stations broadcast in local languages including Mende, Temne, Limba, and Krio.",
      "Community radio stations broadcast governance updates, health advisories, agricultural tips, and civic education content. They are a vital link between government and rural communities.",
      "If you do not have internet access, you can still benefit from the data on this platform. Community radio presenters regularly reference verified data published here, bringing fact-checked information to your area.",
      "To suggest topics for community radio civic education segments, contact your local station or reach out to MOICE through the district information office.",
    ],
  },
];

export default function CivicEducationPage() {
  const [expandedTopic, setExpandedTopic] = useState<string | null>(
    "government-structure"
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
              {TOPICS.map((topic) => (
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
                  <topic.icon className="h-3.5 w-3.5" />
                  {topic.title}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Topics */}
        <section className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-4">
            {TOPICS.map((topic) => {
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
                      <topic.icon className="h-5 w-5 text-sl-green-600" />
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
