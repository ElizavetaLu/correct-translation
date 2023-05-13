import { ILanguage, ILanguageDDInputProps } from "../../../intefaces/intefaces";
import useToggle from "../../../hooks/useToggle";
import { languages } from "../../../languages";
import "./TinyDDInput.scss";

 

const TinyDDInput = ({ value, setValue }: ILanguageDDInputProps) => {

    const [isOpen, toggle] = useToggle();

    const filteredLanguages = languages.filter((item: ILanguage) => {
        if (item.code.toLocaleLowerCase().includes(value.toLocaleLowerCase()))
            return item
    })


    return (
        <div className="tiny-dropdown">
            <input
                type="text"
                className="tiny-dropdown__input"
                value={value}
                onChange={e => setValue(e.target.value)}
            />
            <div className="tiny-dropdown__button" onClick={toggle}></div>


            {isOpen && <ul className="tiny-dropdown__list">
                {
                    filteredLanguages.map(items => (
                        <li
                            key={items.code}
                            className="tiny-dropdown__list-item"
                            onClick={() => {
                                setValue(items.code);
                                toggle();
                            }}
                        >
                            {items.code}
                        </li>)
                    )
                }
            </ul>}
        </div>
    )
}

export default TinyDDInput