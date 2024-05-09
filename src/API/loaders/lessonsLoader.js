import LessonService from "../services/LessonService";


export const lessonsLoader = async ({params, authData, setModal, setError}) => {
    console.log(`fetching api data from course ${params.course} using token ${authData.authToken}`);
    const response = await LessonService.getAll({
        courseUuid: params.course,
        authToken: authData.authToken
    })
    console.log(response)
    if (response.status === 200) {
        return (await response).data
    } else {
        throw new Response("Not Found", { status: response.status });
    }
}