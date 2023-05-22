import { ILanguage, ReceivedSentencesData } from '../../intefaces/intefaces';
import {
    SET_LOADING, 
    SET_PAGE_NUMBER,
    SET_SEARCH_TERM,
    SET_SENTENCES,
    SET_ACTIVE,
    SET_SOURCE_LANG,
    SET_TARGET_LANG,
    SET_TOTAL_PAGES,
} from './../actions/types';


interface IAction {
    type: string,
    payload: any
}

interface IState {
    isLoading: boolean,
    totalPages: number, 
    pageNumber: number,
    searchTerm: string,
    sourceLang: ILanguage,
    targetLang: ILanguage,
    sentences: ReceivedSentencesData[],
    activeItemId: null | string,
}

const initialState: IState = {
    isLoading: false,
    totalPages: 0, 
    pageNumber: 1,
    searchTerm: '',


    sourceLang: {
        name: 'English',
        code: 'en',
        flag: 'gb'
    },
    targetLang: {
        name: 'Ukrainian',
        code: 'uk',
        flag: 'ua'
    },

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


        case SET_SOURCE_LANG:
            return { ...state, sourceLang: payload };

        case SET_TARGET_LANG:
            return { ...state, targetLang: payload };

        default:
            return state;
    }
}

export default sentencesReducer 