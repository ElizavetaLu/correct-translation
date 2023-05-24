import { AuthActionForReducer, AuthState } from "../../intefaces/intefaces";
import { AUTH_USER, AUTH_ERROR, USER_EMAIL } from "../actions/types";


const initialState: AuthState = {
    token: localStorage.getItem('token'),
    email: localStorage.getItem('email'),
    errorMessage: ''
}

const authReducer = (state = initialState, { type, payload }: AuthActionForReducer) => {

    switch (type) {
        case AUTH_USER:
            return { ...state, token: payload };

        case USER_EMAIL:
            return { ...state, email: payload };

        case AUTH_ERROR:
            return { ...state, errorMessage: payload };

        default: return state;
    }
}

export default authReducer