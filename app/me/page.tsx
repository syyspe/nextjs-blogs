import { redirect } from "next/navigation"
import { getCurrentUser } from "../services/session"
import { generateToken } from "../actions/users"
import SubmitButton from "../components/SubmitButton"

const UserProfile = async () => {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <p><strong>Name: </strong>{user.name}</p>
      <p><strong>Username: </strong>{user.username}</p>
      <div className="border-t border-gray-800 my-4"></div>
      <h2 className="text-2xl font-bold mb-4">API Token</h2>
      <p className="border rounded bg-gray-200 p-2">Current token:</p>
      <p className="border rounded font-semibold bg-gray-200 p-2">{user.token || "No token generated yet"}</p>
      <form action={generateToken}>
        <SubmitButton text="Generate new token" />
      </form>
    </div>
  )
}

export default UserProfile
