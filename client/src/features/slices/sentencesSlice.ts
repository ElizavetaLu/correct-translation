import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { SentencesData } from '../../intefaces/intefaces';

interface sentencesState {
    data: SentencesData[] | null,
    fixedData: SentencesData[],
};

const initialState: sentencesState = {
    data: null,
    fixedData: [],
};

const sentencesSlice = createSlice({
    name: 'sentences',
    initialState,
    reducers: {
        setSentences(state, action) {
            state.data = action.payload;
        },
        setFixedSentence(state, action) {
            const exist = state.fixedData.findIndex(item => item._id === action.payload._id)

            if (exist !== -1) {
                state.fixedData[exist] = action.payload
            } else {
                state.fixedData.push(action.payload);
            }
        },
    }
})

export const selectSentences = (state: RootState) => state.sentences;
export const { setSentences, setFixedSentence } = sentencesSlice.actions;

export default sentencesSlice.reducer;