import { IPopup } from "../../intefaces/intefaces";
import "./Popup.scss";

const Popup = ({ isShown, message, toggle }: IPopup) => {

    return (
        <div className={`popup ${isShown ? 'popup--active' : ''}`}>
            <img className="popup__icon" src={`images/icons/success.png`} alt="icon" />
            <p className="popup__message">{message}</p>
            <div className="popup__close" onClick={toggle}>
                <div className="popup__close-line"></div>
                <div className="popup__close-line"></div>
            </div>
        </div>
    )
}

export default Popup