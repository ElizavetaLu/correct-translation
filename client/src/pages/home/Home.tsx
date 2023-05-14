import { Dispatch, SyntheticEvent, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setCorrectedSentence } from "../../store/actions/actionCreators";
import { languages } from "../../languages";

import DropDownInput from "../../components/inputs/dropdown-input/DropDownInput";
import Input from "../../components/inputs/input/Input";
import Cross from "../../components/cross-btn/Cross";
import Table from "./components/table/Table";
import "./Home.scss";
import RowSpace from "../../components/row-space/RowSpace";



const Home = () => {

    const dispatch: Dispatch<any> = useDispatch();

    const [searchTerm, setSearchTerm] = useState<string>('');

    const onSearchSubmit = (e: SyntheticEvent) => {
        e.preventDefault()
    }

    const { sentences } = useSelector((state: any) => state.sentences);

    const [newSourceLang, setNewSourceLang] = useState<string>('');
    const [newTargetLang, setNewTargetLang] = useState<string>('');

    //search language 'name' by it's code in languages and set it to dd-input value
    useEffect(() => {
        if (sentences) {
            for (let i = 0; i < languages.length; i++) {
                if (languages[i].code === sentences[0].sourceLang) setNewSourceLang(languages[i].name)
                if (languages[i].code === sentences[0].targetLang) setNewTargetLang(languages[i].name)
            }
        }
    }, [sentences])


    // brand new author's sentences
    const [authorSourceText, setAuthorSourceText] = useState<string>('');
    const [authorTargetText, setAuthorTargetText] = useState<string>('');

    const onAddNewSentences = () => {
        if (!authorSourceText.trim() || !authorTargetText.trim()) return


        //get lang code by it's name
        let sourceLangCode = '';
        let targetLangCode = '';

        for (let i = 0; i < languages.length; i++) {
            if (languages[i].name === newSourceLang) sourceLangCode = languages[i].code;
            if (languages[i].name === newTargetLang) targetLangCode = languages[i].code;
        }


        const newSentences = {
            sourceLang: sourceLangCode,
            sourceText: authorSourceText,
            targetLang: targetLangCode,
            targetText: authorTargetText
        };

        dispatch(setCorrectedSentence(newSentences, null));

        setAuthorSourceText('');
        setAuthorTargetText('');
    }


    const onReverse = () => {
        setNewSourceLang(newTargetLang)
        setNewTargetLang(newSourceLang)
    }

    return (
        <main className="main">
            <form className="search" onSubmit={onSearchSubmit}>
                <input
                    type="text"
                    className="search__input"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <button type="submit" className="search__button">
                    <img src="/images/icons/search.png" alt="search" className="search__icon" />
                </button>
            </form>

            <div className="select-language">
                <div className="select-language__inputs">
                    <DropDownInput value={newSourceLang} setValue={setNewSourceLang} />
                    <img
                        src="/images/icons/arrows.png"
                        alt="swap-arrows"
                        className="select-language__button"
                        onClick={onReverse}
                    />
                    <DropDownInput value={newTargetLang} setValue={setNewTargetLang} />
                </div>
                <RowSpace />
            </div>

            <div className="add-sentence">
                <Input value={authorSourceText} setValue={setAuthorSourceText} />
                <Input value={authorTargetText} setValue={setAuthorTargetText} />
                <RowSpace>
                    <div className="add-sentence__button-container" onClick={onAddNewSentences}>
                        <Cross defaultWhite />
                    </div>
                </RowSpace>
            </div>

            <div className="sentences">
                <Table searchTerm={searchTerm} />
            </div>
        </main>
    )
}

export default Home