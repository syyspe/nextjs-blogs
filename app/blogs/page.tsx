import { getBlogs } from "../services/blogs"

const Blogs = () => {
  const blogs = getBlogs()
  return (
    <div>
      <h2>Blogs</h2>
      <ul>
        {blogs.map(blog => (
          <li key={blog.id}>
            <a href={blog.url}><strong>{blog.title}</strong></a> by: {blog.author} {blog.likes && <div>Liked {blog.likes} times</div>}
          </li>
        ))}
      </ul>
    </div>
  )
}
export default Blogs