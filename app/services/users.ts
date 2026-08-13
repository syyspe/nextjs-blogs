import { eq,and } from "drizzle-orm"
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
  const rl =  await db.query.users.findFirst({
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