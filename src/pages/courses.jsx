import React from 'react';
import SideMenu from "../components/sideMenu/sideMenu";
import NavBar from "../components/navBar/navBar";
import {Redirect, useNavigate} from "react-router-dom";
import "./courses.css"

const Courses = () => {
    const navigate = useNavigate();

    return (
        <div className="page-header">
            <SideMenu/>
            <div className="content">
                <NavBar hasText={true}/>
                <div className="courses-page-wrap">
                    <div className="courses-page-content">
                        <div className="courses-page-content-header">
                            <h1 className="courses-page-title">Курсы</h1>
                            <button className="courses-page-button-add-course" onClick={()=> navigate("/courses")}>Добавить курс</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Courses;