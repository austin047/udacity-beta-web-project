import {RECEIVE_REVIEWS} from "../actions/types";
import {mapIdToPost} from "../helpers/util";

const initialState = {};

export default function reviewReducer(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case RECEIVE_REVIEWS:
            return {
                ...state,
                ...mapIdToPost(payload)
            };

        default:
            return state;
    }
}
