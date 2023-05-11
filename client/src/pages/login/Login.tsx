import { SyntheticEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { setErrorMessage, userLoggedIn } from "../../features/slices/authSlice";
import { useLoginMutation } from "../../features/api/apiSlice";

import { useAppDispatch } from "../../app/hooks";

import InputWithLabel from "../../components/inputs/input-with-label/InputWithLabel";
import LogoTitle from "../../components/logo-title/LogoTitle";
import "./Login.scss";


const Login = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [isChecked, setIsChecked] = useState<boolean>(false);


    const [login, { data, isSuccess }] = useLoginMutation();

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        if (email.trim() && password.trim()) {
            await login({ email, password });
        } else {
            dispatch(setErrorMessage('Enter both: email and password'));
        }
    }

    useEffect(() => {
        if (isSuccess) {
            dispatch(userLoggedIn({ token: data.token, cb: () => navigate('/') }));
        } else {
            dispatch(setErrorMessage('Invalid login credentials'));
        }
    }, [isSuccess])


    return (
        <div className="login">
            <LogoTitle />
            <form onSubmit={submit} className="login__form">
                <div className="login__inputs-container">
                    <InputWithLabel
                        type="email"
                        name="email"
                        label="Email"
                        value={email}
                        onChange={setEmail}
                    />

                    <InputWithLabel
                        type="password"
                        name="password"
                        label="Password"
                        value={password}
                        onChange={setPassword}
                    />
                </div>
                <div className="login__row">
                    <div className="login__remember">
                        <div className={`login__remember-toggle ${isChecked && 'login__remember-toggle--active'}`} onClick={() => setIsChecked(!isChecked)}></div>
                        <span className="login__remember-text">Remember me?</span>
                    </div>
                    <Link to='' className="login__link">Forgot Password?</Link>
                </div>

                <button className="login__button" type="submit">Log In</button>

            </form>
        </div>
    )
}

export default Login