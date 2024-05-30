import LessonService from "../services/LessonService";
import CourseService from "../services/CourseService";


export const lessonsLoader = async ({params, authData, setModal, setError}) => {
    console.log(`fetching api data from course ${params.course} using token ${authData.authToken}`);
    const courseData = await CourseService.getCourseByID({
        courseUuid: params.course,
        authToken: authData.authToken
    });
    const response = await LessonService.getAll({
        courseUuid: params.course,
        authToken: authData.authToken
    })
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            if (error.response) {
                return {status: error.response.status, error: error.response.statusText}
            } else if (error.request) {
                console.log(error)
                return {status: 599, error: "Connection Error"}
            } else {
                return {status: 520, error: "Unknown Error"}
            }
        })
    if (response.status === 200) {
        return {
            lessonsData: (await response).data,
            courseData: (await courseData).data
    }
    } else {
        setError(response.status.toString() + ": " + response.error)
        setModal(true)
    }
}