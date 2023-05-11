import { Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getSentences } from "../../../../store/actions/actionCreators";

import TableRowDefault from "../table-row-default/TableRowDefault";
import TableRowActive from "../table-row-active/TableRowActive";
import Loading from "../../../../components/loading/Loading";
import "./Table.scss";


const Table = () => {

    const dispatch: Dispatch<any> = useDispatch();

    const { isLoading, sentences, activeIndex } = useSelector((state: any) => state.sentences);

    useEffect(() => {
        dispatch(getSentences());
    }, [])


    if (isLoading) return <div className="loading"> <Loading /> </div>;

    return (
        <div className="table">
            {
                sentences?.map((item: any, i: number) => {
                    if (activeIndex === i) {
                        return <TableRowActive
                            key={i}
                            sourceLang={item.sourceLang}
                            sourceText={item.sourceText}
                            targetLang={item.targetLang}
                            targetText={item.targetText}
                            index={i}
                        />
                    }

                    return <TableRowDefault
                        key={i}
                        sourceText={item.sourceText}
                        targetText={item.targetText}
                        i={i}
                    />
                })
            }
        </div>
    )
}

export default Table