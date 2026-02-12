import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/ingest
 *
 * Interoperability API: Mock endpoint for external government databases
 * to push data into the Knowledge Hub.
 *
 * In production, this would:
 * 1. Validate the API key against an allowed list of external systems
 * 2. Validate the payload schema
 * 3. Create a data_point with status "pending_review"
 * 4. Create an audit_trail entry with action "created" and source "external_api"
 * 5. Notify MOICE admins of the new submission
 *
 * Expected payload:
 * {
 *   "source_system": "statistics-sierra-leone",
 *   "api_key": "ext_...",
 *   "data": {
 *     "title": "...",
 *     "summary": "...",
 *     "body": "...",
 *     "category": "health",
 *     "ministry_abbreviation": "MoHS",
 *     "tags": ["health", "statistics"],
 *     "source_url": "https://..."
 *   }
 * }
 */
export async function POST(request: NextRequest) {
  const apiKey = request.headers.get("x-api-key");

  // Mock API key validation
  if (!apiKey || !apiKey.startsWith("ext_")) {
    return NextResponse.json(
      {
        success: false,
        error: "Invalid or missing API key. Expected header: x-api-key: ext_<your_key>",
      },
      { status: 403 }
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

  const { source_system, data } = payload;

  if (!source_system || !data?.title || !data?.summary || !data?.body) {
    return NextResponse.json(
      {
        success: false,
        error:
          "Missing required fields. Provide source_system and data with title, summary, body.",
        expected_schema: {
          source_system: "string (identifier for the external system)",
          data: {
            title: "string (required)",
            summary: "string (required)",
            body: "string (required)",
            category: "string (optional, category slug)",
            ministry_abbreviation: "string (optional)",
            tags: "string[] (optional)",
            source_url: "string (optional)",
          },
        },
      },
      { status: 400 }
    );
  }

  // Mock successful ingest
  const ingestId = `ingest_${Date.now()}`;
  return NextResponse.json(
    {
      success: true,
      message:
        "Data ingested successfully. It will be reviewed by MOICE before publication.",
      ingest_id: ingestId,
      source_system,
      status: "pending_review",
      created_at: new Date().toISOString(),
    },
    { status: 202 }
  );
}

/**
 * GET /api/ingest
 *
 * Returns documentation for the ingest endpoint.
 */
export async function GET() {
  return NextResponse.json({
    name: "Knowledge Hub Interoperability API",
    version: "1.0.0",
    description:
      "API endpoint for external government databases to push data into the Sierra Leone National Knowledge Hub.",
    endpoints: {
      "POST /api/ingest": {
        description: "Submit data from an external system for MOICE review",
        authentication: "x-api-key header with a valid external API key",
        body: {
          source_system: "string (required) - identifier for the calling system",
          data: {
            title: "string (required)",
            summary: "string (required)",
            body: "string (required)",
            category: "string (optional) - category slug",
            ministry_abbreviation: "string (optional)",
            tags: "string[] (optional)",
            source_url: "string (optional)",
          },
        },
        responses: {
          202: "Data accepted for review",
          400: "Validation error",
          403: "Invalid API key",
        },
      },
      "GET /api/search": {
        description: "Search verified data points",
        parameters: {
          q: "Search query string",
          category: "Filter by category slug",
          ministry: "Filter by ministry ID",
        },
      },
      "GET /api/data-points": {
        description: "List data points with pagination",
        parameters: {
          page: "Page number (default: 1)",
          limit: "Items per page (default: 20, max: 100)",
          status: "Filter by status (default: verified)",
        },
      },
    },
  });
}
