import { NextRequest, NextResponse } from "next/server";

// FIX: Bypass SSL certificate issues in development
// This must be set at the top level to take effect before the first fetch
if (process.env.NODE_ENV === "development") {
  (process as unknown as { env: Record<string, string> }).env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path: pathArray } = await params;
  const path = pathArray.join("/");
  
  // Use environment variable if available, otherwise fallback to hardcoded
  const baseUrl = process.env.R2_PUBLIC_URL || "https://pub-b2ad5628805a4d8b869f60f52b7bdb01.r2.dev";
  const r2Url = `${baseUrl}/${path}`;

  console.log(`[ImageProxy] Fetching: ${r2Url}`);

  try {
    const res = await fetch(r2Url);

    if (!res.ok) {
      console.error(`[ImageProxy] Failed to fetch ${r2Url}: ${res.status} ${res.statusText}`);
      return new NextResponse(`Failed to fetch image: ${res.statusText}`, { status: res.status });
    }

    const contentType = res.headers.get("content-type") || "image/jpeg";
    const buffer = await res.arrayBuffer();

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error(`[ImageProxy] Error fetching ${r2Url}:`, errorMessage);
    return new NextResponse(`Error fetching image: ${errorMessage}`, { status: 500 });
  }
}
