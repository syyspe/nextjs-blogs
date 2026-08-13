import { notFound } from "next/navigation"
import { getBlogById, } from "@/app/services/blogs"
import { getCurrentUser } from "@/app/services/session"
import { likeBlog, addToReadingList } from "@/app/actions/blogs"
import SubmitButton from "@/app/components/SubmitButton"

const BlogPage = async ({ params, }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const user = await getCurrentUser()
  const blog = await getBlogById(Number(id))

  if (!blog) notFound()

  return (
    <div className="max-w-2xl mx-auto p-6" data-testid="blog-detail">
      <h2 className="text-2xl font-bold mb-4" data-testid="blog-title">{blog.title}</h2>
      <p data-testid="blog-author">Author: {" "}{blog.author}</p>
      <p>URL:{" "}<a href={blog.url} className="text-blue-600 hover:underline">{blog.url}</a></p>
      <p>Likes:{" "}{blog.likes}</p>
      <div className="flex items-center gap-2 mt-4">
        <form action={likeBlog}>
          <input type="hidden" name="id" value={blog.id} />
          <SubmitButton text="Like" />
        </form>
        <form action={addToReadingList}>
          <input type="hidden" name="id" value={blog.id} />
          {user && blog.userId !== user.id ? (<SubmitButton 
            text="Add to reading list" 
            testId="add-to-reading-list-button" />) : (null)}
        </form>
      </div>
    </div>
  )

}

export default BlogPage