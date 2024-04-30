import React from 'react';
import {useNavigate} from "react-router-dom";
import "./courseItem.css"
const CourseItem = () => {
    const navigate = useNavigate();
    return (
        <div className="course-item">
            <img src={"https://i.ibb.co/NtpbFKF/Image.jpg"}  className="course-item-image" alt={"img-name"}/>
            <div className="course-item-body">
                <div className="course-item-body-header">
                    Математический анализ
                </div>
                <button className="course-item-body-button" onClick={() => navigate("my-lessons")}>
                    Открыть
                </button>
            </div>
        </div>
    );
};

export default CourseItem;