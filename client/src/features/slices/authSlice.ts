import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface authState {
    token: string | null
    errorMessage: string
};

const initialState: authState = {
    token: null,
    errorMessage: ''
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userLoggedIn(state, action) {
            localStorage.setItem("token", action.payload.token);
            state.token = action.payload.token;

            action.payload.cb();
            window.location.reload();
        },
        userLoggedOut(state) {
            localStorage.removeItem("token");
            state.token = null;
            window.location.reload();
        },
        setErrorMessage(state, action) {
            state.errorMessage = action.payload;
        }
    }
})

export const selectAuth = (state: RootState) => state.auth;
export const { userLoggedIn, userLoggedOut, setErrorMessage } = authSlice.actions;
export default authSlice.reducer;