/**
 * In-memory Rate Limiter for API Routes
 * Limits each IP to a configurable number of requests within a time window.
 * Deployed on Vercel serverless — the Map resets on cold starts,
 * which is acceptable for burst-protection against simple bots.
 */

interface RateLimitEntry {
  count: number;
  firstRequestTime: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

// Auto-cleanup stale entries every 5 minutes to prevent memory leaks
const CLEANUP_INTERVAL = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanup(windowMs: number) {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;
  
  for (const [key, entry] of rateLimitMap.entries()) {
    if (now - entry.firstRequestTime > windowMs) {
      rateLimitMap.delete(key);
    }
  }
}

interface RateLimitConfig {
  /** Maximum requests allowed within the window */
  maxRequests: number;
  /** Time window in milliseconds */
  windowMs: number;
}

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetIn: number; // seconds until window resets
}

export function checkRateLimit(
  ip: string,
  config: RateLimitConfig = { maxRequests: 3, windowMs: 10 * 60 * 1000 }
): RateLimitResult {
  const { maxRequests, windowMs } = config;
  const now = Date.now();

  // Periodic cleanup
  cleanup(windowMs);

  const entry = rateLimitMap.get(ip);

  // First request from this IP
  if (!entry) {
    rateLimitMap.set(ip, { count: 1, firstRequestTime: now });
    return { allowed: true, remaining: maxRequests - 1, resetIn: Math.ceil(windowMs / 1000) };
  }

  // Window has expired — reset
  if (now - entry.firstRequestTime > windowMs) {
    rateLimitMap.set(ip, { count: 1, firstRequestTime: now });
    return { allowed: true, remaining: maxRequests - 1, resetIn: Math.ceil(windowMs / 1000) };
  }

  // Within window — check count
  const resetIn = Math.ceil((windowMs - (now - entry.firstRequestTime)) / 1000);

  if (entry.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetIn };
  }

  // Increment and allow
  entry.count++;
  return { allowed: true, remaining: maxRequests - entry.count, resetIn };
}
