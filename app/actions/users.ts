"use server"

import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"
import { NeonDbError } from "@neondatabase/serverless"
import { db } from "../../db"
import { users } from "../../db/schema"
import { validateInputLength } from "../helpers"

export const registerUser = async (prevState: {error: object, values: object}, formData: FormData) => {
  const username = (formData.get("username") as string)?.trim()
  const name = (formData.get("name") as string)?.trim()
  const password = formData.get("password") as string
  const passwordConfirm = formData.get("passwordConfirm") as string


  let errors: Record<string, string> = {}
  errors.username = validateInputLength("Username", username, 4)
  errors.passwordLength = validateInputLength("Password", password, 4)
  errors.passwordMatch = password !== passwordConfirm ? "Passwords do not match" : ""

  const passwordHash = await bcrypt.hash(password, 10)
  try {
    await db.insert(users).values({ username, name, passwordHash })
  } catch(err) {
    if (err instanceof Error && err.cause instanceof NeonDbError && err.cause.code === "23505") {
      errors.username = "Username already exists"
    } else {
      errors.dbError = err instanceof Error ? err.message : String(err)
    }
  }

  if (Object.values(errors).some(v => v)) {
    return {error: errors, values: {username, name, password, passwordConfirm}}
  }

  redirect("/login")
}