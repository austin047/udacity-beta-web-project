import axios from "axios";
import authHeader from "./auth-header";
import {BASE_URL} from "./common";

const API_URL = BASE_URL + "/api/users/";

const UserService = {
    getReviewsForUser: (userId, limit, skip) => {
        console.log('GetReviews ', [userId, limit])
        return axios.get(API_URL + `reviews?limit=${limit}&skip=${skip}`, {headers: authHeader()})
    },
}

export default UserService;
