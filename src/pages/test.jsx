import React, {useContext, useEffect, useState} from 'react';
import SideMenu from "../components/sideMenu/sideMenu";
import NavBar from "../components/navBar/navBar";
import "./test.css"
import QuestionList from "../components/questionList/questionList";
import {useLoaderData, useNavigate, useParams} from "react-router-dom";
import toast from "react-hot-toast";
import TestService from "../API/services/TestService";
import {AuthContext} from "../context/AuthContext";


const Test = () => {

    const navigate = useNavigate();
    const params = useParams();
    const testData = useLoaderData();
    const {authData} = useContext(AuthContext);

    const [checkData, setCheckData] = useState(false)
    const [isPassed, setIsPassed] = useState(testData.passed)

    const [questions, setQuestions] = useState(testData.questions.map(q => {return {...q, studentAnswer: ""}}));
    const [isLoading, setLoading] = useState(false);

    const [passed, setPassed] = useState(testData.questions);



    const checkIfValid = () => {
       for (const question in questions) {
                if (!questions[question].studentAnswer.length) {
                    setCheckData(false)
                    return;
                }
        }
        setCheckData(true)
    }

    useEffect(() => {
        checkIfValid()
    }, [questions]);

    const sendAnswers = async () => {
        setLoading(true)
        await toast.promise(
            TestService.checkTest({
                testUuid: params.test,
                authToken: authData.authToken,
                answers: questions.map(q => {
                    return {
                        questionUuid: q.uuid,
                        studentAnswer: q.studentAnswer
                    }
                })
            }),
            {
                loading: 'Отправляю ответы...',
                success: <b>Ответы отправлены!</b>,
                error: <b>Не удалось отправить ответы!</b>,
            }
        )
            .then((response) => {
                navigate('')
            })
            .catch(() => {

            })
            .finally(() => {
                setLoading(false)
            })


    }

    return (
        !isPassed ?
            <div className="page-header">
                <SideMenu/>
                <div className="test-content">
                    <NavBar course={params.course}/>
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
                                                style={!checkData || isLoading ? {
                                                    background: "white",
                                                    color: "#4880FF",
                                                    border: "2px solid #4880FF"
                                                } : {}}
                                                disabled={!checkData || isLoading}
                                                onClick={async () => {
                                                    await sendAnswers()
                                                }}>{isLoading? "Загрузка..." : "Завершить"}
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
                    <div className="test-page-wrap">
                        <div className="test-page-content">
                            <div className="test-page-content-header-container">
                                <div className="test-page-content-header">Результат теста</div>
                                {isPassed ?
                                    <div className="test-page-content-header-mark">
                                        Оценка: {passed.filter((q)=> q.studentQuestionMark === 1).length} / {passed.length}
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