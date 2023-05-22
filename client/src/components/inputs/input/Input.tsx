import { IInput } from "../../../intefaces/intefaces";
import "./Input.scss";


const Input = ({ value, setValue }: IInput) => {

    return <input
        value={value}
        onChange={e => setValue(e.target.value)}
        type="text"
        className="input"
        placeholder="Enter sentence"
    />
}

export default Input