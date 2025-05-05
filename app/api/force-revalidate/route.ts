import { revalidatePath } from "next/cache"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Get the token from the request
    const token = request.nextUrl.searchParams.get("token")

    // Check if the token is valid
    if (token !== process.env.REVALIDATE_TOKEN) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 })
    }

    // Revalidate all paths
    revalidatePath("/", "layout")

    return NextResponse.json({
      revalidated: true,
      message: "Revalidation triggered successfully",
      date: new Date().toISOString(),
    })
  } catch (err) {
    return NextResponse.json({ message: "Error revalidating", error: err }, { status: 500 })
  }
}
