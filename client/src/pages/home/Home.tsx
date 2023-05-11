import { SyntheticEvent, useState } from "react";

import DropDownInput from "../../components/inputs/dropdown-input/DropDownInput";
import Table from "./components/sentences-table/Table";
import Input from "../../components/inputs/input/Input";
import "./Home.scss";

const Home = () => {

    const onSearchSubmit = (e: SyntheticEvent) => {
        e.preventDefault()
    }

    const [sourceLang, setSourceLang] = useState<string>('')
    const [targetLang, setTargetLang] = useState<string>('')

    return (
        <main className="main">
            <form className="search" onSubmit={onSearchSubmit}>
                <input type="text" className="search__input" placeholder="Search" />
                <button type="submit" className="search__button">
                    <img src="/images/icons/search.png" alt="search" className="search__icon" />
                </button>
            </form>

            <div className="select-language">
                <DropDownInput value={sourceLang} setValue={setSourceLang} />
                <img src="/images/icons/arrows.svg" alt="swap-arrows" className="select-language__button" />
                <DropDownInput value={targetLang} setValue={setTargetLang} />
            </div>

            <div className="add-sentence">
                <Input />
                <Input />
                <div className="add-sentence__button-container">
                    <img src="/images/icons/cancel.png" alt="add" className="add-sentence__button" />
                </div>
            </div>

            <div className="sentences">
                <Table />
            </div>
        </main>
    )
}

export default Home