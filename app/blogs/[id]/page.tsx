import { notFound } from "next/navigation"
import { getBlogById } from "@/app/services/blogs"
import { likeBlog } from "@/app/actions/blogs"
import SubmitButton from "@/app/components/SubmitButton"

const BlogPage = async ({params,}: {params: Promise<{id: string}>}) => {
    const {id} = await params
    const blog = await getBlogById(Number(id))
    if (!blog) notFound()
    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">{blog.title}</h2>
            <p>Author: {" "}{blog.author}</p>
            <p>URL:{" "}<a href={blog.url} className="text-blue-600 hover:underline">{blog.url}</a></p>
            {blog.likes > 0 ? (<p>Likes: {" "}{blog.likes}</p>) : (null)}
            <div>
                <form action={likeBlog}>
                    <input type="hidden" name="id" value={blog.id}/>
                    <SubmitButton text="Like" />
                </form>
            </div>
        </div>
    )

}

export default BlogPage