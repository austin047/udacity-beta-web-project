import axios from "axios";
import authHeader from "./auth-header";
import {BASE_URL} from "./common";

const API_URL = BASE_URL + "/api/websites/";

export const searchWebsites = () => {
    return axios.get(API_URL + "all");
};

const WebsiteService = {
    getReviewsForWebsite: (websiteId, limit, skip) => {
        return axios.get(API_URL + `${websiteId}/reviews?limit=${limit}&skip=${skip}`)
    },

    getWebsiteInfo: (websiteId) => {
        return axios.get(API_URL + `${websiteId}`)
    },

    createWebsite: (websiteData) => {
        return axios.post(API_URL, websiteData, {headers: authHeader()})
    },

    addNewReview: (info) => {
        const websiteId = info.websiteId;
        delete info.websiteId;

        return axios.post(API_URL + `${websiteId}/reviews`, info, {headers: authHeader()})
    },


}


export default WebsiteService;
