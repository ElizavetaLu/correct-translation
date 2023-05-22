import { combineReducers } from "redux";
import authReducer from "./authReducer";
import sentencesReducer from "./sentencesReducer";
import popupReducer from "./popupReducer";

const rootReducers = combineReducers({
    auth: authReducer,
    sentences: sentencesReducer,
    popup: popupReducer,
})

export default rootReducers