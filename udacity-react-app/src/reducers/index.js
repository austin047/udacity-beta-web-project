import {combineReducers} from "redux";
import auth from "./auth.reducer";
import message from "./message.reducer";
import search from './search.reducer';
import reviews from './review.reducer'
import websites from "./website.reducer";
import redirect from "./redirect.reducer";
import {loadingBarReducer} from "react-redux-loading-bar"

export default combineReducers({
    auth,
    message,
    search,
    reviews,
    websites,
    redirect,
    loadingBar: loadingBarReducer,
});
