import bcrypt from "bcryptjs"
import { NeonDbError } from "@neondatabase/serverless"
import { eq, and } from "drizzle-orm"
import { db, } from "../../db"
import { readingList, users, } from "../../db/schema"

export const getUsers = async () => {
  return db.query.users.findMany()
}

export const getUserById = async (id: number) => {
  return await db.query.users.findFirst({
    where: eq(users.id, id),
  })
}

export const getUserByUsername = async (username: string) => {
  return await db.query.users.findFirst({
    where: eq(users.username, username),
  })
}

export const getUserWithBlogs = async (username: string) => {
  return await db.query.users.findFirst({
    where: eq(users.username, username),
    with: { blogs: true },
  })
}

export const getUserWithReadingList = async (id: number) => {
  return await db.query.users.findFirst({
    where: eq(users.id, id),
    with: {
      readingList: {
        where: eq(readingList.userId, id),
        with: { blog: true },
      }
    }
  })
}

export const getUsersReadingList = async (id: number, read: boolean) => {
  const rl = await db.query.users.findFirst({
    where: eq(users.id, id),
    with: {
      readingList: {
        where: and(eq(readingList.userId, id), eq(readingList.read, read)),
        with: { blog: true },
      }
    }
  })
  return rl?.readingList
}

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