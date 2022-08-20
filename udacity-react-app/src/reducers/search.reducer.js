import {SEARCH_RESULTS} from "../actions/types";
import {mapWebsiteIdToPost} from "../helpers/util"

const initialState = {};

export default function searchReducer(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case SEARCH_RESULTS:
            return {
                ...state,
                ...mapWebsiteIdToPost(payload)
            };

        default:
            return state;
    }
}


