"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { addBlog, like, addBlogToReadingList, markBlogRead } from "../services/blogs"
import { auth } from "../auth"
import { validateInputLength } from "../helpers"

export const createBlog = async (prevState: {error: object, success: boolean, values: object}, formData: FormData) => {
  const session = await sessionOrLogin()
  
  const title = formData.get("title") as string
  const author = formData.get("author") as string
  const url = formData.get("url") as string
  const likes = Number(formData.get("likes"))

  let errors: Record<string, string> = {}
  errors.title = validateInputLength("Title", title, 5)
  errors.author = validateInputLength("Author", author, 5)
  errors.url = validateInputLength("URL", url, 5)
  
  if (Object.values(errors).some(v => v))  {
    return {error: errors, success: false, values: {title, author, url}}
  }

  await addBlog(title, author, url, likes)
  revalidatePath("/blogs")
  return {error: {}, success: true, values: {title,  author, url}}
  // redirect("/blogs")
}

export const likeBlog = async (formData: FormData) => {
  // console.log("likeBlog - formData: ", formData)
  const id = Number(formData.get("id"))
  // console.log("likeBlog - id: ", id)
  await like(id)
  revalidatePath(`/blogs/${id}`)
  revalidatePath("/blogs")
  redirect(`/blogs/${id}`)
}

export const filterBlogs = async (formData: FormData) => {
  const filter = formData.get("filter")
  redirect(`/blogs?filter=${filter}`)
}

export const addToReadingList = async (formData: FormData) => {
  await sessionOrLogin()
  const id = Number(formData.get("id"))
  await addBlogToReadingList(id)
  revalidatePath(`/blogs/${id}`)
}

export const markRead = async (formData: FormData) => {
  await sessionOrLogin()
  const blogId = Number(formData.get("blogId"))
  await markBlogRead(blogId)
}

const sessionOrLogin = async () => {
  const session = await auth()
  if (!session) {
    redirect("/login")
  }
  return session
}