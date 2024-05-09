import React from 'react';
import QuestionItem from "../questionItem/questionItem";
import "./questionList.css"

const QuestionList = ({questions, setQuestions}) => {

    const setQuestion = (newQuestion) => {
        setQuestions(prevQuestions => {
            return prevQuestions.map(question => {
                if (question.uuid === newQuestion.uuid) {
                    return newQuestion;
                }
                return question;
            });
        });
    }

    return (
        <div className="test-page-content-form-question-component-list-container">
            {questions.map((question, index) =>
                <QuestionItem number={index + 1} question={question} key={question.uuid} setQuestion={setQuestion}/>
            )}
        </div>
    );
};

export default QuestionList;