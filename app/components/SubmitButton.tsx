type SubmittButtonProps = {
    text: string,
    testId?: string,
}

const SubmitButton = (props: SubmittButtonProps) => {
    return (
        <button type="submit" data-testid={props.testId} className="border rounded px-3 text-white bg-blue-800 hover:bg-blue-600">{props.text}</button>
    )
}

export default SubmitButton