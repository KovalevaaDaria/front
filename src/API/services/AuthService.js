import axios from "axios";

axios.defaults.timeout = 5000;

export default class AuthService {
    static async getUserInfo({authToken}) {
        return await axios.get(`https://bauman-class.ru/api/v1/user-info`,
            {
                headers: {
                    Authorization: "Bearer " + authToken
                }
            })
    }

    static async login({email, password}) {
        return await axios.post(`https://bauman-class.ru/api/v1/login`,
            {
                email: email,
                password: password
            })
            .then(function (response) {
                return response
            })
            .catch(function (error) {
                if (error.response) {
                    throw {status: error.response.status, error: error.response.data.message}
                } else if (error.request) {
                    throw {status: 599, error: "Connection Error"}
                } else {
                    throw {status: 520, error: "Unknown Error"}
                }
            })
    }

    static async register({email, password, role, surname, name, patronymic}) {
        return await axios.post(`https://bauman-class.ru/api/v1/signup`,
            {
                email: email,
                password: password,
                role: role,
                surname: surname,
                name: name,
                patronymic: patronymic,
                avatar: "https://i.ibb.co/JkW4tYy/Image-2.jpg"
            })
            .then(function (response) {
                return response
            })
            .catch(function (error) {
                console.log("ERROR", error)
                if (error.response) {
                    if (!error.response.data.message)
                        return {status: error.response.status, error: error.message}
                    else return {status: error.response.status, error: error.response.data.message}
                } else if (error.request) {
                    console.log(error)
                    return {status: 599, error: "Connection Error"}
                } else {
                    return {status: 520, error: "Unknown Error"}
                }
            })
    }

    static async changeAccountData({account, authToken}) {
        return await axios.patch(
            `https://bauman-class.ru/api/v1/profile`,
            {
                name: account.name,
                surname: account.surname,
                patronymic: account.patronymic,
            },
            {
                headers: {
                    Authorization: "Bearer " + authToken
                }
            }
        )}
    }