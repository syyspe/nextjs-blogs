type SubmittButtonProps = {
    text: string,
}

const SubmitButton = (props: SubmittButtonProps) => {
    return (
        <button type="submit" className="border rounded px-3 mt-4 hover:bg-gray-200">{props.text}</button>
    )
}

export default SubmitButton