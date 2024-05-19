import axios from "axios";

export default class TestService {
    static async getAll({lessonUuid, authToken}) {
        return await axios.get(`https://bauman-class.ru/api/v1/lessons/${lessonUuid}/tests`,
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
                    return {status: error.response.status, error: error.response.statusText}
                } else if (error.request) {
                    console.log(error)
                    return {status: 599, error: "Connection Error"}
                } else {
                    return {status: 520, error: "Unknown Error"}
                }
            })
    }

    static async addTest({title, deadline, lessonUuid, authToken, questions}) {
        return await axios.post(`https://bauman-class.ru/api/v1/tests`,
            {
                title: title,
                deadline: deadline,
                lessonUuid: lessonUuid,
                questions: questions
            },
            {
                headers: {
                    Authorization: "Bearer " + authToken
                }
            })
    }

    static async deleteTest({testUuid, authToken}) {
        return await axios.delete(`https://bauman-class.ru/api/v1/tests/${testUuid}`,
            {
                headers: {
                    Authorization: "Bearer " + authToken
                }
            })
    }
}