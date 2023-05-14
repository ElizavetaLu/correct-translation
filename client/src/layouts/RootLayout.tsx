import { Dispatch } from "react";
import { useDispatch } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import { logout } from "../store/actions/actionCreators";

import LogoTitle from "../components/logo-title/LogoTitle";
import "./RootLayout.scss";


const RootLayout = () => {

    const isAuth = localStorage.getItem("token");
    const dispatch: Dispatch<any> = useDispatch();

    return (
        <div className="root-container">
            {isAuth &&
                <header className="header">
                    <LogoTitle />
                    <div className="header__right">
                        <NavLink to='/profile' className="header__user">
                            <p className="header__user-name">Name Lastname</p>
                            <div className="header__avatar">
                                <img className="header__avatar-icon" src="/images/icons/profile.png" alt="profile" />
                            </div>
                        </NavLink>
                        <button className="header__button" onClick={() => dispatch(logout())}>log out</button>
                    </div>
                </header>}
            <Outlet />
        </div>
    );
}

export default RootLayout