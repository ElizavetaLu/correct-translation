import { Dispatch, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSentences } from "../../../../store/actions/actionCreators";

import Loading from "../../../../components/loading/Loading";
import TableRowDefault from "./TableRowDefault";
import TableRowActive from "./TableRowActive";
import "./Table.scss";


const Table = () => {

    const dispatch: Dispatch<any> = useDispatch();

    const { isLoading, totalPages, searchTerm, sourceLang, targetLang, sentences, activeItemId } = useSelector((state: any) => state.sentences);

    const [page, setPage] = useState<number>(1);


    const handleScroll = (e: any) => {
        if (isLoading) return;

        const { scrollHeight, scrollTop, clientHeight } = e.target.documentElement;

        if (scrollHeight - scrollTop === clientHeight) {
            setPage(prev => prev + 1);
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [])


    useEffect(() => {
        if (totalPages !== 0 && totalPages < page) return;

        dispatch(getSentences(page === 1, {
            pageNumber: page,
            sourceLang: sourceLang.code,
            targetLang: targetLang.code,
            searchTerm
        }))

    }, [page])



    if (totalPages === 1 && !sentences.length) {
        return <p className="empty-list"> No data was found </p>;
    };

    if (isLoading && !sentences.length) {
        return <div className="loading"> <Loading /> </div>;
    };

    return (
        <div className="table">

            {
                sentences?.map((item: any, i: number) => {

                    if (activeItemId === item._id) {
                        return <TableRowActive
                            key={i}
                            id={item._id}
                            sourceLang={item.sourceLang}
                            sourceText={item.sourceText}
                            targetLang={item.targetLang}
                            targetText={item.targetText}
                        />
                    }

                    return <TableRowDefault
                        key={i}
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