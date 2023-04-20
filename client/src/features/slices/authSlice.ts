import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface authState {
    token: string | null
};

const initialState: authState = {
    token: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userLoggedIn(state, action) {
            localStorage.setItem("token", action.payload);
            state.token = action.payload;
        },
        userLoggedOut(state) {
            localStorage.removeItem("token");
            state.token = null;
            window.location.reload();
        }
    }
})

export const selectAuth = (state: RootState) => state.auth;
export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;