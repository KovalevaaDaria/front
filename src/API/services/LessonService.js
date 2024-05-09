import axios from "axios";

axios.defaults.timeout = 1000;

export default class LessonService {
    static async getAll({courseUuid, authToken}) {
        return await axios.get(`https://django.roscosmosmuseum.store/api/v1/courses/${courseUuid}/lessons`,
            {
                headers: {
                    Authorization: "Bearer " + authToken
                }
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

    static async deleteLesson({lessonUuid, authToken}) {
        return await axios.delete(`https://django.roscosmosmuseum.store/api/v1/lessons/${lessonUuid}`,
            {
                headers: {
                    Authorization: "Bearer " + authToken
                }
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