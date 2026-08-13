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
  const unreadEmpty = (!userUnreadList || userUnreadList?.length === 0)
  const readEmpty = (!userReadList || userReadList?.length === 0) 
  const emptyList = unreadEmpty && readEmpty 

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4" data-testid="user-profile">My Profile</h2>
      <p data-testid="user-name"><strong>Name: </strong>{user.name}</p>
      <p data-testid="user-username"><strong>Username: </strong>{user.username}</p>
      <div className="border-t border-gray-800 my-4"></div>
      <h2 className="text-2xl font-bold mb-4">Reading List</h2>
      {emptyList && (<p data-testid="empty-reading-list">Empty reading list</p>)}
      <div data-testid="reading-list-section">
        <p><strong>{`Unread (${userUnreadList?.length || 0})`}</strong></p>
        <ul className="mt-0" data-testid="unread-section">
          {unreadEmpty && (<p data-testid="no-unread-blogs">No unread blogs</p>)}
          {userUnreadList?.map(item => (
            <li key={item.id} className="ml-2">
              <div className="flex items-center gap-2">
                <Link href={`/blogs/${item.blog.id}`} className="text-blue-600 hover:underline">{item.blog.title}</Link>
                <form action={markRead}>
                  <input type="hidden" name="blogId" value={item.blog.id} />
                  <SubmitButton text="mark as read" testId="mark-read-button" />
                </form>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-4"><strong>{`Read (${userReadList?.length || 0})`}</strong></p>
        <ul className="mt-0" data-testid="read-section">
          {readEmpty && (<p data-testid="no-read-blogs">No read blogs</p>)}
          {userReadList?.map(item => (
            <li key={item.id} className="ml-2">
              <div className="flex items-center gap-2">
                <Link href={`/blogs/${item.blog.id}`} className="text-blue-600 hover:underline">{item.blog.title}</Link>
                <form action={markRead}>
                  <input type="hidden" name="blogId" value={item.blog.id} />
                  <input type="hidden" name="isRead" value="false" />
                  <SubmitButton text="mark as unread" testId="mark-unread-button" />
                </form>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-gray-800 my-4"></div>
      <h2 className="text-2xl font-bold mb-4" data-testid="api-token-section">API Token</h2>
      <p className="border rounded bg-gray-200 p-2">Current token:</p>
      <div className="border rounded font-semibold bg-gray-200 p-2" data-testid="token-display">
        {user.token ? (<div data-testid="api-token">
          {user.token}
        </div>) : (<div data-testid="no-token-message">"No token generated yet"</div>)
        }
        
      </div>
      <form action={generateToken} className="mt-4">
        <SubmitButton text="Generate new token" testId="generate-token-button" />
      </form>
    </div>
  )
}

export default UserProfile
