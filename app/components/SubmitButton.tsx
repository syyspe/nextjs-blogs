type SubmittButtonProps = {
    text: string,
}

const SubmitButton = (props: SubmittButtonProps) => {
    return (
        <button type="submit" className="border rounded px-3 mt-4 text-white bg-blue-800 hover:bg-blue-600">{props.text}</button>
    )
}

export default SubmitButton