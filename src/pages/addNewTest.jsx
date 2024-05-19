import React, {useContext, useState} from "react";
import "./addNewTest.css"
import {useNavigate, useParams} from "react-router-dom";
import NewQuestionList from "../components/newQuestionList/newQuestionList";
import toast from "react-hot-toast";
import TestService from "../API/services/TestService";
import {AuthContext} from "../context/AuthContext";


const AddNewTest = () => {

    const navigate = useNavigate();
    const params = useParams();

    const [questions, setQuestions] = useState([])
    const [deadline, setDeadline] = useState("")
    const [testTheme, setTestTheme] = useState("")
    const [isLoading, setLoading] = useState(false);
    const [isValid, setIsValid] = useState(true);
    const {authData} = useContext(AuthContext);

    const checkIfValid =  () => {
        if (testTheme.length <= 3 || deadline.length === 0) {
            setIsValid(false)
            return false;
        }
        if (questions.length === 0) {
            setIsValid(false)
            toast.error("Добавьте хотя бы один вопрос!")
            return false;
        }
        for (const q in questions) {
            for (const key in questions[q]) {
                if (questions[q][key] === "") {
                    setIsValid(false)
                    toast.error("Заполните все поля вопросов!")
                    return false;
                }
            }
        }
        setIsValid(true)
        return true;
    }

    const removeQuestion = (question, e) => {
        e.stopPropagation();
        setQuestions(questions.filter(q => q.id !== question.id))
    }

    const setQuestion = (question) => {
        setQuestions(questions.map(q => {
            if (q.id === question.id) {
                return question
            } else {
                return q
            }
        }))
    }

    const addQuestion = (e) => {
        e.preventDefault();
        const newQuestion = {
            id: Date.now(),
            title: "",
            type: "AUTO_CHECK",
            teacherAnswer: ""
        }
        setQuestions([...questions, newQuestion])
    }

    const createTest = async () => {
        setLoading(true)
        await toast.promise(
            TestService.addTest({
                authToken: authData.authToken,
                title: testTheme,
                deadline: deadline+":00Z",
                lessonUuid: params.lesson,
                questions: questions.map(q => {
                    return {
                        title: q.title,
                        type: q.type,
                        teacherAnswer: q.teacherAnswer
                    }
                })
            }),
            {
                loading: 'Создаю тест...',
                success: <b>Тест создан!</b>,
                error: <b>Не удалось создать тест</b>,
            }
        )
            .then((response) => {
                navigate("../")
            })
            .catch(() => {

            })
            .finally(() => {
                setLoading(false)
            })
    }


    return (
        <div className="add-new-test-wrapp">
            <div className="add-new-test-form">
                <div className="add-new-test-form-container">
                    <div className="add-new-test-form-container-static-content">
                        <div className="add-new-test-form-header">Добавить новый тест</div>
                        <div className="add-new-test-form-content">
                            <div className="add-new-test-form-content-input-subject-text">
                                <div className="add-new-test-form-content-input-subject-text-title">
                                    <p className="add-new-test-form-content-text-title">Введите тему теста</p>
                                </div>
                                <input autoComplete="on" className="add-new-test-form-content-input-subject-text-input"
                                       style={testTheme.length <= 3 && !isValid ? {borderColor: "#EF3826"} : null}
                                       value={testTheme}
                                       onChange={e => setTestTheme(e.target.value)}
                                       placeholder="Тема теста"
                                />
                            </div>
                            <div className="add-new-test-form-content-input-deadline">
                                <div className="add-new-test-form-content-input-deadline-title">
                                    <p className="add-new-test-form-content-deadline-title">Дата дедлайна</p>
                                </div>
                                <input type={"datetime-local"} autoComplete="on"
                                       style={deadline === "" && !isValid ? {borderColor: "#EF3826"} : null}
                                       className="add-new-test-form-content-input-deadline-input"
                                       value={deadline}
                                       onChange={e => setDeadline(e.target.value)}
                                       placeholder="Дедлайн"
                                />
                            </div>
                        </div>
                    </div>
                    <NewQuestionList remove={removeQuestion} set={setQuestion} questions={questions}/>
                    <div className="add-new-test-form-container-button">
                        <button className="add-new-question-test-button"
                                onClick={(e) => addQuestion(e)}>Добавить вопрос
                        </button>
                    </div>
                    <div className="add-new-test-button-container">
                        <button className="add-new-test-button" type="submit"
                                disabled={isLoading}
                                onClick={async () => {
                                    if (checkIfValid()) {
                                        await createTest()
                                    }
                                }}>{isLoading? "Загрузка..." :"Добавить тест"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddNewTest;