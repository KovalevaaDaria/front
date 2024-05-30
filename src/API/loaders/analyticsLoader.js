import CourseService from "../services/CourseService";


export const analyticsLoader = async ({authData, params}) => {
    return await CourseService.getCourseAnalytics({authToken: authData.authToken, courseUuid: params.course})
        .then(function (response) {
            return response.data
        })

}