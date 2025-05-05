import { type NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

export async function GET(request: NextRequest) {
  try {
    // Get the token from the request
    const token = request.nextUrl.searchParams.get("token")

    // Check if the token is valid
    if (token !== process.env.REVALIDATE_TOKEN) {
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 })
    }

    // Revalidate the home page and all experience pages
    revalidatePath("/")
    revalidatePath("/experience/[slug]")

    // Return success response
    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      message: "Cache revalidated successfully",
    })
  } catch (error) {
    // Return error response
    return NextResponse.json(
      { success: false, message: "Error revalidating cache", error: String(error) },
      { status: 500 },
    )
  }
}
