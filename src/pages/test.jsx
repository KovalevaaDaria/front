import React, {useEffect, useState} from 'react';
import SideMenu from "../components/sideMenu/sideMenu";
import NavBar from "../components/navBar/navBar";
import "./test.css"
import QuestionList from "../components/questionList/questionList";
import {useNavigate} from "react-router-dom";


const Test = () => {

    const navigate = useNavigate();

    const [checkData, setCheckData] = useState(false)
    const [isPassed, setIsPassed] = useState(false)

    const [questions, setQuestions] = useState([
        {
            uuid: 1,
            title: "Как вы думаете можно ли посчитать объём и площадь через тройной интеграл?",
            personAnswer: "",
        },
        {
            uuid: 2,
            title: "Как вы думаете можно ли посчитать объём и площадь через тройной интеграл?",
            personAnswer: "",
        }
    ]);

    const [passed, setPassed] = useState([
        {
            uuid: "497f6eca-6276-4993-bfeb-53cbbbba6f08",
            title: "Как вы думаете можно ли посчитать объём и площадь через тройной интеграл?Как вы думаете можно ли посчитать объём и площадь через тройной интеграл?",
            type: "MANUAL_CHECK",
            rightAnswer: "string",
            personAnswer: "null",
            chatCompletion: "null",
            personQuestionMark: 0,
            testUuid: "e6688975-26cf-4362-a41e-2436c0125eea"
        },
        {
            uuid: "497f6eca-6276-4993-bfeb-53cbbbba6f09",
            title: "string",
            type: "AI_CHECK",
            rightAnswer: "string",
            personAnswer: "null",
            chatCompletion: "Как вы думаете можно ли посчитать объём и площадь через тройной интеграл?Как вы думаете можно ли посчитать объём и площадь через тройной интеграл?\",\n",
            personQuestionMark: 0,
            testUuid: "e6688975-26cf-4362-a41e-2436c0125eea"
        },
        {
            uuid: "497f6eca-6276-4993-bfeb-53cbbbba6f10",
            title: "string",
            type: "MANUAL_CHECK",
            rightAnswer: "string",
            personAnswer: "null",
            chatCompletion: "null",
            personQuestionMark: 0,
            testUuid: "e6688975-26cf-4362-a41e-2436c0125eea"
        },
        {
            uuid: "497f6eca-6276-4993-bfeb-53cbbbba6f11",
            title: "string",
            type: "AI_CHECK",
            rightAnswer: "1234",
            personAnswer: "1234",
            chatCompletion: "null",
            personQuestionMark: 1,
            testUuid: "e6688975-26cf-4362-a41e-2436c0125eea"
        },
    ]);



    const checkIfValid = () => {
       for (const question in questions) {
                if (!questions[question].personAnswer.length) {
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
        !isPassed ?
            <div className="page-header">
                <SideMenu/>
                <div className="test-content">
                    <NavBar hasText={false}/>
                    <button onClick={() => setIsPassed(!isPassed)}>ПОМЕНЯТЬ</button>
                    <div className="test-page-wrap">
                        <div className="test-page-content">
                            <div className="test-page-content-header">Тест по материалу</div>
                            <div className="test-page-content-form">
                                <div className="test-page-content-form-header">Тест</div>
                                <div className="test-page-content-form-wrapper-test">
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
            :
            <div className="page-header">
            <SideMenu/>
                <div className="test-content">
                    <NavBar hasText={false}/>
                    <button onClick={() => setIsPassed(!isPassed)}>ПОМЕНЯТЬ</button>
                    <div className="test-page-wrap">
                        <div className="test-page-content">
                            <div className="test-page-content-header-container">
                                <div className="test-page-content-header">Тест по материалу (ПРОЙДЕН)</div>
                                {isPassed ?
                                    <div className="test-page-content-header-mark">
                                        Оценка: {passed.filter((q)=> q.personQuestionMark === 1).length} / {passed.length}
                                    </div>
                                    :
                                    null
                                }
                            </div>
                            <div className="test-page-content-form">
                                <div className="test-page-content-form-header">Тест</div>
                                <div className="test-page-content-form-wrapper-test">
                                    <div className="test-page-content-form-title-wrapper-2">
                                        <div className="test-page-content-form-title-2">Дата дедлайна</div>
                                        <div className="test-page-content-form-text-2">01.03.2024</div>
                                    </div>

                                    <QuestionList
                                        questions={passed}
                                        setQuestions={setPassed}
                                        isPassed
                                    />
                                    <div className="test-page-content-button-container">
                                        <button className="test-page-content-button"
                                                onClick={() => navigate("../")}>Вернуться
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