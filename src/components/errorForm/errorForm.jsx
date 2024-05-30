import React from 'react';
import "./errorForm.css";

const ErrorForm = (props) => {
    return (
        <form className="Error-form">
            <div className="Error-header">Ошибка!</div>
            <div className="Error-text">{props.error}</div>
            <button className="Error-button" onClick={(e) => {
                e.preventDefault();
                props.setModal();
            }}
            >Закрыть
            </button>
        </form>
    );
};

export default ErrorForm;