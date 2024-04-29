import React from 'react';

const NewQuestionItem = (props) => {
    return (
        <div className="add-new-test-form-container-list-item">
            <div className="add-new-test-form-container-list-item-column-1">
                <div className="add-new-test-form-container-list-item-column-1-header">
                    Введите вопрос
                </div>
                <textarea className="add-new-test-form-container-list-item-column-1-input"
                          value={props.question.text}
                          placeholder="Вопрос"
                          onChange={e => props.question.onChange(e)}
                />
                <div className="add-new-test-form-container-list-item-column-1-body">
                    <input className="add-new-test-form-container-list-item-column-1-body-checkbox"></input>
                    <div className="add-new-test-form-container-list-item-column-1-body-text">Сравнить ответ студента с ответом преподателя</div>
                </div>
            </div>
            <div className="add-new-test-form-container-list-item-column-2">
                <div className="add-new-test-form-container-list-item-column-2-header"></div>
                <textarea className="add-new-test-form-container-list-item-column-2-input"></textarea>
                <div className="add-new-test-form-container-list-item-column-2-body">
                    <input
                        className="add-new-test-form-container-list-item-column-2-body-checkbox"></input>
                    <div className="add-new-test-form-container-list-item-column-2-body-text"></div>
                </div>
            </div>
        </div>
    );
};

export default NewQuestionItem;