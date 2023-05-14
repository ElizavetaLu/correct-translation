import { AnyAction, Dispatch } from "redux";
import { AuthCredentials, AuthDispatchType, SentencesData } from "../../intefaces/intefaces";
import { loginFetch, sentencesFetch, setCorrectedSentenceFetch } from "../../services";
import {
    AUTH_ERROR,
    AUTH_USER,
    SET_ACTIVE,
    SET_LOADING,
    SET_SENTENCES,
    SET_SENTENCE,
    USER_EMAIL
} from "./types";

export const login = (credentials: AuthCredentials, callback: () => void) => (dispatch: AuthDispatchType) => {

    loginFetch(credentials)
        .then(({ data }) => {
            dispatch({ type: AUTH_USER, payload: data.token });
            dispatch({ type: USER_EMAIL, payload: data.email });

            localStorage.setItem('token', data.token);

            callback();
            window.location.reload();
        })
        .catch(() => dispatch(setAuthError('Invalid login credentials')))
}

export const logout = () => (dispatch: Dispatch<AnyAction>) => {
    dispatch({ type: AUTH_USER, payload: '' })
    localStorage.removeItem('token');
    window.location.reload();
}

export const setAuthError = (errorMessage: string) => ({
    type: AUTH_ERROR,
    payload: errorMessage
})



export const getSentences = () => (dispatch: Dispatch<AnyAction>) => {

    dispatch({ type: SET_LOADING });

    sentencesFetch()
        .then(({ data }) => {
            dispatch({ type: SET_LOADING });
            dispatch({ type: SET_SENTENCES, payload: data });
        })
}

export const setCorrectedSentence = (sentencesData: SentencesData, id: string | null) => (dispatch: Dispatch<AnyAction>) => {

    setCorrectedSentenceFetch(sentencesData)
        .then(({ data }) => {
            dispatch({ type: SET_SENTENCE, payload: { data, id } });
        })
        .catch(err => console.log(err))
}

export const setActiveIndex = (id: string | null) => ({
    type: SET_ACTIVE,
    payload: id
})