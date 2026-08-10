"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import LabeledTextInput from "../components/LabeledTextInput"
import ErrorHelp from "../components/ErrorHelp"
import SubmitButton from "../components/SubmitButton"

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const result = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    })

    if (result?.error) {
      setError("Invalid username or password")
    } else {
      router.push("/")
      router.refresh()
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <ErrorHelp message={error} />}
      <form onSubmit={handleSubmit}>
        <LabeledTextInput label="Username" name="username" default="" />
        <LabeledTextInput type="password" label="Password" name="password" default="" />
        <SubmitButton text="Login" />
      </form>
    </div>
  )
}