import {json} from "react-router-dom";


export const coursesLoader = async ({authData}) => {
    console.log(`fetching api data for courses using uuid ${authData.userUuid}}`);
    //API REQUEST
    // const resp = CourseService.getAll({})
    const response = json(
        [
            {
                "uuid": "34561ff3-82ac-450b-9fbd-8f4483148e3e",
                "title": "Математический Анализ 1",
                "description": "что-то важное",
                "img": "https://i.ibb.co/JkW4tYy/Image-2.jpg",
            },
        ], {status: 200}
    );
    if (response.status === 200) {
        return response
    } else {
        throw new Response("Not Found", { status: response.status });
    }
}