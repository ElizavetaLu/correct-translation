import { useState } from "react";
import useToggle from "../../../hooks/useToggle";
import { languages } from "../../../languages";
import "./TinyDDInput.scss";


interface ITinyDDInput {
    lang: string,
    setLang: (val: string) => void
}


const TinyDDInput = ({ lang, setLang }: ITinyDDInput) => {

    const [isOpen, toggle] = useToggle();
    const [value, setValue] = useState<string>(lang);

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
                    languages.map(items => (
                        <li
                            key={items.code}
                            className="tiny-dropdown__list-item"
                            onClick={() => {
                                setValue(items.code);
                                setLang(items.code);
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