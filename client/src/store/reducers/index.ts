import { combineReducers } from "redux";
import authReducer from "./authReducer";
import sentencesReducer from "./sentencesReducer";

const rootReducers = combineReducers({
    auth: authReducer,
    sentences: sentencesReducer
})

export default rootReducers