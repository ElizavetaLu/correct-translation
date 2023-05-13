import { ILanguage, ILanguageDDInputProps } from "../../../intefaces/intefaces";
import useToggle from "../../../hooks/useToggle";
import { languages } from "../../../languages";
import "./DropDownInput.scss";


 
const DropDownInput = ({ value, setValue }: ILanguageDDInputProps) => {

    const [isOpen, toggle] = useToggle();

    const filteredLanguages = languages.filter((item: ILanguage) => {
        if (item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()))
            return item
    })

    return (
        <div className="dropdown-search">
            <input
                type="text"
                className="dropdown-search__input"
                value={value}
                onChange={e => setValue(e.target.value)}
                onFocus={toggle}
            />
            <div className="dropdown-search__button" onClick={toggle}></div>
            {isOpen && <ul className="dropdown-search__list">
                {filteredLanguages.map(item => <li
                    key={item.name}
                    className="dropdown-search__list-item"
                    onClick={() => {
                        setValue(item.name);
                        toggle();
                    }}
                >{item.name}</li>)}
            </ul>}
        </div>
    )
}

export default DropDownInput 