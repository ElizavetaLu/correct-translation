import { Link } from "react-router-dom";
import "./NoMatch.scss";

const NoMatch = () => {

    return (
        <div className="no-match">
            <div className="no-match__info">
                <h1 className="no-match__code">4 0 4</h1>
                <span className="no-match__text">Sorry, We couldn't find what you are looking for!</span>
            </div>
            <Link to='/' className="no-match__link">Go Home</Link>
        </div>
    )
}

export default NoMatch