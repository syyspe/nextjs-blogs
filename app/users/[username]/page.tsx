import Link from "next/link"
import { notFound } from "next/navigation"
import { getUserWithBlogs } from "@/app/services/users"

const UserPage = async ({ params }: { params: Promise<{ username: string }> }) => {
  const { username } = await params
  const user = await getUserWithBlogs(username)
  if (!user) {
    notFound()
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">{`${user.name} (${user.username})`}</h2>
      <h3 className="font-semibold mb-1">Blogs</h3>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>
            <Link 
              href={`/blogs/${blog.id}`} 
              className="text-blue-600 hover:underline">
                {blog.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )

}

export default UserPage