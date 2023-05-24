import { SHOW_POPUP, SET_POPUP_MESSAGE } from "../actions/types";


const initialState = {
    isShown: false,
    message: ''
}

const popupReducer = (state = initialState, { type, payload }: any) => {

    switch (type) {

        case SHOW_POPUP:
            return { ...state, isShown: !state.isShown };

        case SET_POPUP_MESSAGE:
            return { ...state, message: payload };

        default:
            return state;
    }
}

export default popupReducer