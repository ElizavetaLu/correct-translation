import { InputProps } from "../../../intefaces/intefaces"
import "./InputWithLabel.scss"

const InputWithLabel = ({ type, name, label, value, onChange }: InputProps) => {

    return (
        <div className='field'>
            <label className="field__label" htmlFor={name}>{label}</label>
            <input
                className="field__input"
                type={type}
                name={name}
                value={value}
                onChange={e => onChange(e.target.value)}
            />
        </div>
    )
}

export default InputWithLabel