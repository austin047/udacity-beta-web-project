import {CLEAR_ERRORS, LOGIN_SUCCESS, LOGOUT, REGISTER_FAIL, REGISTER_SUCCESS,} from "./types";
import {hideLoading, showLoading} from "react-redux-loading-bar";

import {AuthService} from "../services/auth.service";
import {parserFailure} from "./search.action";


function registrationSuccess(user) {
    return {
        type: REGISTER_SUCCESS,
        payload: user
    }
}

function loginSuccess(user) {
    return {
        type: LOGIN_SUCCESS,
        payload: user
    }
}

export const clearErrors = () => ({
    type: CLEAR_ERRORS,
});


function registrationFailed(errors) {
    return {
        type: REGISTER_FAIL,
        payload: errors
    }
}

function loginFailed(errors) {
    return {
        type: REGISTER_FAIL,
        payload: errors
    }
}

export function handleRegisterUser(username, email, password) {
    return (dispatch) => {
        dispatch(showLoading())

        /// Make API call
        return AuthService.register(username, email, password).then(
            (response) => {

                dispatch(registrationSuccess(response))
            }
        ).catch((error) => {
            console.log(error
            )
            const messages = parserFailure(error)
            console.log(messages)

            dispatch(registrationFailed(messages))
        }).then(() => dispatch(hideLoading()))
    }
}

export function handleLoginUser(email, password) {
    return (dispatch) => {
        dispatch(showLoading())

        /// Make API call
        return AuthService.login(email, password).then(
            (response) => {
                console.log(response);

                dispatch(loginSuccess(response))
            }
        ).catch((error) => {
            console.log(error
            )
            const messages = parserFailure(error)
            console.log(messages)

            dispatch(loginFailed(messages))
        }).then(() => dispatch(hideLoading()))
    }
}

export const handleLogout = () => (dispatch) => {
    AuthService.logout()

    dispatch({
        type: LOGOUT,
    });
};


// export const register = (username, email, password) => (dispatch) => {
//   return AuthService.register(username, email, password).then(
//     (response) => {
//       dispatch({
//         type: REGISTER_SUCCESS,
//       });
//
//       dispatch({
//         type: SET_MESSAGE,
//         payload: response.data.message,
//       });
//
//       return Promise.resolve();
//     },
//     (error) => {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//
//       dispatch({
//         type: REGISTER_FAIL,
//       });
//
//       dispatch({
//         type: SET_MESSAGE,
//         payload: message,
//       });
//
//       return Promise.reject();
//     }
//   );
// };

// export const login = (username, password) => (dispatch) => {
//   return AuthService.login(username, password).then(
//     (data) => {
//       dispatch({
//         type: LOGIN_SUCCESS,
//         payload:  data ,
//       });
//
//       return Promise.resolve();
//     },
//     (error) => {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//
//       dispatch({
//         type: LOGIN_FAIL,
//       });
//
//       dispatch({
//         type: SET_MESSAGE,
//         payload: message,
//       });
//
//       return Promise.reject();
//     }
//   );
// };

