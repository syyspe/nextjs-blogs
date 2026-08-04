"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { addBlog, like } from "../services/blogs"

export const createBlog = async (formData: FormData) => {
  const title = formData.get("title") as string
  const author = formData.get("author") as string
  const url = formData.get("url") as string
  const likes = Number(formData.get("likes"))
  addBlog(title, author, url, likes)
  revalidatePath("/blogs")
  redirect("/blogs")
}

export const likeBlog = async (formData: FormData) => {
  // console.log("likeBlog - formData: ", formData)
  const id = Number(formData.get("id"))
  // console.log("likeBlog - id: ", id)
  like(id)
  revalidatePath(`/blogs/${id}`)
  revalidatePath("/blogs")
  redirect(`/blogs/${id}`)
}

export const filterBlogs = async (formData: FormData) => {
  const filter = formData.get("filter")
  redirect(`/blogs?filter=${filter}`)
}
