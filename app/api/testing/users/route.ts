import { NextResponse, NextRequest } from "next/server"
import { createTestUser } from "@/app/services/servicesForTesting"

export const POST = async (req: NextRequest) => {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
    )
  }

  const { name, username, password } = await req.json()
  const resp = await createTestUser(name, username, password)
  return NextResponse.json(resp, {status: resp.status})
}