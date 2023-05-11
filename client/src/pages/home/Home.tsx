import { Dispatch, SyntheticEvent, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setCorrectedSentence } from "../../store/actions/actionCreators";
import { ILanguage } from "../../intefaces/intefaces";
import { languages } from "../../languages"

import DropDownInput from "../../components/inputs/dropdown-input/DropDownInput";
import Input from "../../components/inputs/input/Input";
import Table from "./components/table/Table";
import "./Home.scss";



const Home = () => {

    const dispatch: Dispatch<any> = useDispatch();

    const onSearchSubmit = (e: SyntheticEvent) => {
        e.preventDefault()
    }

    const { sentences } = useSelector((state: any) => state.sentences);

    const [newSourceLang, setNewSourceLang] = useState<ILanguage>(languages[0]);
    const [newTargetLang, setNewTargetLang] = useState<ILanguage>(languages[0]);

    //search language 'name' by it's code in languages and set it to dd-input value
    useEffect(() => {
        if (sentences) {
            for (let i = 0; i < languages.length; i++) {
                if (languages[i].code === sentences[0].sourceLang) setNewSourceLang(languages[i])
                if (languages[i].code === sentences[0].targetLang) setNewTargetLang(languages[i])
            }
        }
    }, [sentences])


    // brand new author's sentences
    const [authorSourceText, setAuthorSourceText] = useState<string>('')
    const [authorTargetText, setAuthorTargetText] = useState<string>('')

    const onAddNewSentences = () => {
        if (!authorSourceText.trim() || !authorTargetText.trim()) return

        const newSentences = {
            sourceLang: newSourceLang.code,
            sourceText: authorSourceText,
            targetLang: newTargetLang.code,
            targetText: authorTargetText
        };

        dispatch(setCorrectedSentence(newSentences, -1));

        setAuthorSourceText('');
        setAuthorTargetText('');
    }

    return (
        <main className="main">
            <form className="search" onSubmit={onSearchSubmit}>
                <input type="text" className="search__input" placeholder="Search" />
                <button type="submit" className="search__button">
                    <img src="/images/icons/search.png" alt="search" className="search__icon" />
                </button>
            </form>

            <div className="select-language">
                <DropDownInput value={newSourceLang.name} setValue={setNewSourceLang} />
                <img src="/images/icons/arrows.svg" alt="swap-arrows" className="select-language__button" />
                <DropDownInput value={newTargetLang.name} setValue={setNewTargetLang} />
            </div>

            <div className="add-sentence">
                <Input value={authorSourceText} setValue={setAuthorSourceText} />
                <Input value={authorTargetText} setValue={setAuthorTargetText} />
                <div className="add-sentence__button-container" onClick={onAddNewSentences}>
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