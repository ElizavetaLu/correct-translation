import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { SentencesData } from '../../intefaces/intefaces';

interface sentencesState {
    data: SentencesData[] | null,
    currentTargetValue: string,
};

const initialState: sentencesState = {
    data: null,
    currentTargetValue: ''
};

const sentencesSlice = createSlice({
    name: 'sentences',
    initialState,
    reducers: {
        setSentences(state, action) {
            state.data = action.payload;
        }
    }
})

export const selectSentences = (state: RootState) => state.sentences;
export const { setSentences } = sentencesSlice.actions;

export default sentencesSlice.reducer;