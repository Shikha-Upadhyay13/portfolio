import { NextResponse } from "next/server";
import { getCorpus } from "@/lib/chat/corpus";
import { checkRateLimit } from "@/lib/chat/rateLimit";
import { retrieveChunks } from "@/lib/chat/retrieve";
import { synthesizeAnswer } from "@/lib/chat/synthesize";

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  const limit = checkRateLimit(ip);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      {
        status: 429,
        headers: limit.retryAfter
          ? { "Retry-After": String(limit.retryAfter) }
          : undefined,
      }
    );
  }

  let body: { query?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const query = body.query?.trim();
  if (!query) {
    return NextResponse.json({ error: "Query is required." }, { status: 400 });
  }

  const chunks = retrieveChunks(query, getCorpus());
  const { answer, sources } = synthesizeAnswer(chunks);

  return NextResponse.json({ answer, sources });
}
