import { Outlet } from "react-router-dom";
import LogoTitle from "../components/logo-title/LogoTitle";
import "./RootLayout.scss";


const RootLayout = () => {

    const isAuth = localStorage.getItem("token");

    return (
        <div className="root-container">
            {isAuth &&
                <header className="header">
                    <LogoTitle />
                    <div className="header__user">
                        <p className="header__user-name">Name LastName</p>
                        <div className="header__avatar">
                            <img className="header__avatar-icon" src="/images/icons/profile.png" alt="profile" />
                        </div>
                    </div>
                </header>}
            <Outlet />
        </div>
    );
}

export default RootLayout