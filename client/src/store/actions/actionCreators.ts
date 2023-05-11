import { AnyAction, Dispatch } from "redux";
import { AuthCredentials, AuthDispatchType, SentencesData } from "../../intefaces/intefaces";
import { loginFetch, sentencesFetch, setCorrectedSentenceFetch } from "../../services";
import {
    AUTH_ERROR,
    AUTH_USER,
    SET_ACTIVE,
    SET_LOADING,
    SET_SENTENCES
} from "./types";

export const login = (credentials: AuthCredentials, callback: () => void) => (dispatch: AuthDispatchType) => {

    loginFetch(credentials)
        .then(({ data }) => {
            dispatch({ type: AUTH_USER, payload: data.token });

            localStorage.setItem('token', data.token);

            callback();
            window.location.reload();
        })
        .catch(() => dispatch(setAuthError('Invalid login credentials')))
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

            const sentecesToString = JSON.stringify(data)
            localStorage.setItem('sentences', sentecesToString)
        })
}

export const setCorrectedSentence = (sentencesData: SentencesData, index: number) => (dispatch: Dispatch<AnyAction>) => {

    setCorrectedSentenceFetch(sentencesData)
        .then(({ data }) => {
            if (data.success) {

                const senteces = localStorage.getItem('sentences');


                //index '-1' - author's brand new sentences
                if (senteces) {

                    const sentecesList = JSON.parse(senteces);
                    let newList = [];

                    if (index !== -1) {

                        for (let i = 0; i < sentecesList.length; i++) {
                            if (i === index) {
                                newList.push(sentencesData)
                            } else {
                                newList.push(sentecesList[i])
                            }
                        }

                    } else {
                        newList = [sentencesData, ...sentecesList]
                    }

                    const newListToString = JSON.stringify(newList);
                    localStorage.setItem('sentences', newListToString)

                    dispatch({ type: SET_SENTENCES, payload: newList });


                }
            }
        })
        .catch(err => console.log(err))
}

export const setActiveIndex = (i: number | null) => ({
    type: SET_ACTIVE,
    payload: i
})