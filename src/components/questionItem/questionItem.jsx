import React from 'react';
import MyInput from "../UI/input/MyInput";
import "./questionItem.css"

const QuestionItem = (props) => {

    return (
        <div className="test-page-content-form-question-component">
            <div className="test-page-content-form-question-title">Вопрос {props.number}</div>
            <div className="test-page-content-form-question-text">{props.question.question}
            </div>
            <MyInput className="test-page-content-form-question-input"
                     placeholder={"Ваш ответ"}
                     value={props.question.answer}
                     onChange={e => props.setQuestion({...props.question, answer: e.target.value})}
            />
        </div>
    );
};

export default QuestionItem;