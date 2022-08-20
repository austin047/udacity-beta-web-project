import {CLEAR_ERRORS, CLEAR_MESSAGE, ERROR_MESSAGES, SET_MESSAGE} from "./types";

export const setMessage = (message) => ({
    type: SET_MESSAGE,
    payload: message,
});

export const clearMessage = () => ({
    type: CLEAR_MESSAGE,
});

export const setErrorMessages = (messages) => ({
    type: ERROR_MESSAGES,
    payload: messages
})

export const clearErrors = () => ({
    type: CLEAR_ERRORS,
});




