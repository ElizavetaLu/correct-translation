import { Dispatch, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBrandNewSentence } from "../../../../store/actions/actionCreators";

import RowSpace from "../../../../components/row-space/RowSpace";
import Input from "../../../../components/inputs/input/Input";
import Cross from "../../../../components/cross-btn/Cross";
import "./AddSentence.scss";



const AddSentence = () => {

    const dispatch: Dispatch<any> = useDispatch();

    const { sourceLang, targetLang } = useSelector((state: any) => state.sentences);


    // brand new author's sentences
    const [sourceText, setSourceText] = useState<string>('');
    const [targetText, setTargetText] = useState<string>('');


    const onAddNewSentences = () => {
        if (!sourceText.trim() || !targetText.trim()) return

        const newSentences = {
            sourceLang: sourceLang.code,
            sourceText,
            targetLang: targetLang.code,
            targetText
        };

        dispatch(addBrandNewSentence(newSentences));

        setSourceText('');
        setTargetText('');
    }

    return (
        <div className="add-sentence">
            <Input value={sourceText} setValue={setSourceText} />
            <Input value={targetText} setValue={setTargetText} />

            <RowSpace>
                <div className="add-sentence__button-container" onClick={onAddNewSentences}>
                    <Cross defaultWhite />
                </div>
            </RowSpace>
        </div>
    )
}

export default AddSentence