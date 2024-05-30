import TestService from "../services/TestService";


export const questionsLoader = async ({params, authData, setModal, setError}) => {
    console.log(`fetching api data from lesson ${params.lesson} using token ${authData.authToken}`);
    const response = await TestService.getTestByID({
        testUuid: params.test,
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
        return (await response).data
    } else {
        setError(response.status.toString() + ": " + response.error)
        setModal(true)
    }
}