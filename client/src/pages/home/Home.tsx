import { Dispatch, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { addBrandNewSentence, getSentences, setPopupMessage, setSourceLang, setTargetLang, showPopup } from "../../store/actions/actionCreators";
import { ILanguage } from "../../intefaces/intefaces";

import DropDownInput from "../../components/inputs/dropdown-input/DropDownInput";
import SearchSentence from "./components/search-sentence/SearchSentence";
import RowSpace from "../../components/row-space/RowSpace";
import Input from "../../components/inputs/input/Input";
import Cross from "../../components/cross-btn/Cross";
import Popup from "../../components/popup/Popup"; 
import Table from "./components/table/Table";
import "./Home.scss";


const Home = () => {

    const dispatch: Dispatch<any> = useDispatch();

    const { sourceLang, targetLang } = useSelector((state: any) => state.sentences);


    const [currentSourceLang, setCurrentSourceLang] = useState<ILanguage>(sourceLang);
    const [currentTargetLang, setCurrentTargetLang] = useState<ILanguage>(targetLang);


    // brand new author's sentences
    const [authorSourceText, setAuthorSourceText] = useState<string>('');
    const [authorTargetText, setAuthorTargetText] = useState<string>('');

    const onAddNewSentences = () => {
        if (!authorSourceText.trim() || !authorTargetText.trim()) return

        const newSentences = {
            sourceLang: currentSourceLang.code,
            sourceText: authorSourceText,
            targetLang: currentTargetLang.code,
            targetText: authorTargetText
        };

        dispatch(addBrandNewSentence(newSentences));

        setAuthorSourceText('');
        setAuthorTargetText('');
    }


    const onReverse = () => {

        dispatch(getSentences(true,
            {
                pageNumber: 1,
                sourceLang: currentTargetLang.code,
                targetLang: currentSourceLang.code
            }
        ));

        setCurrentSourceLang(currentTargetLang);
        setCurrentTargetLang(currentSourceLang);

        dispatch(setSourceLang(currentSourceLang));
        dispatch(setTargetLang(currentTargetLang));
    }


    const onSourceLangSelect = (code: string) => {
        dispatch(getSentences(true, { pageNumber: 1, sourceLang: code, targetLang: currentTargetLang.code }))
    }

    const onTargetLangSelect = (code: string) => {
        dispatch(getSentences(true, { pageNumber: 1, sourceLang: currentSourceLang.code, targetLang: code }))
    }


 
    const { isShown, message } = useSelector((state: any) => state.popup)

    useEffect(() => {
        if (isShown) {
            setTimeout(() => {
                dispatch(showPopup());
                dispatch(setPopupMessage(''));
            }, 4000)
        }
    }, [isShown])


    return (
        <main className="main">
            <Popup isShown={isShown} message={message} toggle={() => dispatch(showPopup())} />
            <SearchSentence />

            <div className="select-language">
                <div className="select-language__inputs">
                    <DropDownInput
                        value={currentSourceLang}
                        setValue={setCurrentSourceLang}
                        action={onSourceLangSelect}
                    />
                    <img
                        src="/images/icons/arrows.png"
                        alt="swap-arrows"
                        className="select-language__button"
                        onClick={onReverse}
                    />
                    <DropDownInput
                        value={currentTargetLang}
                        setValue={setCurrentTargetLang}
                        action={onTargetLangSelect}
                    />
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
                <Table />
            </div>
        </main>
    )
}

export default Home