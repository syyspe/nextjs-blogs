"use client"

import { useActionState } from "react"
import { registerUser } from "../actions/users"
import LabeledTextInput from "../components/LabeledTextInput"
import ErrorHelp from "../components/ErrorHelp"
import SubmitButton from "../components/SubmitButton"

const RegisterPage = () => {
  const [state, formAction] = useActionState(registerUser, { 
    error: {}, 
    values: {username: "", name: "", password: "", passwordConfirm: ""} 
  })
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form action={formAction}>
        <LabeledTextInput label="Username" name="username" default={state.values.username} />
        {state.error?.username && <ErrorHelp message={state.error.username} testId="username-error" />}
        <LabeledTextInput label="Name" name="name" default={state.values.name} />
        {state.error?.name && <ErrorHelp message={state.error.username} />}
        <LabeledTextInput type="password" label="Password" name="password" default={state.values.password} /> 
        {state.error?.passwordLength && <ErrorHelp message={state.error.passwordLength} />}
        <LabeledTextInput type="password" label="Confirm Password" name="passwordConfirm" default={state.values.passwordConfirm} />
        {state.error?.passwordMatch && <ErrorHelp message={state.error.passwordMatch} testId="passwordConfirm-error"/>}
        <SubmitButton text="Register" testId="register-button"/>
      </form>
    </div>
  )
}

export default RegisterPage