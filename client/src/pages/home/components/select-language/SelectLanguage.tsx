import { Dispatch, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ILanguage } from "../../../../intefaces/intefaces";
import { getSentences, setSourceLang, setTargetLang } from "../../../../store/actions/actionCreators";

import DropDownInput from "../../../../components/inputs/dropdown-input/DropDownInput";
import RowSpace from "../../../../components/row-space/RowSpace";
import "./SelectLanguage.scss";



const SelectLanguage = () => {


    const { sourceLang, targetLang } = useSelector((state: any) => state.sentences);


    const [currentSourceLang, setCurrentSourceLang] = useState<ILanguage>(sourceLang);
    const [currentTargetLang, setCurrentTargetLang] = useState<ILanguage>(targetLang);


    const dispatch: Dispatch<any> = useDispatch();

    const onReverse = () => {
        dispatch(setSourceLang(targetLang));
        dispatch(setTargetLang(sourceLang));

        dispatch(getSentences(true,
            {
                pageNumber: 1,
                sourceLang: currentTargetLang.code,
                targetLang: currentSourceLang.code
            }
        ));

        setCurrentSourceLang(currentTargetLang);
        setCurrentTargetLang(currentSourceLang);
    }


    const onSourceLangSelect = (lang: ILanguage) => {

        dispatch(setSourceLang(lang)); 

        dispatch(getSentences(true, {
            pageNumber: 1,
            sourceLang: lang.code,
            targetLang: currentTargetLang.code
        }))
    }

    const onTargetLangSelect = (lang: ILanguage) => {
        
        dispatch(setTargetLang(lang)); 

        dispatch(getSentences(true, {
            pageNumber: 1,
            sourceLang: currentSourceLang.code,
            targetLang: lang.code
        }))
    }


    return (
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
    )
}

export default SelectLanguage