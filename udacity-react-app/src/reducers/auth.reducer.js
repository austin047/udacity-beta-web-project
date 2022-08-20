import {CLEAR_MESSAGE, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, REGISTER_FAIL, REGISTER_SUCCESS,} from "../actions/types";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
    ? {isLoggedIn: true, errors: [], user}
    : {isLoggedIn: false, errors: [], user: null};

export default function authReducer(state = initialState, action) {
    const {type, payload} = action;

    // console.log(action)

    switch (type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: payload,
                errors: []
            };
        case REGISTER_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                errors: payload
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                errors: [],
                user: payload,
            };
        case LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        case CLEAR_MESSAGE :
            return {
                ...state,
                errors: []
            }
        default:
            return state;
    }
}

