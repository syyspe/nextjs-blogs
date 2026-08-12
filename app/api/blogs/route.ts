import { NextResponse } from "next/server"
import { getBlogs } from "@/app/services/blogs"

export const GET = async () => {
  const blogs = await getBlogs("")
  return NextResponse.json(blogs)
}