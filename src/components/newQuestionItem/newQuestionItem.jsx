import React from 'react';
import "./newQuestionItem.css"

const NewQuestionItem = (props) => {
    return (
        <div className="add-new-test-form-container-list-item">
            <div className="add-new-test-form-container-list-item-columns-container">
                <div className="add-new-test-form-container-list-item-column-1">
                    <div className="add-new-test-form-container-list-item-column-1-header">
                        Введите вопрос
                    </div>
                    <textarea className="add-new-test-form-container-list-item-column-1-input"
                              value={props.question.title}
                              onChange={e => props.setQuestion({...props.question, title: e.target.value})}
                              placeholder="Вопрос"

                    />
                    <div className="add-new-test-form-container-list-item-column-1-body">
                        <input
                            type={"checkbox"}
                            defaultChecked={true}
                            checked={props.question.type === "AUTO_CHECK"}
                            onClick={() => props.setQuestion({...props.question, type: "AUTO_CHECK"})}
                            id={"checkTeacherAnswerCheckbox" + props.question.id}
                            className="add-new-test-form-container-list-item-column-1-body-checkbox"></input>
                        <label htmlFor={"checkTeacherAnswerCheckbox" + props.question.id} className="add-new-test-form-container-list-item-column-1-body-text"
                        >Сравнить ответ студента с ответом преподателя</label>
                    </div>
                </div>
                <div className="add-new-test-form-container-list-item-column-2">
                    <div className="add-new-test-form-container-list-item-column-2-header">
                        Введите краткий или развернутый ответ
                    </div>
                    <textarea className="add-new-test-form-container-list-item-column-2-input"
                              value={props.question.teacherAnswer}
                              onChange={e => props.setQuestion({...props.question, teacherAnswer: e.target.value})}
                              placeholder="Ответ"
                              />
                    <div className="add-new-test-form-container-list-item-column-2-body">
                            <input
                                type="checkbox"
                                checked={props.question.type === "AI_CHECK"}
                                onClick={() => props.setQuestion({...props.question, type: "AI_CHECK"})}
                                id={"checkGptCheckbox" + props.question.id}
                                className="add-new-test-form-container-list-item-column-2-body-checkbox"
                            />
                            <label htmlFor={"checkGptCheckbox" + props.question.id}
                                   className="add-new-test-form-container-list-item-column-2-body-text">
                                Проверить развернутый ответ с помощью <label className="add-new-test-form-container-list-item-column-2-body-text-color">Chat GPT</label>
                            </label>
                    </div>
                </div>
            </div>
            <div className="add-new-test-form-container-list-item-button-container">
                <button className="add-new-test-form-container-list-item-button"
                        onClick={(e) => props.remove(props.question, e)}
                >
                    Удалить вопрос
                </button>
            </div>
        </div>
    );
};

export default NewQuestionItem;