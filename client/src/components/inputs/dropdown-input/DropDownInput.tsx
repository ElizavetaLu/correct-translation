import useToggle from "../../../hooks/useToggle";
import { languages } from "../../../languages"
import "./DropDownInput.scss";


interface IDropDownInput {
    value: string,
    setValue: any
}

const DropDownInput = ({ value, setValue }: IDropDownInput) => {

    const [isOpen, toggle] = useToggle()

    return (
        <div className="dropdown-search">
            <input
                type="text"
                className="dropdown-search__input"
                value={value}
                onChange={e => setValue(e.target.value)}
            />
            <div className="dropdown-search__button" onClick={toggle}></div>
            {isOpen && <ul className="dropdown-search__list">
                {languages.map(item => <li
                    key={item.name}
                    className="dropdown-search__list-item"
                    onClick={()=>{
                        setValue(item.name);
                        toggle();
                    }}
                >{item.name}</li>)}
            </ul>}
        </div>
    )
}

export default DropDownInput 