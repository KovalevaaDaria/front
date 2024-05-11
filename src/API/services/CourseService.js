import axios from "axios";

export default class CourseService {


    static async createCourse({userUuid, title, description, authToken}) {
        const response = await axios.post(`https://localhost:8000/api/v1/courses`, {
            headers: {
                Authorization: authToken
            },
            data: {
                title: title,
                description: description,
                userUuid: userUuid
            }
        })
        return response
    }

    static async deleteCourseByID({userUuid, courseUuid, authToken}) {
        const response = await axios.delete(`https://bauman-class.ru/api/v1/courses/${courseUuid}`, {
            headers: {
                Authorization: authToken
            },
            data: {
                userUuid: userUuid
            }
        })
        return response
    }

    static async getAll({userUuid, authToken}) {
        const response = await axios.get(`https://bauman-class.ru/api/v1/users/${userUuid}/courses`, {
            headers: {
                Authorization: authToken
            }
        })
        return response
    }

    static async getCourseByID({courseUuid, authToken}) {
        const response = await axios.get(`https://bauman-class.ru/api/v1/courses/${courseUuid}`, {
            headers: {
                Authorization: "Bearer " + authToken
            }
        })
        return response
    }
}