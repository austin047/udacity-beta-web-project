import {SEARCH_RESULTS} from "./types";
import {hideLoading, showLoading} from "react-redux-loading-bar";
import * as SearchApi from "../services/search.service"

function searchResult(data) {
    return {
        type: SEARCH_RESULTS,
        payload: data
    }
}

export function parserFailure(error) {
    const messages = []
    console.log(error)

    if (error.response.data.errors && Array.isArray(error.response.data.errors)) {
        const errorMessages = error.response.data.errors.map((err) => err.msg)
        messages.push(...errorMessages);
    } else if (error.response.data.error) {
        messages.push(error.response.data.error)
    } else if (error.response.data) {
        switch (error.response.status) {
            case 403:
                messages.push("You need not be authorized to perform this operation!")
                break;
            case 401:
                messages.push("Your credentials are not valid!")
                break;
            default:

        }
    }

    return messages;
}

export function handleSearch(limit, skip, query) {
    return (dispatch) => {
        dispatch(showLoading())

        //console.log('search2')

        return SearchApi.searchWebsites(limit, skip, query)
            .then((response) => {
                // console.log('Search Result')
                // console.log(response.data)
                // const websites = response.data.map((data) => {})
                dispatch(searchResult(response.data))
            })
            .catch((error) => {
                const messages = parserFailure(error)

                console.log(messages)
                dispatch(error)
            }).then(() => dispatch(hideLoading()))
    }
}