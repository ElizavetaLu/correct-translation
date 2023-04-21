import { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setErrorMessage, userLoggedIn } from "../features/slices/authSlice";
import { useLoginMutation } from "../features/api/apiSlice";
import { useAppDispatch } from "../app/hooks";
import InputWithLabel from "../components/InputWithLabel";


const LogIn = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');


    const [login, { data, isSuccess }] = useLoginMutation();

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault()

        if (email.trim() && password.trim()) {
            await login({ email, password })
        } else {
            dispatch(setErrorMessage('Enter both: login and password'))
        }
    }

    useEffect(() => {
        if (isSuccess) {
            dispatch(userLoggedIn({ token: data.token, cb: () => navigate('/') }));
        } else {
            dispatch(setErrorMessage('Invalid login credentials'))
        }
    }, [isSuccess])


    return (
        <div className='h-screen flex items-center justify-center px-6'>
            <div className="max-w-xl w-full">

                <h1 className='mb-20 text-6xl text-violet text-center font-bold capitalize'>Authentication</h1>

                <form className='flex flex-col items-center gap-6' onSubmit={submit}>
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
                    <button
                        className='mt-20 primary-button'
                        type='submit'
                    >log in</button>
                </form>
            </div>
        </div>
    )
}

export default LogIn