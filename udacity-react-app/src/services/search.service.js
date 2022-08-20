import axios from "axios";
import {BASE_URL} from "./common";

const API_URL = BASE_URL + "/api/search";

export const searchWebsites = (limit, skip, query) => {
    const url = API_URL + `?limit=${limit}&skip=${skip}&q=${query}`;
    //console.log(url)
    return axios.get(url);
};