import { SentencesData } from '../../intefaces/intefaces';
import { SET_LOADING, SET_SENTENCES, SET_ACTIVE } from './../actions/types';


interface IAction {
    type: string,
    payload: any
}

interface IState {
    isLoading: boolean,
    sentences: null | SentencesData[],
    activeIndex: null | number,
}

const sentencesList = JSON.parse(localStorage.getItem('sentences') || 'null')

const initialState: IState = {
    isLoading: false,
    sentences: sentencesList,
    activeIndex: null,
}

const sentencesReducer = (state = initialState, { type, payload }: IAction) => {

    switch (type) {
        case SET_LOADING:
            return { ...state, isLoading: !state.isLoading };

        case SET_SENTENCES:
            return { ...state, sentences: payload };

        case SET_ACTIVE:
            return { ...state, activeIndex: payload };

        default:
            return state;
    }
}

export default sentencesReducer 