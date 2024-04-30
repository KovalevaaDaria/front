import React from 'react';
import SideMenu from "../components/sideMenu/sideMenu";
import NavBar from "../components/navBar/navBar";
import {Redirect, useNavigate} from "react-router-dom";
import "./courses.css"
import CourseItem from "../components/curseList/courseItem";

const Courses = () => {
    const navigate = useNavigate();

    return (
        <div className="page-header">
            <SideMenu/>
            <div className="content">
                <NavBar hasText={false}/>
                <div className="courses-page-wrap">
                    <div className="courses-page-content">
                        <div className="courses-page-content-header">
                            <h1 className="courses-page-title">Курсы</h1>
                            <button className="courses-page-button-add-course" onClick={()=> navigate("/courses")}>Добавить курс</button>
                        </div>
                        <div className="courses-page-content-layout">
                            <div className="courses-page-content-layout-list">
                                <CourseItem/>
                                <CourseItem/>
                                <CourseItem/>
                                <CourseItem/>
                                <CourseItem/>
                                <CourseItem/>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Courses;