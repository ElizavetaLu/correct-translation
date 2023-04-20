import { SyntheticEvent, useEffect, useState } from "react";
import InputWithLabel from "../components/inputWithLabel/InputWithLabel";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { userLoggedIn } from "../features/slices/authSlice";
import { useLoginMutation } from "../features/api/apiSlice";

const LogIn = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');


    const [login, { data, isSuccess, isError, error }] = useLoginMutation()

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault()
        if (email && password) {
            await login({ email, password })

        } else {
            console.log('pipka')
        }
    }

    useEffect(() => {
        if (isSuccess) {
            dispatch(userLoggedIn(data.token))
            navigate('/')
        }
    }, [isSuccess])


    return (
        <div className='h-screen flex items-center justify-center'>
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
                        className='mt-20 bg-violet text-white capitalize rounded-md py-2 px-10 text-lg'
                        type='submit'
                    >log in</button>
                </form>
            </div>
        </div>
    )
}

export default LogIn