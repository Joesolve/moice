import type { DataPoint, Ministry, Category } from "@/types";

export const MINISTRIES: Ministry[] = [
  {
    id: "m1",
    name: "Ministry of Health and Sanitation",
    abbreviation: "MoHS",
    description: "Responsible for health policy and sanitation programs",
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "m2",
    name: "Ministry of Finance",
    abbreviation: "MoF",
    description: "Responsible for fiscal policy and national budget",
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "m3",
    name: "Ministry of Basic and Senior Secondary Education",
    abbreviation: "MBSSE",
    description: "Responsible for basic and secondary education",
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "m4",
    name: "Ministry of Works and Public Assets",
    abbreviation: "MoWPA",
    description: "Responsible for infrastructure and public works",
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "m5",
    name: "Ministry of Information and Civic Education",
    abbreviation: "MOICE",
    description: "Responsible for public information and civic engagement",
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "m6",
    name: "Ministry of Agriculture and Food Security",
    abbreviation: "MAF",
    description: "Responsible for agricultural policy and food security",
    created_at: "2024-01-01T00:00:00Z",
  },
];

export const CATEGORIES: Category[] = [
  { id: "c1", name: "Health", slug: "health", description: "Public health statistics and programs" },
  { id: "c2", name: "Budget & Finance", slug: "budget-finance", description: "Government spending and fiscal data" },
  { id: "c3", name: "Education", slug: "education", description: "Education statistics and programs" },
  { id: "c4", name: "Infrastructure", slug: "infrastructure", description: "Roads, bridges, and public works" },
  { id: "c5", name: "Agriculture", slug: "agriculture", description: "Agricultural output and programs" },
  { id: "c6", name: "Governance", slug: "governance", description: "Government policy and administration" },
];

export const MOCK_DATA_POINTS: DataPoint[] = [
  {
    id: "dp1",
    title: "2025 National Health Statistics Summary",
    summary:
      "Comprehensive overview of key health indicators including maternal mortality rate (down 12%), malaria incidence, and vaccination coverage across all 16 districts.",
    body: "The Ministry of Health and Sanitation releases the annual National Health Statistics for the fiscal year 2024-2025. Key findings include: maternal mortality rate has decreased by 12% compared to the previous year. Malaria incidence per 1,000 population stands at 142.3, a reduction of 8%. Vaccination coverage for children under 5 has reached 78%, up from 71%. Community Health Workers now number 15,200 nationwide.",
    category_id: "c1",
    category: CATEGORIES[0],
    ministry_id: "m1",
    ministry: MINISTRIES[0],
    submitted_by: "user1",
    reviewed_by: "admin1",
    status: "verified",
    source_url: "https://mohs.gov.sl/reports/2025",
    tags: ["health", "statistics", "maternal health", "malaria", "vaccination"],
    created_at: "2025-11-15T10:30:00Z",
    updated_at: "2025-12-01T14:00:00Z",
    verified_at: "2025-12-01T14:00:00Z",
  },
  {
    id: "dp2",
    title: "FY2025 National Budget Allocation Breakdown",
    summary:
      "Detailed breakdown of the Le 9.2 trillion national budget, including allocations to education (21%), health (15%), infrastructure (18%), and debt servicing (12%).",
    body: "The Ministry of Finance publishes the full budget allocation for fiscal year 2025. Total budget: Le 9.2 trillion. Education receives 21% (Le 1.93T), Health receives 15% (Le 1.38T), Infrastructure receives 18% (Le 1.66T), Agriculture receives 10% (Le 920B), Defense/Security receives 8% (Le 736B), Debt servicing 12% (Le 1.1T), Other ministries 16% (Le 1.47T).",
    category_id: "c2",
    category: CATEGORIES[1],
    ministry_id: "m2",
    ministry: MINISTRIES[1],
    submitted_by: "user2",
    reviewed_by: "admin1",
    status: "verified",
    source_url: "https://mof.gov.sl/budget/2025",
    tags: ["budget", "finance", "allocation", "spending"],
    created_at: "2025-10-01T08:00:00Z",
    updated_at: "2025-10-20T11:30:00Z",
    verified_at: "2025-10-20T11:30:00Z",
  },
  {
    id: "dp3",
    title: "School Enrollment Rates 2024-2025",
    summary:
      "Primary school enrollment reaches 92% nationally, with notable improvements in rural districts. Secondary school completion rate at 64%.",
    body: "MBSSE reports primary enrollment at 92% (up from 88%). Girls' enrollment at 90%. Secondary enrollment at 74%. Completion rate for JSS: 78%, SSS: 64%. Free Quality School Education (FQSE) programme now covers 3.2 million students. Teacher-student ratio improved to 1:38 from 1:45.",
    category_id: "c3",
    category: CATEGORIES[2],
    ministry_id: "m3",
    ministry: MINISTRIES[2],
    submitted_by: "user3",
    reviewed_by: "admin1",
    status: "verified",
    source_url: "https://mbsse.gov.sl/enrollment/2025",
    tags: ["education", "enrollment", "schools", "FQSE"],
    created_at: "2025-09-20T09:00:00Z",
    updated_at: "2025-10-05T16:00:00Z",
    verified_at: "2025-10-05T16:00:00Z",
  },
  {
    id: "dp4",
    title: "Wellington-Masiaka Highway Bridge Rehabilitation Project",
    summary:
      "Status update on the Le 450 billion bridge rehabilitation project covering 12 bridges along the Wellington-Masiaka corridor. 8 of 12 bridges completed.",
    body: "The Ministry of Works and Public Assets provides an update on the Wellington-Masiaka Bridge Rehabilitation Project. Total project cost: Le 450 billion. 8 of 12 bridges fully rehabilitated. Expected completion: Q2 2026. The project employs 1,200 local workers. Bridge load capacity increased from 30 to 60 tonnes for improved commercial vehicle access.",
    category_id: "c4",
    category: CATEGORIES[3],
    ministry_id: "m4",
    ministry: MINISTRIES[3],
    submitted_by: "user4",
    reviewed_by: "admin1",
    status: "verified",
    source_url: null,
    tags: ["infrastructure", "bridges", "highway", "construction"],
    created_at: "2025-12-10T07:30:00Z",
    updated_at: "2026-01-15T10:00:00Z",
    verified_at: "2026-01-15T10:00:00Z",
  },
  {
    id: "dp5",
    title: "Rice Production Output Q3 2025",
    summary:
      "National rice production reached 1.2 million metric tonnes in Q3, a 15% increase year-over-year driven by the Smallholder Commercialization Programme.",
    body: "The Ministry of Agriculture reports that rice production in Q3 2025 reached 1.2 million metric tonnes, a 15% increase from the same period last year. The Smallholder Commercialization Programme (SCP) has enrolled 42,000 farmers. Mechanized farming now covers 28% of rice paddies. Key production districts: Bombali (22%), Tonkolili (18%), Bo (15%).",
    category_id: "c5",
    category: CATEGORIES[4],
    ministry_id: "m6",
    ministry: MINISTRIES[5],
    submitted_by: "user5",
    reviewed_by: "admin1",
    status: "verified",
    source_url: "https://maf.gov.sl/reports/rice-q3-2025",
    tags: ["agriculture", "rice", "production", "food security"],
    created_at: "2025-11-01T12:00:00Z",
    updated_at: "2025-11-20T09:30:00Z",
    verified_at: "2025-11-20T09:30:00Z",
  },
  {
    id: "dp6",
    title: "MOICE Community Radio Expansion Initiative",
    summary:
      "22 new community radio stations approved across underserved chiefdoms to improve civic information access for 1.8 million rural citizens.",
    body: "The Ministry of Information and Civic Education announces 22 new community radio licenses to be operational by mid-2026. Coverage will extend to 1.8 million citizens in rural areas. Each station will broadcast governance updates, health advisories, and educational content in local languages including Mende, Temne, Limba, and Krio.",
    category_id: "c6",
    category: CATEGORIES[5],
    ministry_id: "m5",
    ministry: MINISTRIES[4],
    submitted_by: "admin1",
    reviewed_by: "admin1",
    status: "verified",
    source_url: null,
    tags: ["media", "radio", "civic education", "rural"],
    created_at: "2026-01-05T08:00:00Z",
    updated_at: "2026-01-18T15:00:00Z",
    verified_at: "2026-01-18T15:00:00Z",
  },
  {
    id: "dp7",
    title: "Water and Sanitation Coverage Report 2025",
    summary:
      "Access to improved water sources now at 68% nationally. Urban coverage at 82%, rural at 54%. 340 new boreholes drilled this fiscal year.",
    body: "MoHS Water and Sanitation Directorate reports improved water access at 68% nationally. 340 new boreholes were drilled, primarily in Kailahun, Kenema, and Pujehun districts. Open defecation reduced to 14% from 19%. WASH programme has reached 2,400 communities.",
    category_id: "c1",
    category: CATEGORIES[0],
    ministry_id: "m1",
    ministry: MINISTRIES[0],
    submitted_by: "user1",
    reviewed_by: null,
    status: "pending_review",
    source_url: null,
    tags: ["water", "sanitation", "WASH", "boreholes"],
    created_at: "2026-01-20T11:00:00Z",
    updated_at: "2026-01-20T11:00:00Z",
    verified_at: null,
  },
  {
    id: "dp8",
    title: "Teacher Training Programme Outcomes 2025",
    summary:
      "6,400 teachers completed in-service training under the Teaching Service Commission programme. Focus on STEM and inclusive education.",
    body: "MBSSE reports 6,400 teachers completed training in 2025. 2,100 trained in STEM methods, 1,800 in inclusive education for learners with disabilities. Teacher certification rates improved 23%. 45 Teacher Training Colleges now operational.",
    category_id: "c3",
    category: CATEGORIES[2],
    ministry_id: "m3",
    ministry: MINISTRIES[2],
    submitted_by: "user3",
    reviewed_by: null,
    status: "draft",
    source_url: null,
    tags: ["education", "teachers", "training", "STEM"],
    created_at: "2026-02-01T14:00:00Z",
    updated_at: "2026-02-01T14:00:00Z",
    verified_at: null,
  },
];

export function searchMockData(query: string): DataPoint[] {
  if (!query.trim()) {
    return MOCK_DATA_POINTS.filter((dp) => dp.status === "verified");
  }

  const terms = query.toLowerCase().split(/\s+/);

  return MOCK_DATA_POINTS.filter((dp) => {
    if (dp.status !== "verified") return false;

    const searchable = [
      dp.title,
      dp.summary,
      dp.body,
      dp.ministry?.name ?? "",
      dp.ministry?.abbreviation ?? "",
      dp.category?.name ?? "",
      ...dp.tags,
    ]
      .join(" ")
      .toLowerCase();

    return terms.every((term) => searchable.includes(term));
  });
}
