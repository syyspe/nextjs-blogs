import { and, eq, ilike, } from "drizzle-orm"
import { db } from "../../db"
import { blogs, readingList } from "../../db/schema"
import { getCurrentUser } from "./session"

export const getBlogs = async (filter: string) => {
  if (filter) {
    return await db.query.blogs.findMany({
      where: ilike(blogs.title, `%${filter}%`),
      orderBy: (blogs, { desc }) => [desc(blogs.likes)],
  })  
  }
  return await db.query.blogs.findMany({
    orderBy: (blogs, { desc }) => [desc(blogs.likes)],
  })
}

export const getBlogById = async (id: number) => {
  return await db.query.blogs.findFirst({
    where: eq(blogs.id, id),
  })
}

export const addBlog = async (title: string, author: string, url: string, likes: number) => {
  const user = await userOrError()
  const [{ insertedId }] = await db.insert(blogs).values({ title, author, url, likes, userId: user.id }).returning({ insertedId: blogs.id })
  await db.insert(readingList).values({ userId: user.id, blogId: insertedId })
}

export const addBlogToReadingList = async (blogId: number) => {
  const user = await userOrError()
  const existing = await db.query.readingList.findFirst({
    where: and(eq(readingList.blogId, blogId), eq(readingList.userId, user.id)),
  })
  if (existing) return
  await db.insert(readingList).values({ userId: user.id, blogId })
}

export const markBlogRead = async (blogId: number, isRead: boolean = true) => {
  const user = await userOrError()
  await db.update(readingList)
    .set({read: isRead})
    .where(and(eq(readingList.blogId, blogId), eq(readingList.userId, user.id)))
}

export const like = async (id: number) => {
  const blog = await getBlogById(id)
  if (blog) {
    await db
      .update(blogs)
      .set({likes: blog.likes + 1})
      .where(eq(blogs.id, id))
  }
}

const userOrError = async () => {
  const user = await getCurrentUser()
  if (!user) throw new Error("Not logged in")
  return user
}