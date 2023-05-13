import { Dispatch } from "react";
import { useDispatch } from "react-redux";

import { setActiveIndex } from "../../../../store/actions/actionCreators";


interface ITableRowDefault {
    sourceText: string,
    targetText: string,
    id: string
}

const TableRowDefault = ({ id, sourceText, targetText }: ITableRowDefault) => {

    const dispatch: Dispatch<any> = useDispatch();

    return (
        <div className="row">
            <div className="row__item" onClick={() => dispatch(setActiveIndex(id))}>{sourceText}</div>
            <div className="row__item" onClick={() => dispatch(setActiveIndex(id))}>{targetText}</div>
        </div>
    )
}

export default TableRowDefault