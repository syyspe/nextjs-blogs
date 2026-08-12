import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";

export const GET = async (req: NextRequest) => {
    const authHeader = req.headers.get("Authorization")
    // console.log(authHeader)
    if (!authHeader) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    let token = ""
    try {
        token = authHeader.trim().slice(6).trim()
        // console.log(token)
        if (token.length !== 36) {
            throw new Error
        }
    } catch {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await db.query.users.findFirst({
        where: eq(users.token, token),
        columns: {id: true, username: true, name: true},
        with: {blogs: {
            columns: {userId: false}
        }},
    })

    if (!user) {
        return NextResponse.json({error: "Unauthorized"}, { status: 401 })
    }
    const { blogs, ...rest } = user
    return NextResponse.json({...rest, createdBlogs: blogs})
}