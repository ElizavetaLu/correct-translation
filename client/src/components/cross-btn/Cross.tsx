import "./Cross.scss";

interface ICross {
    action?: any,
    primary?: boolean,
    defaultWhite?: boolean,
    error?: boolean
}

const Cross = ({ action, primary, defaultWhite, error }: ICross) => {

    const classname = primary ? 'primary' : defaultWhite ? 'default' : error ? 'error' : '';

    return <div className={`cross cross--${classname}`} onClick={action}  ></div>
}

export default Cross 