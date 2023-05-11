import { AuthActionForReducer, AuthState } from "../../intefaces/intefaces"
import { AUTH_USER, AUTH_ERROR } from "../actions/types"


const initialState: AuthState = {
    token: localStorage.getItem('token'),
    errorMessage: '',
    email: '',
    qrCode: ''
}

const authReducer = (state = initialState, { type, payload }: AuthActionForReducer) => {
    switch (type) {
        case AUTH_USER:
            return { ...state, token: payload };

        case AUTH_ERROR:
            return { ...state, errorMessage: payload }; 

        default: return state;
    }
}

export default authReducer