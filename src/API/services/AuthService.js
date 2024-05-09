import axios from "axios";

axios.defaults.timeout = 1000;

export default class AuthService {
    static async login({email, password}) {
        return await axios.post(`https://django.roscosmosmuseum.store/api/v1/login`,
            {
                email: email,
                password: password
            })
            .then(function (response) {
            return response
            })
            .catch(function (error) {
                console.log("ERROR", error)
                if (error.response) {
                    return {status: error.response.status, error: error.response.data.message}
                } else if (error.request) {
                    console.log(error)
                    return {status: 599, error: "Connection Error"}
                } else {
                    return {status: 520, error: "Unknown Error"}
                }
            })
    }

    static async register({email, password, role, surname, name, patronymic}) {
        return await axios.post(`https://django.roscosmosmuseum.store/api/v1/signup`,
            {
                email: email,
                password: password,
                role: role,
                surname: surname,
                name: name,
                patronymic: patronymic
            })
            .then(function (response) {
                return response
            })
            .catch(function (error) {
                console.log("ERROR", error)
                if (error.response) {
                    return {status: error.response.status, error: error.response.data.message}
                } else if (error.request) {
                    console.log(error)
                    return {status: 599, error: "Connection Error"}
                } else {
                    return {status: 520, error: "Unknown Error"}
                }
            })
    }
}