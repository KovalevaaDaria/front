import React, {useState} from 'react';
import SideMenu from "../components/sideMenu/sideMenu";
import NavBar from "../components/navBar/navBar";
import "./myLessons.css"
import {useNavigate} from "react-router-dom";
import LessonList from "../components/lessonList/lessonList";
import lesson from "./lesson";

const MyLessons = () => {
    const navigate = useNavigate();
    const [lessons, setLessons] = useState([]);

    const removeLesson = (lesson, e) => {
        e.stopPropagation();
        setLessons(lessons.filter(l=>l.id !== lesson.id))
    }

    const addLesson = (e) => {
        e.preventDefault();
        const newLesson = {
            id: Date.now(),
            title: `Урок ${lessons.length + 1}`,
        }
        setLessons([...lessons, newLesson])
    }

    return (
            <div className="page-header">
                <SideMenu/>
                <div className="content">
                    <NavBar/>
                    <div className="my-lessons-page-wrap">
                        <div className="my-lessons-page-content">
                            <div className="my-lessons-page-content-header">
                                <h1 className="my-lessons-page-title">Учебная группа</h1>
                                <div className="my-lessons-page-content-form">
                                    <div className="my-lessons-page-content-form-header">Математический анализ</div>
                                    <div className="my-lessons-page-content-form-description">Предназначен для студентов
                                        кафедры СГН3 “Информационная аналитика и политические технологии”
                                    </div>
                                </div>
                            </div>

                            <div className="my-lessons-page-content-list">
                                <div className="my-lessons-page-content-list-row">
                                    <div className="my-lessons-page-content-list-header">Уроки</div>
                                    <button className="my-lessons-page-content-list-button" onClick={addLesson}>Добавить урок</button>
                                </div>
                                <LessonList remove={removeLesson} title={"На данный момент уроков нет..."} lessons={lessons}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default MyLessons;