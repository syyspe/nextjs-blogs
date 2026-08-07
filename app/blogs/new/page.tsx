"use client"

import { useActionState } from "react"
import { createBlog } from "@/app/actions/blogs"

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, { error: {}, values: {title: "", author: "", url: ""} })
  return (
    <div>
      <h2>Create a new blog</h2>
      <form action={formAction}>
        <div>
          <label>
            Title
            <input type="text" name="title" required defaultValue={state.values?.title} />
          </label>
          {state.error?.title && <div style={{ color: "red" }}>{state.error.title}</div>}
        </div>
        <div>
          <label>
            Author
            <input type="text" name="author" required defaultValue={state.values?.author} />
          </label>
          {state.error?.author && <div style={{ color: "red" }}>{state.error.author}</div>}
        </div>
        <div>
          <label>
            URL
            <input type="text" name="url" required defaultValue={state.values?.url} />
          </label>
          {state.error?.url && <div style={{ color: "red" }}>{state.error.url}</div>}
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default NewBlog