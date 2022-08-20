import {CLEAR_ERRORS, CLEAR_MESSAGE, ERROR_MESSAGES, SET_MESSAGE} from "../actions/types";

const initialState = {errors: [], message: ""};

export default function errors(state = initialState, action) {
    const {type, payload} = action;


    switch (type) {
        case SET_MESSAGE:
            return {message: payload};

        case CLEAR_MESSAGE:
            return {message: ""};


        case ERROR_MESSAGES:
            return {
                ...state,
                message: null,
                errors: payload
            }

        case CLEAR_ERRORS:
            return {
                errors: [],
                message: null
            }
        default:
            return state;
    }
}
