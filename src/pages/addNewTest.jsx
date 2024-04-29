import React from "react";
import "./addNewTest.css"
import {useNavigate} from "react-router-dom";

const AddNewTest = () => {
    const navigate = useNavigate();

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
                                       placeholder="Тема теста"></input>
                            </div>
                            <div className="add-new-test-form-content-input-deadline">
                                <div className="add-new-test-form-content-input-deadline-title">
                                    <p className="add-new-test-form-content-deadline-title">Дата дедлайна</p>
                                </div>
                                <input autoComplete="on" className="add-new-test-form-content-input-deadline-input"
                                       placeholder="Дедлайн"></input>
                            </div>
                        </div>
                    </div>

                    <div className="add-new-test-form-container-list">




                    </div>

                    <div className="add-new-test-form-container-button">
                        <button className="add-new-question-test-button">Добавить вопрос</button>
                    </div>
                    <div className="add-new-test-button-container">
                        <button className="add-new-test-button" type="submit"
                                onClick={() => navigate("/courses/my-lessons/lesson")}>Добавить тест
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddNewTest;