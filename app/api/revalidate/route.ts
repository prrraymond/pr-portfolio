import { type NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

// This is a simple API route that can be called to revalidate the cache
export async function POST(request: NextRequest) {
  try {
    // You could add authentication here to ensure only authorized requests can revalidate
    const body = await request.json()

    // Check for a secret token to secure the API route
    const token = request.headers.get("x-revalidate-token")
    const expectedToken = process.env.REVALIDATE_TOKEN

    if (expectedToken && token !== expectedToken) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 })
    }

    // Revalidate the home page and experience pages
    revalidatePath("/")
    revalidatePath("/experience/[slug]")

    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (err) {
    return NextResponse.json({ message: "Error revalidating", error: err }, { status: 500 })
  }
}

// Add a GET route for easier testing
export async function GET(request: NextRequest) {
  try {
    // Revalidate the home page and experience pages
    revalidatePath("/")
    revalidatePath("/experience/[slug]")

    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (err) {
    return NextResponse.json({ message: "Error revalidating", error: err }, { status: 500 })
  }
}
