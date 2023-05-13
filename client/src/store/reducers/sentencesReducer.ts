import { ReceivedSentencesData } from '../../intefaces/intefaces';
import { SET_LOADING, SET_SENTENCES, SET_ACTIVE, SET_SENTENCE } from './../actions/types';


interface IAction {
    type: string,
    payload: any
}

interface IState {
    isLoading: boolean,
    sentences: null | ReceivedSentencesData[],
    activeItemId: null | string,
}

const initialState: IState = {
    isLoading: false,
    sentences: null,
    activeItemId: null,
}

const sentencesReducer = (state = initialState, { type, payload }: IAction) => {

    switch (type) {
        case SET_LOADING:
            return { ...state, isLoading: !state.isLoading };

        case SET_SENTENCES:
            return { ...state, sentences: payload };

        case SET_ACTIVE:
            return { ...state, activeItemId: payload };

        case SET_SENTENCE:

            const currentList = state.sentences;

            if (currentList) {
                let updatedList: ReceivedSentencesData[] = [];


                currentList.map((item) => {
                    if (payload.id === item._id) {
                        return updatedList.push({
                            ...item,
                            sourceLang: payload.data.sourceLang,
                            sourceText: payload.data.sourceText,
                            targetLang: payload.data.targetLang,
                            targetText: payload.data.targetText
                        })
                    } else if (payload.id === null) {
                        return updatedList = [...currentList, payload.data]
                    }
                    return updatedList.push(item)
                })

                return { ...state, sentences: updatedList };
            }

            return state

        default:
            return state;
    }
}

export default sentencesReducer 