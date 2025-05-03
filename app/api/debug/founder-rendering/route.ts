import { NextResponse } from "next/server"
import { headers } from "next/headers"

export async function GET() {
  // Get the user agent to check if this is a browser or server
  const headersList = headers()
  const userAgent = headersList.get("user-agent") || ""

  // Get the current time to help with cache debugging
  const now = new Date()

  return NextResponse.json({
    message: "This endpoint helps debug founder card rendering issues",
    timestamp: now.toISOString(),
    userAgent,
    isServer: typeof window === "undefined",
    environment: process.env.NODE_ENV,
    tips: [
      "Make sure to clear your browser cache (Ctrl+F5)",
      "Check the browser console for any errors",
      "Verify that FounderCardV2 is being used in ContentRow",
      "Confirm that each founder has a unique sort order",
      "Try viewing the page in an incognito/private window",
    ],
  })
}
