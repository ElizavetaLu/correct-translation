import { useDispatch } from "react-redux";

import { setAuthError } from "../../../store/actions/actionCreators";
import { InputProps } from "../../../intefaces/intefaces";

import Cross from "../../cross-btn/Cross";
import "./InputWithLabel.scss";


const InputWithLabel = ({ type, name, label, value, onChange, error, resetError }: InputProps) => {

    const dispatch = useDispatch();

    return (
        <div className='field'>
            <label className="field__label" htmlFor={name}>{label}</label>

            <div className="field__input-container">
                <input
                    placeholder=" "
                    className={`field__input ${error && 'field__input--invalid'}`}
                    type={type}
                    name={name}
                    value={value}
                    onChange={e => {
                        if (error) resetError('');
                        if (error === 'Invalid login credentials') dispatch(setAuthError(''));

                        onChange(e.target.value)
                    }}
                />

                <div className="field__clean">
                    {error
                        ? <Cross error action={() => onChange('')} />
                        : <Cross primary action={() => onChange('')} />
                    }
                </div>
            </div>
            {error && <span className="field__error-message">{error}</span>}
        </div>
    )
}

export default InputWithLabel