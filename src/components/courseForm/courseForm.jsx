import React, {useEffect, useState} from 'react';
import MyInput from "../UI/input/MyInput";
import "./courseForm.css";
import courses from "../../pages/courses";

const CourseForm = ({create}) => {
    const [course, setCourse] = useState({title: '', desc: ''})
    const [checkData, setCheckData] = useState(false)

    const addNewCourse = async (e) => {
        e.preventDefault()
        await create(course)
        setCourse({title: '', desc: ''})
    }

    const checkIfValid = () => {
        for (const key in course) {
            if (course[key].length <= 1) {
                setCheckData(false)
                return;
            }
        }
        setCheckData(true)
    }

    useEffect(() => {
        checkIfValid()
    }, [course]);

    return (
        <form className="MyInput-form">
            <div className="MyInput-header">Добавить курс</div>
            <MyInput
                style={(course.title !== "" && course.title.length < 2)  ? {borderColor: "#EF3826"} : null}
                value={course.title}
                onChange={e => setCourse({...course, title: e.target.value})}
                type="text"
                placeholder="Название курса"
            />

            <MyInput
                style={(course.desc !== "" && course.desc.length < 2) ? {borderColor: "#EF3826"} : null}
                value={course.desc}
                onChange={e => setCourse({...course, desc: e.target.value})}
                type="text"
                placeholder="Описание курса"
            />
            <button className="MyInput-button"
                    style={!checkData ? {background: "white", color: "#4880FF", border: "2px solid #4880FF"} : {}}
                    disabled={!checkData}
                    onClick={async (e
                    ) => addNewCourse(e)}>Создать курс</button>
        </form>
    );
};

export default CourseForm;