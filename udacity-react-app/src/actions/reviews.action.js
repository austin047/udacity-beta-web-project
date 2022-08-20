import {RECEIVE_REVIEWS} from "./types";
import WebsiteService from "../services/website.serice";
import UserService from "../services/user.service";
import {hideLoading, showLoading} from "react-redux-loading-bar";
import {parserFailure} from "./search.action";
import {setErrorMessages} from "./message.action";
import {redirect} from "./redirect.action";

function receiveReViews(data) {
    return {
        type: RECEIVE_REVIEWS,
        payload: data
    }
}

export const handleGetReviews = (websiteId, limit, skip) => {
    return (dispatch) => {
        dispatch(showLoading())
        return WebsiteService.getReviewsForWebsite(websiteId, limit, skip).then(
            (response) => {
                dispatch(receiveReViews(response.data))
            }).catch((error) => {
            const messages = parserFailure(error)

            dispatch(setErrorMessages(messages))
        }).then(() => dispatch(hideLoading()))
    }
}


export const handleAddReview = (info) => {
    return (dispatch) => {
        dispatch(showLoading())
        return WebsiteService.addNewReview(info).then(
            (response) => {
                dispatch(receiveReViews(response.data))
                dispatch(redirect(`/website/${response.data.websiteId}`))
            }).catch((error) => {
            const messages = parserFailure(error)

            dispatch(setErrorMessages(messages))
        }).then(() => dispatch(hideLoading()))
    }
}

export const handleGetReviewsForUser = (limit, skip) => {
    return (dispatch, getState) => {
        //const { user } = getState().auth
        dispatch(showLoading())
        return UserService.getReviewsForUser(2, limit, skip).then(
            (response) => {
                console.log("GetReviews", response.data)
                dispatch(receiveReViews(response.data))
            }).catch((error) => {
            const messages = parserFailure(error)

            dispatch(setErrorMessages(messages))
        }).then(() => dispatch(hideLoading()))
    }
}