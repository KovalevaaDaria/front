import React, {useState} from 'react';
import MyInput from "../UI/input/MyInput";
import "./courseForm.css";
import courses from "../../pages/courses";

const CourseForm = ({create}) => {
    const [course, setCourse] = useState({title: '', desc: ''})

    const addNewCourse = async (e) => {
        e.preventDefault()
        await create(course)
        setCourse({title: '', desc: ''})
    }

    return (
        <form className="MyInput-form">
            <div className="MyInput-header">Добавить курс</div>
            <MyInput
                value={course.title}
                onChange={e => setCourse({...course, title: e.target.value})}
                type="text"
                placeholder="Название курса"
            />

            <MyInput
                value={course.desc}
                onChange={e => setCourse({...course, desc: e.target.value})}
                type="text"
                placeholder="Описание курса"
            />
            <button className="MyInput-button" onClick={async (e) => addNewCourse(e)}>Создать курс</button>
        </form>
    );
};

export default CourseForm;