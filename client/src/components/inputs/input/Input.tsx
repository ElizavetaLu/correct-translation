import { useState } from "react";
import "./Input.scss";

const Input = () => {

    const [value, setValue] = useState('')

    return <input
        value={value}
        onChange={e => setValue(e.target.value)}
        type="text"
        className="input"
        placeholder="Enter sentence"
    />
}

export default Input