import { notFound } from "next/navigation"
import { getBlogById } from "@/app/services/blogs"

const BlogPage = async ({params,}: {params: Promise<{id: string}>}) => {
    const {id} = await params
    console.log(id)
    const blog = getBlogById(Number(id))
    if (!blog) notFound()
    return (
        <div>
            <h2>{blog.title}</h2>
            <p>Author: {" "}{blog.author}</p>
            <p>URL:{" "}<a href={blog.url}>{blog.url}</a></p>
            {blog.likes > 0 ? (<p>Likes: {" "}{blog.likes}</p>) : (null)}
        </div>
    )

}

export default BlogPage