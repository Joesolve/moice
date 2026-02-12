import { NextRequest, NextResponse } from "next/server";
import { searchMockData, MOCK_DATA_POINTS } from "@/lib/mock-data";

/**
 * GET /api/search?q=<query>&category=<slug>&ministry=<id>
 *
 * Public API for searching verified government data points.
 * In production, this would query Supabase using full-text search.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const query = searchParams.get("q") ?? "";
  const category = searchParams.get("category");
  const ministry = searchParams.get("ministry");
  const dateFrom = searchParams.get("date_from");
  const dateTo = searchParams.get("date_to");

  let results = searchMockData({
    query,
    ministryId: ministry ?? undefined,
    dateFrom: dateFrom ?? undefined,
    dateTo: dateTo ?? undefined,
  });

  // Filter by category slug (additional filter on top of searchMockData)
  if (category) {
    results = results.filter((dp) => dp.category?.slug === category);
  }

  return NextResponse.json({
    success: true,
    query,
    filters: { category, ministry, date_from: dateFrom, date_to: dateTo },
    total: results.length,
    data: results.map((dp) => ({
      id: dp.id,
      title: dp.title,
      summary: dp.summary,
      category: dp.category?.name ?? null,
      ministry: dp.ministry?.name ?? null,
      ministry_abbreviation: dp.ministry?.abbreviation ?? null,
      status: dp.status,
      tags: dp.tags,
      source_url: dp.source_url,
      updated_at: dp.updated_at,
      verified_at: dp.verified_at,
    })),
  });
}
