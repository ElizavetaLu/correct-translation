import { Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getSentences } from "../../../../store/actions/actionCreators";
import { ReceivedSentencesData } from "../../../../intefaces/intefaces";

import TableRowDefault from "../table-row-default/TableRowDefault";
import TableRowActive from "../table-row-active/TableRowActive";
import Loading from "../../../../components/loading/Loading";
import "./Table.scss";


type TTable = { searchTerm: string }

const Table = ({ searchTerm }: TTable) => {

    const dispatch: Dispatch<any> = useDispatch();

    useEffect(() => {
        dispatch(getSentences());
    }, [])


    const { isLoading, sentences, activeItemId } = useSelector((state: any) => state.sentences);
    
    const sentencesCopy = () => {
        const copy = sentences && [...sentences];

        if (copy && searchTerm) {
            const matchList = copy.filter((item: ReceivedSentencesData) => {
                const sourceTextToLowerCase = item.sourceText.toLowerCase();
                const targetTextToLowerCase = item.targetText.toLowerCase();
                const searchTermToLowerCase = searchTerm.toLowerCase();

                if (sourceTextToLowerCase.includes(searchTermToLowerCase) || targetTextToLowerCase.includes(searchTermToLowerCase)) {
                    return item
                }
            })

            return matchList
        }

        return copy
    }


    if (isLoading) return <div className="loading"> <Loading /> </div>;

    return (
        <div className="table">
            {
                sentencesCopy()?.map((item: any) => {

                    if (activeItemId === item._id) {
                        return <TableRowActive
                            key={item._id}
                            id={item._id}
                            sourceLang={item.sourceLang}
                            sourceText={item.sourceText}
                            targetLang={item.targetLang}
                            targetText={item.targetText}
                        />
                    }

                    return <TableRowDefault
                        key={item._id}
                        id={item._id}
                        sourceText={item.sourceText}
                        targetText={item.targetText}
                    />
                })
            }
        </div>
    )
}

export default Table