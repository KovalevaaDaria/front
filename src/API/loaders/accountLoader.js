import AuthService from "../services/AuthService";


export const accountLoader = async ({authData, setModal, setError, setIsAuth}) => {
    console.log(`fetching api data for account using token ${authData.authToken}}`);

    return await AuthService.getUserInfo({authToken: authData.authToken})
        .then(function (response) {
            return {...response.data, role: response.data.role === "TEACHER" ? "Преподаватель" : "Студент"}
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
            return {

            }
        })
}