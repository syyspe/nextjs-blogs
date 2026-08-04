import Link from "next/link"
import { getBlogs } from "../services/blogs"
import { filterBlogs } from "../actions/blogs"

const Blogs = async ( {searchParams,}: {searchParams: Promise<{filter: string}>} ) => {
  const { filter } = await searchParams
  const allBlogs = getBlogs()
  const blogs = filter ? allBlogs.filter(value => value.title.toLowerCase().includes(filter.toLowerCase())) : allBlogs
  return (
    <div>
      <h2>Blogs</h2>
      <div>
        <form action={filterBlogs}>
          <input type="text" name="filter" />
          <button type="submit">Search</button>
        </form>
      </div>
      <ul>
        {blogs.map(blog => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>
              <strong>{blog.title}</strong>
            </Link>
            {` by: ${blog.author}`} {blog.likes && <div>Liked {" "}{blog.likes} times</div>}
          </li>
        ))}
      </ul>
    </div>
  )
}
export default Blogs