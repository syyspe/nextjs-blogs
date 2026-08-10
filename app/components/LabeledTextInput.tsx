type LabeledTextInputProps = {
  type?: string,
  label: string,
  name: string,
  default: string,
}

const LabeledTextInput = (props: LabeledTextInputProps) => {
  return (
    <div className="grid grid-cols-1 gap-x-1 gap-y-0.5">
      <div className="sm:col-span-4">
        <div className="mt-2">
          <div className="flex items-center">
            <label className="block font-semibold text-gray-600">
              {props.label}
              <input 
                type={props.type ? props.type : "text"} 
                name={props.name} 
                defaultValue={props.default} 
                className="block border rounded pl-1 bg-white text-base font-normal text-gray-900" />
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LabeledTextInput