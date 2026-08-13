import Link from "next/link"
import { getBlogs } from "../services/blogs"
import { filterBlogs } from "../actions/blogs"
import LabeledTextInput from "../components/LabeledTextInput"
import SubmitButton from "../components/SubmitButton"

const Blogs = async ( {searchParams,}: {searchParams: Promise<{filter: string}>} ) => {
  const { filter } = await searchParams
  const blogs = await getBlogs(filter)
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Blogs</h2>
      <div className="mb-4">
        <form action={filterBlogs}>
          <input type="text" name="filter" className="border rounded mr-2" data-testid="filter-input" />
          <button type="submit" className="border rounded px-3" data-testid="search-button">Search</button>
        </form>
      </div>
      <ul className="space-y-2" data-testid="blogs-list">
        {blogs.map(blog => (
          <li key={blog.id} className="border rounded p-3 hover:bg-gray-50">
            <Link href={`/blogs/${blog.id}`} className="text-blue-600 hover:underline">
              <strong>{blog.title}</strong>
            </Link>
            {` by: ${blog.author}`} <div>`${blog.likes} likes`</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default Blogs