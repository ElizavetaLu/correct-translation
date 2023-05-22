import { ICross } from "../../intefaces/intefaces";
import "./Cross.scss";

const Cross = ({ action, primary, defaultWhite, error }: ICross) => {

    const classname = primary ? 'primary' : defaultWhite ? 'default' : error ? 'error' : '';

    return <div className={`cross cross--${classname}`} onClick={action}  ></div>
}

export default Cross 