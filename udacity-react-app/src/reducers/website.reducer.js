import {RECEIVE_WEBSITE_INFO} from "../actions/types";

const initialState = {};

export default function websiteReducer(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case RECEIVE_WEBSITE_INFO:
            return {
                ...state,
                [payload.id]: payload
            };

        default:
            return state;
    }
}
