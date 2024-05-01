import React, {useState} from 'react';
import SideMenu from "../components/sideMenu/sideMenu";
import NavBar from "../components/navBar/navBar";
import {useNavigate} from "react-router-dom";
import "./courses.css"
import CardList from "../components/cardList/cardList";
import slugger from "../slugger";
const courseList = [{name: "Математический анализ", img: "https://i.ibb.co/JkW4tYy/Image-2.jpg", nav: "my-lessons", id: Date.now()}]

const Courses = () => {
    const navigate = useNavigate();

    const [courses, setCourses] = useState(courseList);

    const removeCourse = (course, e) => {
        e.stopPropagation();
        setCourses(courses.filter(c=>c.id !== course.id))
    }

    const addCourse = (e) => {
        e.preventDefault();
        //post -> response

        const newCourse = {
            name: "Математический анализ", // response.data.title
            img: "https://i.ibb.co/JkW4tYy/Image-2.jpg", //response.data.img
            nav: slugger("Математический анализ"), //slugger(response.data.title)
            id: Date.now() // response.data.uuid
        }
        setCourses([...courses, newCourse])
    }

    return (
        <div className="page-header">
            <SideMenu/>
            <div className="content">
                <NavBar hasText={false}/>
                <div className="courses-page-wrap">
                    <div className="courses-page-content">
                        <div className="courses-page-content-header">
                            <h1 className="courses-page-title">Курсы</h1>
                            <button className="courses-page-button-add-course" onClick={addCourse}>Добавить курс</button>
                        </div>
                        <div className="courses-page-content-layout">
                            <CardList cards={courses} remove={removeCourse} title={"На данный момент курсов нет..."}/>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Courses;