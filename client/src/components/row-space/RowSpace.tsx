import { ReactNode } from "react";
import "./RowSpace.scss";

type TRowSpace = {
    children?: ReactNode
}

//space to save tables textarea & blocks size
const RowSpace = ({ children }: TRowSpace) => {
    
    return <div className="row-space">{children}</div>
}

export default RowSpace