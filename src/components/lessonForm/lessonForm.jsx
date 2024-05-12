import React, {useState} from 'react';
import MyInput from "../UI/input/MyInput";
import "./lessonForm.css"

const LessonForm = ({create, isLoading}) => {
    const [lesson, setlesson] = useState({title: ''})

    const addNewlesson = async (e) => {
        e.preventDefault()
        await create(lesson)
        setlesson({title: ''})
    }

    return (
        <form className="MyInput-lesson-container">
            <div className="MyInput-lesson-header">Добавить урок</div>
            <MyInput
                value={lesson.title}
                onChange={e => setlesson({...lesson, title: e.target.value})}
                type="text"
                placeholder="Название урока"
            />
            <button className="MyInput-lesson-button"
                    onClick={async (e) => addNewlesson(e)}
                    disabled={isLoading}
            >{isLoading ?"Загрузка..." : "Создать урок"}</button>
        </form>
    );
};

export default LessonForm;