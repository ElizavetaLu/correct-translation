import { Dispatch, FormEventHandler, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../store/actions/actionCreators";

import InputWithLabel from "../../components/inputs/input-with-label/InputWithLabel";
import LogoTitle from "../../components/logo-title/LogoTitle";
import "./Login.scss";


const Login = () => {

    const dispatch: Dispatch<any> = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');
    const [pswErrorMessage, setPswErrorMessage] = useState<string>('');

    const { errorMessage } = useSelector((state: any) => state.auth)


    const [isChecked, setIsChecked] = useState<boolean>(false);


    const submit: FormEventHandler = e => {
        e.preventDefault()
        if (!email.trim()) setEmailErrorMessage('Enter your email');
        if (!password.trim()) setPswErrorMessage('Enter your password');

        dispatch(login({ email, password }, () => navigate('/')));
    }

    useEffect(() => {
        setPswErrorMessage(errorMessage)
    }, [errorMessage])


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
                        error={emailErrorMessage}
                        resetError={setEmailErrorMessage}
                    />

                    <InputWithLabel
                        type="password"
                        name="password"
                        label="Password"
                        value={password}
                        onChange={setPassword}
                        error={pswErrorMessage}
                        resetError={setPswErrorMessage}
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