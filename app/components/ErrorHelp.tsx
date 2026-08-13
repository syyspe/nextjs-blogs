type ErrorHelpProps = {
    message: string,
    testId?: string,
}

const ErrorHelp = (props: ErrorHelpProps) => {
  return (
    <div data-testid={props.testId} className="text-red-400">{props.message}</div>
  )
}

export default ErrorHelp