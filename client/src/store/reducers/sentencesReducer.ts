import { ISentencesState } from '../../intefaces/intefaces';
import {
    SET_LOADING,
    SET_PAGE_NUMBER,
    SET_SEARCH_TERM,
    SET_SENTENCES,
    SET_ACTIVE,
    SET_SOURCE_LANG,
    SET_TARGET_LANG,
    SET_TOTAL_PAGES,
    DELETE_SENTENCE
} from './../actions/types';


interface IAction {
    type: string,
    payload: any
}

export const sourceLangDefault = {
    name: 'English',
    code: 'en',
    flag: 'gb'
};

export const targetLangDefault = {
    name: 'Ukrainian',
    code: 'uk',
    flag: 'ua'
};




const sourceLang = localStorage.getItem("sourceLanguage")
const targetLang = localStorage.getItem("targetLanguage")

const initialState: ISentencesState = {
    isLoading: false,
    totalPages: 0,
    pageNumber: 1,
    searchTerm: '',

    sourceLang: sourceLang ? JSON.parse(sourceLang) : sourceLangDefault,
    targetLang: targetLang ? JSON.parse(targetLang) : targetLangDefault,

    sentences: [],
    activeItemId: null,
}

const sentencesReducer = (state = initialState, { type, payload }: IAction) => {

    switch (type) {
        case SET_LOADING:
            return { ...state, isLoading: !state.isLoading };

        case SET_TOTAL_PAGES:
            return { ...state, totalPages: payload };

        case SET_PAGE_NUMBER:
            return { ...state, pageNumber: payload };

        case SET_SEARCH_TERM:
            return { ...state, searchTerm: payload };

        case SET_SENTENCES:

            if (payload.isNewDataRequest) {
                return { ...state, sentences: payload.data };
            }
            return { ...state, sentences: [...state.sentences, ...payload.data] };

        case SET_ACTIVE:
            return { ...state, activeItemId: payload };

        case DELETE_SENTENCE:

            const newArr = state.sentences.filter(item => item._id !== payload)
            return { ...state, sentences: newArr };

        case SET_SOURCE_LANG:
            return { ...state, sourceLang: payload };

        case SET_TARGET_LANG:
            return { ...state, targetLang: payload };

        default:
            return state;
    }
}

export default sentencesReducer 