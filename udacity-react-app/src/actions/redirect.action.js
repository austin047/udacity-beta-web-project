// action creators
import {CANCLE_REDIRECT, REDIRECT_TO} from "./types";

export const redirect = link => {
    return {type: REDIRECT_TO, payload: link};
};

export const cancelRedirect = () => {
    return {type: CANCLE_REDIRECT}
}
