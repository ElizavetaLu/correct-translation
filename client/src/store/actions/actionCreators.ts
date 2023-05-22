import { AnyAction, Dispatch } from "redux";
import { AuthCredentials, AuthDispatchType, ILanguage, IRequestData, SentencesData } from "../../intefaces/intefaces";
import { loginFetch, sentencesFetch, setBrandNewSentenceFetch, setCorrectedSentenceFetch } from "../../services";
import {
    AUTH_ERROR,
    AUTH_USER,
    SET_ACTIVE,
    SET_LOADING,
    SET_SENTENCES,
    USER_EMAIL,
    SET_SEARCH_TERM,
    SET_PAGE_NUMBER,
    SET_SOURCE_LANG,
    SET_TARGET_LANG,
    SET_TOTAL_PAGES,
    SHOW_POPUP,
    SET_POPUP_MESSAGE
} from "./types";



// Authentication

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
};

export const logout = () => (dispatch: Dispatch<AnyAction>) => {
    dispatch({ type: AUTH_USER, payload: '' });
    localStorage.removeItem('token');
    window.location.reload();
};

export const setAuthError = (errorMessage: string) => ({ type: AUTH_ERROR, payload: errorMessage });




// Sentences

export const getSentences = (isNewDataRequest: boolean, payload: IRequestData) => (dispatch: Dispatch<AnyAction>) => {

    sentencesFetch(payload)
        .then(({ data }) => {

            // if isNewDataRequest is true - rewrite state sentences data, otherwise - add data to arr
            dispatch({ type: SET_SENTENCES, payload: { data: data.docs, isNewDataRequest } });

            dispatch({ type: SET_TOTAL_PAGES, payload: data.totalPages });
            dispatch({ type: SET_LOADING })
        })
        .catch(err => console.log(err))

};

export const setCorrectedSentence = (sentencesData: SentencesData, id: string | null) => (dispatch: Dispatch<AnyAction>) => {

    setCorrectedSentenceFetch(sentencesData)
        .then(({ data }) => {

            dispatch({ type: SET_POPUP_MESSAGE, payload: data.result });
            dispatch({ type: SHOW_POPUP });
        })
        .catch(err => console.log(err))
};



export const addBrandNewSentence = (sentencesData: SentencesData) => async (dispatch: any) => {

    setBrandNewSentenceFetch(sentencesData)
        .then(({ data }) => {

            dispatch({ type: SET_POPUP_MESSAGE, payload: data.result });
            dispatch({ type: SHOW_POPUP });
        })
        .catch(err => console.log(err))
};

export const setSearchTerm = (payload: string) => ({ type: SET_SEARCH_TERM, payload });

export const setPageNumber = (payload: number) => ({ type: SET_PAGE_NUMBER, payload });

export const setSourceLang = (payload: ILanguage) => ({ type: SET_SOURCE_LANG, payload });

export const setTargetLang = (payload: ILanguage) => ({ type: SET_TARGET_LANG, payload });

export const setActiveIndex = (id: string | null) => ({ type: SET_ACTIVE, payload: id });




//popup
export const showPopup = () => ({ type: SHOW_POPUP });

export const setPopupMessage = (message: string) => ({ type: SET_POPUP_MESSAGE, payload: message });