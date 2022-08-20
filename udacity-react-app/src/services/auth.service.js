import axios from "axios";
import {BASE_URL} from "./common";

const API_URL = BASE_URL + "/api/auth/";

export const AuthService = {
    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user")
    },

    register: (userName, email, password) => {
        return axios.post(API_URL + "signup", {
            userName,
            email,
            password,
        }).then((response) => {
            console
                .log(response.data)
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.user));
            }

            return response.data.user;
        });
    },

    login: (email, password) => {
        return axios
            .post(API_URL + "login", {
                email,
                password,
            })
            .then((response) => {

                if (response.data.token) {
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("user", JSON.stringify(response.data.user));
                }

                return response.data.user;
            });
    },

}


// export const logout = () => {
//   localStorage.removeItem("user");
// };

// export default {
//   register,
//   login,
//   logout,
// };
