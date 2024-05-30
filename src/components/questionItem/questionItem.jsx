import React from 'react';
import MyInput from "../UI/input/MyInput";
import "./questionItem.css"
import {createTheme, Tooltip} from "@mui/material";
import * as PropTypes from "prop-types";

function MuiThemeProvider(props) {
    return null;
}

MuiThemeProvider.propTypes = {
    theme: PropTypes.any,
    children: PropTypes.node
};
const QuestionItem = (props) => {
    const theme = createTheme({
        components: {
            MuiTooltip: {
                styleOverrides: {
                    tooltip: {
                        backgroundColor: 'pink',
                        color: 'red',
                        border: '1px solid #dadde9',
                    },
                },
            },
        },
    });

    return (
        <div className="test-page-content-form-question-component">
            <div className="test-page-content-form-question-body-container">
                <div className="test-page-content-form-question-title">Вопрос {props.number}</div>
                {(props.question.type === "AI_CHECK" && props.isPassed)?
                    <Tooltip title={
                        <span style={{ fontSize: "16px"}}>{"Ответ проверен с помощью GigaChat"}</span>
                    }

                             slotProps={{
                                popper: {
                                    modifiers: [
                                        {
                                            name: 'offset',
                                            options: {
                                                offset: [0, -10],
                                            },
                                        },
                                    ],
                                },
                             }}
                    >
                <div className="test-page-content-form-question-body-icon-container">
                    <div className="test-page-content-form-question-body-icon-text">GigaChat</div>
                    <div className="test-page-content-form-question-body-icon"/>
                </div>
                    </Tooltip>
                    :
                    null
                }
            </div>
            <div className="test-page-content-form-question-body-title">{props.question.title}</div>

            {props.isPassed ?
                <MyInput className="test-page-content-form-question-input"
                         placeholder={"Ваш ответ"}
                         value={props.question.studentAnswer}
                         disabled={props.isPassed}
                         style={
                             props.question.studentQuestionMark ?
                                 {border: "1px solid #00A040", background: "#06C65320"} :
                                 {border: "1px solid #EF3826", background: "#EF382630"}
                         }
                />
                :
                <MyInput className="test-page-content-form-question-input"
                         placeholder={"Ваш ответ"}
                         value={props.question.studentAnswer}
                         onChange={e => props.setQuestion({...props.question, studentAnswer: e.target.value})}
                />
            }

        </div>
    );
};

export default QuestionItem;