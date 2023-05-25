import { Dispatch, useState } from "react";
import { useDispatch } from "react-redux";

import { setActiveIndex, setCorrectedSentence } from "../../../../store/actions/actionCreators";
import { ISentencesDataWithId } from "../../../../intefaces/intefaces";

import TinyDDInput from "../../../../components/inputs/tiny-dropdown-input/TinyDDInput";
import RowSpace from "../../../../components/row-space/RowSpace";
import Cross from "../../../../components/cross-btn/Cross";




const TableRowActive = ({ id, sourceLang, sourceText, targetLang, targetText }: ISentencesDataWithId) => {

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
            targetText: newTargetText,
            id
        };

        dispatch(setCorrectedSentence(correctedSentence));
        dispatch(setActiveIndex(null));
    }


    return (
        <div className="row">

            <div className="row__item-active">
                <textarea
                    className="row__textarea"
                    value={newSourceText}
                    onChange={e => setNewSourceText(e.target.value)}
                ></textarea>

                <div className="row__select-lang">
                    <TinyDDInput value={newSourceLang} setValue={setNewSourceLang} />
                </div>
            </div>

            <div className="row__item-active">
                <textarea
                    className="row__textarea"
                    value={newTargetText}
                    onChange={e => setNewTargetText(e.target.value)}
                ></textarea>

                <div className="row__select-lang">
                    <TinyDDInput value={newTargetLang} setValue={setNewTargetLang} />
                </div>
            </div>

            <RowSpace>
                <div className="row__buttons">
                    <div className="row__button-container" onClick={onSave} >
                        <div className="row__save"></div>
                    </div>
                    <div className="row__button-container" onClick={() => dispatch(setActiveIndex(null))}>
                        <Cross defaultWhite />
                    </div>
                </div>
            </RowSpace>

        </div>
    )
}

export default TableRowActive