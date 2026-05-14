import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

const contactLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "60 m"),
  prefix: "rl:contact",
});

const bookingLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "24 h"),
  prefix: "rl:booking",
});

export async function middleware(request: NextRequest) {
  const ip =
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";

  const limiter =
    request.nextUrl.pathname === "/api/booking" ? bookingLimit : contactLimit;

  let result: { success: boolean; limit: number; remaining: number; reset: number };
  try {
    result = await limiter.limit(ip);
  } catch {
    // Redis unavailable — fail open so forms still work
    return NextResponse.next();
  }

  if (!result.success) {
    return new NextResponse(
      JSON.stringify({ error: "For mange forespørsler. Prøv igjen senere." }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "X-RateLimit-Limit": String(result.limit),
          "X-RateLimit-Remaining": String(result.remaining),
          "Retry-After": String(Math.ceil((result.reset - Date.now()) / 1000)),
        },
      }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/booking", "/api/contact"],
};
