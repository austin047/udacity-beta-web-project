import {CANCLE_REDIRECT, REDIRECT_TO} from "../actions/types";

const initialState = null;

export default function redirect(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case REDIRECT_TO:
            return payload

        case CANCLE_REDIRECT:
            return null;

        default:
            return state;
    }

}