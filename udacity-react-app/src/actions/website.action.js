import {hideLoading, showLoading} from "react-redux-loading-bar";
import {parserFailure} from "./search.action";
import {setErrorMessages} from "./message.action";
import {RECEIVE_WEBSITE_INFO} from "./types";
import WebsiteService from "../services/website.serice";
import {redirect} from "./redirect.action";

function receiveWebsiteInfo(data) {
    return {
        type: RECEIVE_WEBSITE_INFO,
        payload: data
    }
}

export const handleGetWebsiteInfo = (websiteId, limit, skip) => {
    return (dispatch) => {
        dispatch(showLoading())
        return WebsiteService.getWebsiteInfo(websiteId, limit, skip).then(
            (response) => {
                // console.log(response.data)
                dispatch(receiveWebsiteInfo(response.data))
            }).catch((error) => {
            const messages = parserFailure(error)

            dispatch(setErrorMessages(messages))
        }).then(() => dispatch(hideLoading()))
    }
}

export const handleAddWebsite = (info) => {
    return (dispatch) => {
        //console.log("About to sed", info)
        dispatch(showLoading())
        return WebsiteService.createWebsite(info).then(
            (response) => {
                // console.log(response.data)
                dispatch(receiveWebsiteInfo(response.data))
                dispatch(redirect(`/website/${response.data.id}`))
            }).catch((error) => {
            const messages = parserFailure(error)

            dispatch(setErrorMessages(messages))
        }).then(() => dispatch(hideLoading()))
    }
}