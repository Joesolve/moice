import { NextRequest, NextResponse } from "next/server";
import { MOCK_MINISTRY_REPORTS } from "@/lib/mock-data";

/**
 * GET /api/ministry-reports
 *
 * Returns published ministry reports. Supports filtering by ministry and report type.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const ministryId = searchParams.get("ministry_id");
  const reportType = searchParams.get("type");
  const status = searchParams.get("status") ?? "published";

  let reports = MOCK_MINISTRY_REPORTS.filter((r) => r.status === status);

  if (ministryId) {
    reports = reports.filter((r) => r.ministry_id === ministryId);
  }

  if (reportType) {
    reports = reports.filter((r) => r.report_type === reportType);
  }

  return NextResponse.json({
    success: true,
    total: reports.length,
    data: reports,
  });
}

/**
 * POST /api/ministry-reports
 *
 * Submit a new ministry report.
 * In production, this validates auth + writes to Supabase + creates audit entry.
 */
export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json(
      { success: false, error: "Authentication required. Provide a Bearer token." },
      { status: 401 }
    );
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const { title, summary, body, ministry_id, report_type, period } = payload;

  if (!title || !summary || !body || !ministry_id || !report_type || !period) {
    return NextResponse.json(
      {
        success: false,
        error: "Missing required fields: title, summary, body, ministry_id, report_type, period",
      },
      { status: 400 }
    );
  }

  const validTypes = ["quarterly", "annual", "special", "update"];
  if (!validTypes.includes(report_type)) {
    return NextResponse.json(
      {
        success: false,
        error: `Invalid report_type. Must be one of: ${validTypes.join(", ")}`,
      },
      { status: 400 }
    );
  }

  const newId = `mr_${Date.now()}`;
  return NextResponse.json(
    {
      success: true,
      message: "Ministry report submitted for MOICE review",
      data: {
        id: newId,
        title,
        summary,
        body,
        ministry_id,
        report_type,
        period,
        status: "submitted",
        created_at: new Date().toISOString(),
      },
    },
    { status: 201 }
  );
}
