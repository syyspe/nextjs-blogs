import { redirect, } from "next/navigation"
import Link from "next/link"
import { getCurrentUser } from "../services/session"
import { getUsersReadingList } from "../services/users"
import { markRead } from "../actions/blogs"
import { generateToken } from "../actions/users"
import SubmitButton from "../components/SubmitButton"

const UserProfile = async () => {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  const userUnreadList = await getUsersReadingList(user.id, false)
  const userReadList = await getUsersReadingList(user.id, true)

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <p><strong>Name: </strong>{user.name}</p>
      <p><strong>Username: </strong>{user.username}</p>
      <div className="border-t border-gray-800 my-4"></div>
      <h2 className="text-2xl font-bold mb-4">Reading List</h2>
      <p><strong>{`Unread (${userUnreadList?.length || 0})`}</strong></p>
      <ul className="mt-0">
        {userUnreadList?.map(item => (
          <li key={item.id} className="ml-2">
            <div className="flex items-center gap-2">
              <Link href={`/blogs/${item.blog.id}`} className="text-blue-600 hover:underline">{item.blog.title}</Link>
              <form action={markRead}>
                <input type="hidden" name="blogId" value={item.blog.id} />
                <SubmitButton text="mark as read" />
              </form>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-4"><strong>{`Read (${userReadList?.length || 0})`}</strong></p>
      <ul className="mt-0">
        {userReadList?.map(item => (
          <li key={item.id} className="ml-2">
            <div className="flex items-center gap-2">
              <Link href={`/blogs/${item.blog.id}`} className="text-blue-600 hover:underline">{item.blog.title}</Link>
              <form action={markRead}>
                <input type="hidden" name="blogId" value={item.blog.id} />
                <input type="hidden" name="isRead" value="false" />
                <SubmitButton text="mark as unread" />
              </form>
            </div>
          </li>
        ))}
      </ul>
      <div className="border-t border-gray-800 my-4"></div>
      <h2 className="text-2xl font-bold mb-4">API Token</h2>
      <p className="border rounded bg-gray-200 p-2">Current token:</p>
      <p className="border rounded font-semibold bg-gray-200 p-2">{user.token || "No token generated yet"}</p>
      <form action={generateToken} className="mt-4">
        <SubmitButton text="Generate new token" />
      </form>
    </div>
  )
}

export default UserProfile
