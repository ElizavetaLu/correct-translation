import { InputProps } from "../../intefaces/intefaces";

const InputWithLabel = ({ type, name, label, value, onChange }: InputProps) => {

    return (
        <div className='flex flex-col w-full'>
            <label className="font-medium" htmlFor={name}>{label}</label>
            <input
                className='rounded-xl mt-2 py-3 px-2.5 box-border shadow-sm outline-none'
                type={type}
                name={name}
                value={value}
                onChange={e => onChange(e.target.value)}
            />
        </div>
    )
}

export default InputWithLabel 