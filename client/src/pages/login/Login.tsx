import { Dispatch, FormEventHandler, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { login } from "../../store/actions/actionCreators";

import InputWithLabel from "../../components/inputs/input-with-label/InputWithLabel";
import LogoTitle from "../../components/logo-title/LogoTitle";
import "./Login.scss";


const Login = () => {

    const dispatch: Dispatch<any> = useDispatch()
    const navigate = useNavigate()

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')


    const [isChecked, setIsChecked] = useState<boolean>(false);


    const submit: FormEventHandler = e => {
        e.preventDefault()

        if (!(email.trim || password.trim())) return setErrorMessage('Provide both: Email and Password')

        dispatch(login({ email, password }, () => navigate('/')))
    }


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