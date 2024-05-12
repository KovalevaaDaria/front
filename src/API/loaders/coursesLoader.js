import CourseService from "../services/CourseService";


export const coursesLoader = async ({authData, setModal, setError}) => {
    console.log(`fetching api data for courses using token ${authData.authToken}}`);

    return await CourseService.getAll({authToken: authData.authToken})
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            if (error.response) {
                setError(error.response.status.toString() + ": " + error.response.statusText)
            } else if (error.request) {
                setError("599: Connection Error")
            } else {
                setError("520: Unknown Error")
            }
            setModal(true)
            return [
                {
                    "uuid": "34561ff3-82ac-450b-9fbd-8f4483148e3e",
                    "title": "Математический Анализ 1",
                    "description": "что-то важное",
                    "img": "https://i.ibb.co/JkW4tYy/Image-2.jpg",
                },
            ]
        })
}