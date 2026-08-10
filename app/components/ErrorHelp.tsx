type ErrorHelpProps = {
    message: string
}

const ErrorHelp = (props: ErrorHelpProps) => {
  return (
    <div className="text-red-400">{props.message}</div>
  )
}

export default ErrorHelp