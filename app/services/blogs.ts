import { eq, ilike } from "drizzle-orm"
import { db } from "../../db"
import { blogs } from "../../db/schema"

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
  await db.insert(blogs).values({ title, author, url, likes })
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