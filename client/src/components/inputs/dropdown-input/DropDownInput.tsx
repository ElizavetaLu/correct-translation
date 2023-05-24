import { ILanguage, ILanguageDDInputProps } from "../../../intefaces/intefaces";
import useToggle from "../../../hooks/useToggle";
import { languages } from "../../../languages";
import "./DropDownInput.scss";



const DropDownInput = ({ value, setValue, action }: ILanguageDDInputProps) => {

    const [isOpen, toggle] = useToggle();

    const filteredLanguages = languages.filter((item: ILanguage) => {
        if (item.name.toLocaleLowerCase().includes(value.name.toLocaleLowerCase()))
            return item;
    })

    return (
        <div className="dropdown-search">
            <input
                type="text"
                className="dropdown-search__input"
                value={value.name}
                onChange={e => {
                    if (!isOpen) toggle();
                    setValue({ ...value, name: e.target.value })
                }}
                onFocus={toggle}
            />
            <div className="dropdown-search__button" onClick={toggle}></div>

            {
                isOpen && <ul className="dropdown-search__list">
                    {
                        filteredLanguages.map(item => {
                            return (
                                <li
                                    key={item.name}
                                    className="dropdown-search__list-item"
                                    onClick={() => {
                                        toggle();
                                        setValue(item);
                                        action(item);
                                    }}
                                >{item.name}</li>
                            )
                        })
                    }
                </ul>
            }
        </div>
    )
}

export default DropDownInput 