import type { DataPoint, Ministry, Category, MinistryReport, NewsArticle, CivicEducationTopic, Announcement } from "@/types";

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

export const MOCK_MINISTRY_REPORTS: MinistryReport[] = [
  {
    id: "mr1",
    title: "Q4 2025 Health Sector Performance Report",
    summary: "Quarterly performance report covering maternal health improvements, malaria reduction progress, and WASH programme expansion across all 16 districts.",
    body: "The Ministry of Health and Sanitation presents its Q4 2025 performance report. Key achievements: Maternal mortality rate decreased by 12% year-over-year. Malaria treatment response time improved to under 24 hours in 78% of cases. 340 new boreholes completed under the WASH programme. Community Health Workers deployed: 15,200. Challenges: Medical supply chain disruptions in Kailahun and Pujehun districts. Staffing gaps in rural health facilities remain at 23%.",
    ministry_id: "m1",
    ministry: MINISTRIES[0],
    submitted_by: "user1",
    status: "published",
    report_type: "quarterly",
    period: "Q4 2025",
    attachments: [],
    created_at: "2026-01-10T09:00:00Z",
    updated_at: "2026-01-15T14:00:00Z",
    published_at: "2026-01-15T14:00:00Z",
  },
  {
    id: "mr2",
    title: "FY2025 Annual Budget Execution Report",
    summary: "Annual report on budget execution rates across all government ministries, departments, and agencies. Overall execution rate: 87%.",
    body: "The Ministry of Finance presents the FY2025 Annual Budget Execution Report. Total approved budget: Le 9.2 trillion. Total executed: Le 8.0 trillion (87% execution rate). Top performing sectors: Education (94% execution), Health (91% execution). Underperforming sectors: Infrastructure (72% execution due to delayed procurement), Agriculture (78% execution). Revenue collection exceeded targets by 3%, driven by improved customs digitization. Domestic debt reduced by Le 120 billion.",
    ministry_id: "m2",
    ministry: MINISTRIES[1],
    submitted_by: "user2",
    status: "published",
    report_type: "annual",
    period: "FY2025",
    attachments: [],
    created_at: "2026-01-20T08:00:00Z",
    updated_at: "2026-01-25T11:30:00Z",
    published_at: "2026-01-25T11:30:00Z",
  },
  {
    id: "mr3",
    title: "Free Quality School Education Programme Update",
    summary: "Special report on FQSE programme outcomes including enrollment statistics, learning assessment results, and infrastructure development.",
    body: "MBSSE presents a special update on the Free Quality School Education Programme. Students enrolled: 3.2 million (up from 2.8 million in 2024). Girls' enrollment ratio: 49.2% (near parity). 450 new classrooms constructed. 6,400 teachers completed in-service training. WASSCE pass rates improved from 42% to 51%. Challenges: Textbook distribution delays in Northern Province. 12% teacher attrition in remote areas.",
    ministry_id: "m3",
    ministry: MINISTRIES[2],
    submitted_by: "user3",
    status: "published",
    report_type: "special",
    period: "2025",
    attachments: [],
    created_at: "2026-01-28T10:00:00Z",
    updated_at: "2026-02-01T09:00:00Z",
    published_at: "2026-02-01T09:00:00Z",
  },
  {
    id: "mr4",
    title: "National Road Network Status Report Q4 2025",
    summary: "Quarterly update on road construction, bridge rehabilitation, and infrastructure maintenance projects across Sierra Leone.",
    body: "MoWPA Q4 2025 Infrastructure Report. Wellington-Masiaka Highway: 8 of 12 bridges completed, on track for Q2 2026 completion. Freetown-Conakry Highway: 45km resurfacing completed. Bo-Kenema Road: Design phase completed, construction begins Q1 2026. Urban roads: 23km of drainage improvements in Freetown. Total project workforce: 4,800 local workers employed. Budget utilized: Le 1.2 trillion of Le 1.66 trillion allocated.",
    ministry_id: "m4",
    ministry: MINISTRIES[3],
    submitted_by: "user4",
    status: "submitted",
    report_type: "quarterly",
    period: "Q4 2025",
    attachments: [],
    created_at: "2026-02-05T07:30:00Z",
    updated_at: "2026-02-05T07:30:00Z",
    published_at: null,
  },
  {
    id: "mr5",
    title: "Civic Education Outreach Annual Report 2025",
    summary: "Annual report on civic education campaigns, community radio expansion, and public information dissemination efforts.",
    body: "MOICE Annual Report 2025. Community radio stations licensed: 22 new stations approved. Public awareness campaigns: 48 campaigns conducted across all districts. Topics covered: voter registration, public health, climate resilience, financial literacy. Social media reach: 2.4 million Sierra Leoneans engaged. Town hall meetings: 164 sessions conducted in 16 districts. Key initiative: Launch of the National Knowledge Hub for transparent government data.",
    ministry_id: "m5",
    ministry: MINISTRIES[4],
    submitted_by: "admin1",
    status: "published",
    report_type: "annual",
    period: "2025",
    attachments: [],
    created_at: "2026-02-03T08:00:00Z",
    updated_at: "2026-02-08T15:00:00Z",
    published_at: "2026-02-08T15:00:00Z",
  },
];

export const MOCK_NEWS: NewsArticle[] = [
  {
    id: "n1",
    title: "National Knowledge Hub Launched to Boost Government Transparency",
    excerpt: "The Ministry of Information and Civic Education officially launches Sierra Leone's first centralized government data portal, providing citizens with verified facts and statistics from all ministries.",
    body: "In a landmark move towards digital governance, MOICE has launched the National Knowledge Hub — a comprehensive, searchable repository where citizens can fact-check claims and access verified data across all government ministries. The platform features real-time search, verified data points from 6 ministries, and a complete audit trail for accountability. Minister emphasized that this positions Sierra Leone as a model for government transparency in West Africa.",
    ministry_id: "m5",
    ministry: MINISTRIES[4],
    category: "Governance",
    image_url: null,
    published_at: "2026-02-10T09:00:00Z",
    is_featured: true,
    tags: ["transparency", "digital governance", "knowledge hub", "MOICE"],
  },
  {
    id: "n2",
    title: "Maternal Mortality Rate Drops 12% — Lowest in a Decade",
    excerpt: "Ministry of Health reports significant progress in maternal health outcomes as community health worker programme expands to all 16 districts.",
    body: "The Ministry of Health and Sanitation has announced a 12% reduction in maternal mortality rates, marking the lowest rate in over a decade. The improvement is attributed to the expansion of the Community Health Worker programme to all 16 districts, now with 15,200 active workers. Vaccination coverage for children under 5 has reached 78%. The ministry credited partnerships with international health organizations and improved supply chain management.",
    ministry_id: "m1",
    ministry: MINISTRIES[0],
    category: "Health",
    image_url: null,
    published_at: "2026-02-08T14:00:00Z",
    is_featured: true,
    tags: ["health", "maternal mortality", "community health"],
  },
  {
    id: "n3",
    title: "FY2025 Budget Execution Reaches 87% — Education Leads at 94%",
    excerpt: "Ministry of Finance reports strong budget execution across government with education sector achieving highest utilization rate.",
    body: "The Ministry of Finance has released the FY2025 Annual Budget Execution Report showing an overall execution rate of 87% — a significant improvement from the 79% rate in FY2024. The education sector led with a 94% execution rate, followed by health at 91%. Revenue collection exceeded targets by 3%, driven by improved customs digitization. The ministry noted that infrastructure execution at 72% remains a challenge due to procurement delays.",
    ministry_id: "m2",
    ministry: MINISTRIES[1],
    category: "Budget & Finance",
    image_url: null,
    published_at: "2026-02-05T10:00:00Z",
    is_featured: false,
    tags: ["budget", "finance", "fiscal performance"],
  },
  {
    id: "n4",
    title: "22 New Community Radio Stations to Reach 1.8 Million Rural Citizens",
    excerpt: "MOICE approves new community radio licenses to extend civic information access in underserved chiefdoms across Sierra Leone.",
    body: "The Ministry of Information and Civic Education has approved 22 new community radio licenses, expected to be operational by mid-2026. The stations will broadcast governance updates, health advisories, and educational content in local languages including Mende, Temne, Limba, and Krio. This initiative will extend information access to 1.8 million citizens in rural areas currently underserved by existing media infrastructure.",
    ministry_id: "m5",
    ministry: MINISTRIES[4],
    category: "Governance",
    image_url: null,
    published_at: "2026-01-18T15:00:00Z",
    is_featured: false,
    tags: ["radio", "civic education", "rural access", "media"],
  },
  {
    id: "n5",
    title: "Wellington-Masiaka Bridge Project Reaches 67% Completion",
    excerpt: "8 of 12 bridges rehabilitated along the critical Wellington-Masiaka corridor, employing 1,200 local workers.",
    body: "The Ministry of Works and Public Assets reports that the Le 450 billion Wellington-Masiaka Bridge Rehabilitation Project has reached 67% completion, with 8 of 12 bridges fully rehabilitated. Bridge load capacity has been increased from 30 to 60 tonnes to support improved commercial vehicle access. The project employs 1,200 local workers and is expected to be completed by Q2 2026.",
    ministry_id: "m4",
    ministry: MINISTRIES[3],
    category: "Infrastructure",
    image_url: null,
    published_at: "2026-01-15T10:00:00Z",
    is_featured: false,
    tags: ["infrastructure", "bridges", "construction", "employment"],
  },
  {
    id: "n6",
    title: "Rice Production Surges 15% as Smallholder Programme Expands",
    excerpt: "National rice production reaches 1.2 million metric tonnes driven by the Smallholder Commercialization Programme enrolling 42,000 farmers.",
    body: "The Ministry of Agriculture and Food Security reports that national rice production reached 1.2 million metric tonnes in Q3 2025 — a 15% increase year-over-year. The Smallholder Commercialization Programme (SCP) has enrolled 42,000 farmers, with mechanized farming now covering 28% of rice paddies. Key production districts include Bombali (22%), Tonkolili (18%), and Bo (15%). The ministry aims to achieve rice self-sufficiency by 2028.",
    ministry_id: "m6",
    ministry: MINISTRIES[5],
    category: "Agriculture",
    image_url: null,
    published_at: "2026-01-10T12:00:00Z",
    is_featured: false,
    tags: ["agriculture", "rice", "food security", "farming"],
  },
];

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "ann1",
    title: "Free Healthcare Services Extended to All Pregnant Women Nationwide",
    summary: "MoHS announces the expansion of the Free Health Care Initiative to cover all pregnant women regardless of age, effective immediately across all 16 districts.",
    body: "The Ministry of Health and Sanitation is pleased to announce that the Free Health Care Initiative has been expanded to cover all pregnant women nationwide, removing previous age-related restrictions. This policy change takes effect immediately and applies to all government health facilities across all 16 districts. Pregnant women can now access free antenatal care, delivery services, and postnatal care at any public health facility by presenting their national ID or voter registration card. Community Health Workers in each chiefdom have been briefed and can assist with facility referrals.",
    ministry_id: "m1",
    ministry: MINISTRIES[0],
    submitted_by: "user1",
    status: "published",
    created_at: "2026-02-08T09:00:00Z",
    updated_at: "2026-02-09T11:00:00Z",
    published_at: "2026-02-09T11:00:00Z",
  },
  {
    id: "ann2",
    title: "New Tax Filing Deadline for Small Businesses — Extended to March 31",
    summary: "The Ministry of Finance extends the FY2025 tax filing deadline for small and medium enterprises to 31 March 2026.",
    body: "The Ministry of Finance hereby announces that the tax filing deadline for small and medium enterprises (SMEs) for fiscal year 2025 has been extended from 28 February to 31 March 2026. This extension applies to all businesses with annual turnover below Le 500 million. Businesses can file returns online through the National Revenue Authority portal or in person at any district NRA office. Late penalties will not be applied for filings received before the new deadline. For assistance, SMEs can call the NRA helpline or visit their nearest district tax office.",
    ministry_id: "m2",
    ministry: MINISTRIES[1],
    submitted_by: "user2",
    status: "published",
    created_at: "2026-02-05T08:00:00Z",
    updated_at: "2026-02-06T10:00:00Z",
    published_at: "2026-02-06T10:00:00Z",
  },
  {
    id: "ann3",
    title: "WASSCE Registration Opens for 2026 — Free for FQSE Students",
    summary: "MBSSE confirms that WASSCE 2026 registration is now open and exam fees are fully covered for all students enrolled under the FQSE programme.",
    body: "The Ministry of Basic and Senior Secondary Education announces that registration for the 2026 West African Senior School Certificate Examination (WASSCE) is now open. All students enrolled under the Free Quality School Education (FQSE) programme will have their examination fees fully covered by the government. School principals are advised to submit student lists to their District Education Offices by 15 March 2026. Private candidates may register directly at designated NEC centres. The examination is scheduled to begin in May 2026.",
    ministry_id: "m3",
    ministry: MINISTRIES[2],
    submitted_by: "user3",
    status: "published",
    created_at: "2026-02-01T07:00:00Z",
    updated_at: "2026-02-02T09:30:00Z",
    published_at: "2026-02-02T09:30:00Z",
  },
  {
    id: "ann4",
    title: "Temporary Road Closure: Freetown-Waterloo Highway for Bridge Repairs",
    summary: "MoWPA advises that the Freetown-Waterloo Highway will be partially closed for 3 weeks starting 17 February for emergency bridge reinforcement.",
    body: "The Ministry of Works and Public Assets informs the public that a section of the Freetown-Waterloo Highway near the Allen Town junction will be partially closed for emergency bridge reinforcement works beginning 17 February 2026. The closure will last approximately 3 weeks. A single-lane alternating traffic system will be in place during daytime hours (6am–6pm). Motorists are advised to use the Hill Station alternative route during peak hours. Heavy commercial vehicles over 30 tonnes are temporarily prohibited on this section. Updates will be posted at the ministry's notice boards and broadcast on community radio.",
    ministry_id: "m4",
    ministry: MINISTRIES[3],
    submitted_by: "user4",
    status: "submitted",
    created_at: "2026-02-10T06:00:00Z",
    updated_at: "2026-02-10T06:00:00Z",
    published_at: null,
  },
  {
    id: "ann5",
    title: "National Town Hall Series on Government Transparency Begins March 1",
    summary: "MOICE launches a 16-district town hall tour to explain the National Knowledge Hub and gather citizen feedback on government data priorities.",
    body: "The Ministry of Information and Civic Education is pleased to announce a series of town hall meetings across all 16 districts beginning 1 March 2026. The tour will introduce the National Knowledge Hub to communities, demonstrate how citizens can use the platform to access verified government data, and gather feedback on what information the public needs most. Each session will include presentations in local languages, live demonstrations, and an open Q&A with district officials. Dates and venues for each district will be announced on community radio and at district council offices. All citizens are welcome to attend.",
    ministry_id: "m5",
    ministry: MINISTRIES[4],
    submitted_by: "admin1",
    status: "published",
    created_at: "2026-02-07T10:00:00Z",
    updated_at: "2026-02-08T14:00:00Z",
    published_at: "2026-02-08T14:00:00Z",
  },
];

export const CIVIC_EDUCATION_TOPICS: CivicEducationTopic[] = [
  {
    id: "ce1",
    title: "How Government Works in Sierra Leone",
    summary:
      "Sierra Leone operates as a constitutional republic with three branches of government working together to serve the people.",
    content: [
      "The Executive Branch is led by the President, who serves as both Head of State and Head of Government. The President appoints a Cabinet of Ministers who oversee individual government ministries such as Health, Education, Finance, and Agriculture.",
      "The Legislative Branch consists of Parliament, a single-chamber body of 149 members. Parliament makes laws, approves the national budget, and holds the executive accountable through oversight committees.",
      "The Judicial Branch, led by the Supreme Court, interprets the law and ensures that government actions comply with the Constitution. The judiciary operates independently to protect citizens' rights.",
      "Local government is organised into 5 regions, 16 districts, and 190 chiefdoms. District councils deliver services like water, sanitation, and primary healthcare at the community level.",
    ],
    created_at: "2026-01-15T08:00:00Z",
    updated_at: "2026-01-15T08:00:00Z",
  },
  {
    id: "ce2",
    title: "Your Rights and Responsibilities",
    summary:
      "Every Sierra Leonean citizen has fundamental rights guaranteed by the Constitution, and responsibilities to uphold.",
    content: [
      "The 1991 Constitution guarantees fundamental rights including: the right to life, freedom of speech and expression, freedom of the press, freedom of assembly, the right to education, and protection from discrimination.",
      "Citizens have the right to access information held by public bodies. The Right to Access Information Act (2013) allows any person to request records from government institutions. This Knowledge Hub is built on that principle.",
      "Your responsibilities as a citizen include: obeying the law, paying taxes, respecting the rights of others, participating in the democratic process through voting, and reporting corruption or misuse of public funds.",
      "If your rights are violated, you can seek redress through the courts, the Human Rights Commission of Sierra Leone, or the Office of the Ombudsman.",
    ],
    created_at: "2026-01-15T08:00:00Z",
    updated_at: "2026-01-15T08:00:00Z",
  },
  {
    id: "ce3",
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
    created_at: "2026-01-15T08:00:00Z",
    updated_at: "2026-01-15T08:00:00Z",
  },
  {
    id: "ce4",
    title: "Elections and Voting",
    summary:
      "Free and fair elections are the foundation of democracy. Every eligible citizen has the right and duty to vote.",
    content: [
      "Sierra Leone holds general elections every five years to elect the President, Members of Parliament, and local council representatives. The next elections are managed by the National Electoral Commission (NEC).",
      "To vote, you must be a Sierra Leonean citizen aged 18 or older and registered with the NEC. Voter registration is conducted periodically — listen to community radio announcements and NEC notices for registration drives in your area.",
      "On election day, go to your assigned polling station with your voter ID card. Voting is by secret ballot — no one can see who you voted for. Results are tallied publicly at each polling station before being sent to the national tally centre.",
      "Between elections, citizens can engage with their elected representatives through town hall meetings, petitions, and community forums. Members of Parliament hold constituency offices where you can raise concerns.",
    ],
    created_at: "2026-01-15T08:00:00Z",
    updated_at: "2026-01-15T08:00:00Z",
  },
  {
    id: "ce5",
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
    created_at: "2026-01-15T08:00:00Z",
    updated_at: "2026-01-15T08:00:00Z",
  },
  {
    id: "ce6",
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
    created_at: "2026-01-15T08:00:00Z",
    updated_at: "2026-01-15T08:00:00Z",
  },
  {
    id: "ce7",
    title: "Community Radio and Information Access",
    summary:
      "Community radio is the backbone of information access in rural Sierra Leone, reaching communities where internet is limited.",
    content: [
      "MOICE has licensed 22 new community radio stations to be operational by mid-2026, extending coverage to 1.8 million citizens in underserved chiefdoms. These stations broadcast in local languages including Mende, Temne, Limba, and Krio.",
      "Community radio stations broadcast governance updates, health advisories, agricultural tips, and civic education content. They are a vital link between government and rural communities.",
      "If you do not have internet access, you can still benefit from the data on this platform. Community radio presenters regularly reference verified data published here, bringing fact-checked information to your area.",
      "To suggest topics for community radio civic education segments, contact your local station or reach out to MOICE through the district information office.",
    ],
    created_at: "2026-01-15T08:00:00Z",
    updated_at: "2026-01-15T08:00:00Z",
  },
];

export interface SearchFilters {
  query?: string;
  ministryId?: string;
  dateFrom?: string;
  dateTo?: string;
}

export function searchMockData(filters: SearchFilters | string): DataPoint[] {
  // Support legacy string-only calls
  const { query = "", ministryId, dateFrom, dateTo } =
    typeof filters === "string" ? { query: filters } : filters;

  let results = MOCK_DATA_POINTS.filter((dp) => dp.status === "verified");

  // Filter by ministry
  if (ministryId) {
    results = results.filter((dp) => dp.ministry_id === ministryId);
  }

  // Filter by date range (uses verified_at date)
  if (dateFrom) {
    const from = new Date(dateFrom);
    results = results.filter(
      (dp) => dp.verified_at && new Date(dp.verified_at) >= from
    );
  }
  if (dateTo) {
    const to = new Date(dateTo);
    to.setHours(23, 59, 59, 999);
    results = results.filter(
      (dp) => dp.verified_at && new Date(dp.verified_at) <= to
    );
  }

  // Filter by text query
  if (query.trim()) {
    const terms = query.toLowerCase().split(/\s+/);
    results = results.filter((dp) => {
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

  return results;
}
