import type { NextRequest } from "next/server"

interface RateLimitConfig {
  interval: number // in milliseconds
  uniqueTokenPerInterval: number
}

const rateLimitMap = new Map()

export function rateLimit(config: RateLimitConfig) {
  return {
    check: (request: NextRequest, limit: number, token: string) =>
      new Promise<void>((resolve, reject) => {
        const tokenCount = rateLimitMap.get(token) || [0, Date.now()]
        const [count, lastReset] = tokenCount
        const now = Date.now()
        const timeSinceLastReset = now - lastReset

        if (timeSinceLastReset > config.interval) {
          rateLimitMap.set(token, [1, now])
          resolve()
        } else if (count < limit) {
          rateLimitMap.set(token, [count + 1, lastReset])
          resolve()
        } else {
          reject(new Error("Rate limit exceeded"))
        }
      }),
  }
}

// Create a rate limiter instance
export const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
})
