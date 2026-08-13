import bcrypt from "bcryptjs"
import { NeonDbError } from "@neondatabase/serverless"
import { db, } from "../../db"
import { users, blogs, readingList } from "../../db/schema"

export const createTestUser = async (name: string, username: string, password: string) => {
  const res = {
    success: true,
    error: "",
    status: 200,
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10)
    await db.insert(users).values({ username, name, passwordHash })
  } catch (err) {
    if (err instanceof Error && err.cause instanceof NeonDbError && err.cause.code === "23505") {
      res.error = "Username already exists"
      res.success = false
      res.status = 403
    } else {
      res.error = err instanceof Error ? err.message : String(err)
      res.success = false
      res.status = 500
    }
  }
  return res
}

export const reset = async () => {
  const res = {
    success: true,
    error: "",
    status: 200,
  }

  try {
    await db.delete(readingList)
    await db.delete(blogs)
    await db.delete(users)
  } catch (err) {
    res.error = err instanceof Error ? err.message : String(err)
    res.success = false
    res.status = 500
  }
  return res
}