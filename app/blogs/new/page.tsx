"use client"

import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createBlog } from "@/app/actions/blogs"
import { useNotification } from "@/app/components/NotificationContext"
import LabeledTextInput from "@/app/components/LabeledTextInput"
import ErrorHelp from "@/app/components/ErrorHelp"
import SubmitButton from "@/app/components/SubmitButton"

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, {
    error: {},
    success: false,
    values: { title: "", author: "", url: "" },
  })
  const { showNotification } = useNotification()
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      showNotification("Blog created", "success")
      router.push("/blogs")
    }
  }, [state, showNotification, router])

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Create a new blog</h2>
      <form action={formAction}>
        <LabeledTextInput label="Title" name="title" default={state.values?.title} />
        {state.error?.title && <ErrorHelp message={state.error.title} />}
        <LabeledTextInput label="Author" name="author" default={state.values?.author} />
        {state.error?.author && <ErrorHelp message={state.error.author} />}
        <LabeledTextInput label="URL" name="url" default={state.values?.url} />
        {state.error?.url && <ErrorHelp message={state.error.url} />}
        <SubmitButton text="Create" testId="create-blog-button"/>
      </form>
    </div>
  )
}

export default NewBlog