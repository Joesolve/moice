import { NextRequest, NextResponse } from "next/server";
import { MOCK_DATA_POINTS } from "@/lib/mock-data";

/**
 * GET /api/data-points
 *
 * Returns all verified data points. Supports pagination.
 * In production, this would be a protected Supabase query.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const page = parseInt(searchParams.get("page") ?? "1", 10);
  const limit = Math.min(parseInt(searchParams.get("limit") ?? "20", 10), 100);
  const status = searchParams.get("status") ?? "verified";

  const filtered = MOCK_DATA_POINTS.filter((dp) => dp.status === status);
  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);

  return NextResponse.json({
    success: true,
    page,
    limit,
    total: filtered.length,
    total_pages: Math.ceil(filtered.length / limit),
    data: paginated,
  });
}

/**
 * POST /api/data-points
 *
 * Mock endpoint for submitting new data points.
 * In production, this validates auth + writes to Supabase + creates audit entry.
 */
export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  // Mock auth check
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

  const { title, summary, body, category_id, ministry_id, tags, source_url } = payload;

  // Basic validation
  if (!title || !summary || !body || !ministry_id) {
    return NextResponse.json(
      {
        success: false,
        error: "Missing required fields: title, summary, body, ministry_id",
      },
      { status: 400 }
    );
  }

  // Mock response — in production this creates a record in Supabase
  const newId = `dp_${Date.now()}`;
  return NextResponse.json(
    {
      success: true,
      message: "Data point submitted for review",
      data: {
        id: newId,
        title,
        summary,
        body,
        category_id: category_id ?? null,
        ministry_id,
        status: "pending_review",
        tags: tags ?? [],
        source_url: source_url ?? null,
        created_at: new Date().toISOString(),
      },
    },
    { status: 201 }
  );
}
