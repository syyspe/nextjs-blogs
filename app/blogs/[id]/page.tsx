import { notFound } from "next/navigation"
import { getBlogById } from "@/app/services/blogs"
import { likeBlog } from "@/app/actions/blogs"

const BlogPage = async ({params,}: {params: Promise<{id: string}>}) => {
    const {id} = await params
    const blog = getBlogById(Number(id))
    if (!blog) notFound()
    return (
        <div>
            <h2>{blog.title}</h2>
            <p>Author: {" "}{blog.author}</p>
            <p>URL:{" "}<a href={blog.url}>{blog.url}</a></p>
            {blog.likes > 0 ? (<p>Likes: {" "}{blog.likes}</p>) : (null)}
            <div>
                <form action={likeBlog}>
                    <input type="hidden" name="id" value={blog.id}/>
                    <button type="submit">Like</button>
                </form>
            </div>
        </div>
    )

}

export default BlogPage