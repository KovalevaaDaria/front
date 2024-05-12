import axios from "axios";

export default class CourseService {


    static async createCourse({title, description, authToken}) {
        return await axios.post(`https://bauman-class.ru/api/v1/courses`, {
            title: title,
            description: description,
            imageUrl: "https://i.ibb.co/JkW4tYy/Image-2.jpg"
        },
            {
            headers: {
                Authorization:"Bearer " + authToken
            },
        })
    }

    static async deleteCourseByID({courseUuid, authToken}) {
        return await axios.delete(`https://bauman-class.ru/api/v1/courses/${courseUuid}`, {
            headers: {
                Authorization: "Bearer " + authToken
            }
        })
    }

    static async getAll({authToken}) {
        return await axios.get(`https://bauman-class.ru/api/v1/courses`, {
            headers: {
                Authorization: "Bearer " + authToken
            }
        })
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