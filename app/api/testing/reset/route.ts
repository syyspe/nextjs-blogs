import { NextResponse } from "next/server"
import { reset } from "@/app/services/servicesForTesting"

export const DELETE = async () => {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
    )
  }
  const resp = await reset()
  return NextResponse.json(resp, {status: resp.status})
}