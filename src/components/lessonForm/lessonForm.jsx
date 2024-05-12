import React, {useEffect, useState} from 'react';
import MyInput from "../UI/input/MyInput";
import "./lessonForm.css"

const LessonForm = ({create, isLoading}) => {
    const [lesson, setlesson] = useState({title: ''})
    const [checkData, setCheckData] = useState(false)

    const addNewlesson = async (e) => {
        e.preventDefault()
        await create(lesson)
        setlesson({title: ''})
    }

    const checkIfValid = () => {
        for (const key in lesson) {
            if (lesson[key].length <= 1) {
                setCheckData(false)
                return;
            }
        }
        setCheckData(true)
    }

    useEffect(() => {
        checkIfValid()
    }, [lesson]);

    return (
        <form className="MyInput-lesson-container">
            <div className="MyInput-lesson-header">Добавить урок</div>
            <MyInput
                style={(lesson.title !== "" && lesson.title.length < 2)  ? {borderColor: "#EF3826"} : null}
                value={lesson.title}
                onChange={e => setlesson({...lesson, title: e.target.value})}
                type="text"
                placeholder="Название урока"
            />
            <button className="MyInput-lesson-button"
                    style={!checkData ? {background: "white", color: "#4880FF", border: "2px solid #4880FF"} : {}}
                    onClick={async (e) => addNewlesson(e)}
                    disabled={!checkData}
            >{isLoading ?"Загрузка..." : "Создать урок"}</button>
        </form>
    );
};

export default LessonForm;