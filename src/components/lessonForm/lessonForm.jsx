import React, {useState} from 'react';
import MyInput from "../UI/input/MyInput";
import "./lessonForm.css"

const LessonForm = ({create}) => {
    const [lesson, setlesson] = useState({title: ''})

    const addNewlesson = (e) => {
        e.preventDefault()
        const newlesson = {
            ...lesson, id: Date.now()
        }
        create(newlesson)
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
            <button className="MyInput-lesson-button" onClick={addNewlesson}>Создать урок</button>
        </form>
    );
};

export default LessonForm;