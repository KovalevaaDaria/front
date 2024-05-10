import React, {useEffect, useState} from 'react';
import SideMenu from "../components/sideMenu/sideMenu";
import NavBar from "../components/navBar/navBar";
import "./test.css"
import QuestionList from "../components/questionList/questionList";
import {useNavigate} from "react-router-dom";

const Test = () => {

    const navigate = useNavigate();

    const [checkData, setCheckData] = useState(false)

    const [questions, setQuestions] = useState([
        {
            uuid: 1,
            question: "Как вы думаете можно ли посчитать объём и площадь через тройной интеграл?",
            answer: "",
        },
        {
            uuid: 2,
            question: "Как вы думаете можно ли посчитать объём и площадь через тройной интеграл?",
            answer: "",
        }
    ]);

    const checkIfValid = () => {
       for (const question in questions) {
                if (!questions[question].answer.length) {
                    setCheckData(false)
                    return;
                }
        }
        setCheckData(true)
    }

    useEffect(() => {
        checkIfValid()
    }, [questions]);

    return (
        <div className="page-header">
            <SideMenu/>
            <div className="test-content">
                <NavBar hasText={false}/>
                <div className="test-page-wrap">
                    <div className="test-page-content">
                        <div className="test-page-content-header">Тест по материалу</div>
                        <div className="test-page-content-form">
                                <div className="test-page-content-form-header">Тест</div>
                            <div className="test-page-content-form-wrapper-test">
                                <div className="test-page-content-form-title-wrapper-1">
                                    <div className="test-page-content-form-title-1">Название материала</div>
                                    <div className="test-page-content-form-text-1">Тест 7</div>
                                </div>
                                <div className="test-page-content-form-title-wrapper-2">
                                    <div className="test-page-content-form-title-2">Дата дедлайна</div>
                                    <div className="test-page-content-form-text-2">01.03.2024</div>
                                </div>

                                <QuestionList
                                    questions={questions}
                                    setQuestions={setQuestions}
                                />
                                <div className="test-page-content-button-container">
                                    <button className="test-page-content-button"
                                            style={!checkData ? {
                                                background: "white",
                                                color: "#4880FF",
                                                border: "2px solid #4880FF"
                                            } : {}}
                                            disabled={!checkData}
                                            onClick={() => navigate("../")}>Завершить
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Test;