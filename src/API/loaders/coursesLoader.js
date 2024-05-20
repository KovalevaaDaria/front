import CourseService from "../services/CourseService";


export const coursesLoader = async ({authData, setModal, setError, setIsAuth}) => {
    console.log(`fetching api data for courses using token ${authData.authToken}`);

    return await CourseService.getAll({authToken: authData.authToken})
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    setIsAuth(false)
                } else{
                    setError(error.response.status.toString() + ": " + error.response.statusText)
                    setModal(true)
                }
            } else if (error.request) {
                setError("599: Connection Error")
                setModal(true)
            } else {
                setError("520: Unknown Error")
                setModal(true)
            }
            return [
            ]
        })
}