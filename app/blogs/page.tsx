import Link from "next/link"
import { getBlogs } from "../services/blogs"
import { filterBlogs } from "../actions/blogs"

const Blogs = async ( {searchParams,}: {searchParams: Promise<{filter: string}>} ) => {
  const { filter } = await searchParams
  const blogs = await getBlogs(filter)
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Blogs</h2>
      <div className="mb-4">
        <form action={filterBlogs}>
          <input type="text" name="filter" className="border rounded mr-2" />
          <button type="submit" className="border rounded px-3">Search</button>
        </form>
      </div>
      <ul className="space-y-2">
        {blogs.map(blog => (
          <li key={blog.id} className="border rounded p-3 hover:bg-gray-50">
            <Link href={`/blogs/${blog.id}`} className="text-blue-600 hover:underline">
              <strong>{blog.title}</strong>
            </Link>
            {` by: ${blog.author}`} <div>Liked {" "}{blog.likes} times</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default Blogs