"use client"

import { useActionState } from "react"
import { registerUser } from "../actions/users"

const RegisterPage = () => {
  const [state, formAction] = useActionState(registerUser, { 
    error: {}, 
    values: {username: "", name: "", password: "", passwordConfirm: ""} 
  })
  return (
    <div>
      <h2>Register</h2>
      <form action={formAction}>
        <div>
          <label>
            Username
            <input type="text" name="username" required defaultValue={state.values.username} />
          </label>
          {state.error?.username && <div style={{ color: "red" }}>{state.error.username}</div>}
        </div>
        <div>
          <label>
            Name
            <input type="text" name="name" required defaultValue={state.values.name} />
          </label>
        </div>
        <div>
          <label>
            Password
            <input type="password" name="password" required defaultValue={state.values.password} />
          </label>
          {state.error?.passwordLength && <div style={{ color: "red" }}>{state.error.passwordLength}</div>}
        </div>
        <div>
          <label>
            Confirm Password
            <input type="password" name="passwordConfirm" required defaultValue={state.values.passwordConfirm}/>
          </label>
          {state.error?.passwordMatch && <div style={{ color: "red" }}>{state.error.passwordMatch}</div>}
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default RegisterPage