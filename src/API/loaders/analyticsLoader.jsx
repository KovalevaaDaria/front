import AuthService from "../services/AuthService";
import CourseService from "../services/CourseService";


export const analyticsLoader = async ({authData, params}) => {
    console.log(`fetching api data for account using token ${authData.authToken}`);

    return await CourseService.getCourseAnalytics({authToken: authData.authToken, courseUuid: params.course})
        .then(function (response) {
            return response
        })

}