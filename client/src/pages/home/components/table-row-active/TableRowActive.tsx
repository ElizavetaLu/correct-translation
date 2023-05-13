import { Dispatch, useState } from "react";
import { useDispatch } from "react-redux";

import { setActiveIndex, setCorrectedSentence } from "../../../../store/actions/actionCreators";
import { SentencesData } from "../../../../intefaces/intefaces";

import TinyDDInput from "../../../../components/inputs/tiny-dropdown-input/TinyDDInput";
import Cross from "../../../../components/cross-btn/Cross";



interface ISentencesData extends SentencesData {
    id: string
}

const TableRowActive = ({ id, sourceLang, sourceText, targetLang, targetText }: ISentencesData) => {

    const dispatch: Dispatch<any> = useDispatch();

    const [newSourceText, setNewSourceText] = useState<string>(sourceText);
    const [newSourceLang, setNewSourceLang] = useState<string>(sourceLang);

    const [newTargetText, setNewTargetText] = useState<string>(targetText);
    const [newTargetLang, setNewTargetLang] = useState<string>(targetLang);


    const onSave = () => {
        const correctedSentence = {
            sourceLang: newSourceLang,
            sourceText: newSourceText,
            targetLang: newTargetLang,
            targetText: newTargetText
        };

        dispatch(setCorrectedSentence(correctedSentence, id));
        dispatch(setActiveIndex(null))
    }


    return (
        <div className="row">
            <div className="row__item-active">
                <textarea
                    value={newSourceText}
                    onChange={e => setNewSourceText(e.target.value)}
                    className="row__textarea"
                ></textarea>

                <div className="row__select-lang">
                    <TinyDDInput value={newSourceLang} setValue={setNewSourceLang} />
                </div>
            </div>
            <div className="row__item-active">
                <textarea
                    value={newTargetText}
                    onChange={e => setNewTargetText(e.target.value)}
                    className="row__textarea"
                ></textarea>

                <div className="row__select-lang">
                    <TinyDDInput value={newTargetLang} setValue={setNewTargetLang} />
                </div>
            </div>

            <div className="row__buttons">
                <div className="row__button-container" onClick={onSave} >
                    <div className="row__save"></div>
                </div>

                <div className="row__button-container" onClick={() => dispatch(setActiveIndex(null))}>
                    <Cross defaultWhite />
                </div>
            </div>

        </div>
    )
}

export default TableRowActive