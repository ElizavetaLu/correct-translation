import { Dispatch } from "react";
import { useDispatch } from "react-redux";

import { setActiveIndex } from "../../../../store/actions/actionCreators";


interface ITableRowDefault {
    sourceText: string,
    targetText: string,
    i: number
}

const TableRowDefault = ({ sourceText, targetText, i }: ITableRowDefault) => {

    const dispatch: Dispatch<any> = useDispatch();

    return (
        <div key={i} className="row">
            <div className="row__item" onClick={() => dispatch(setActiveIndex(i))}>{sourceText}</div>
            <div className="row__item" onClick={() => dispatch(setActiveIndex(i))}>{targetText}</div>
        </div>
    )
}

export default TableRowDefault