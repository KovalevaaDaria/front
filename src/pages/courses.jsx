import React, {useContext, useState} from 'react';
import SideMenu from "../components/sideMenu/sideMenu";
import NavBar from "../components/navBar/navBar";
import {useLoaderData} from "react-router-dom";
import "./courses.css"
import CardList from "../components/cardList/cardList";
import MyModal from "../components/myModal/myModal";
import CourseForm from "../components/courseForm/courseForm";
import toast from "react-hot-toast";
import CourseService from "../API/services/CourseService";
import {AuthContext} from "../context/AuthContext";

const Courses = () => {
    const data = useLoaderData();
    const {authData} = useContext(AuthContext);
    const [modal, setModal] = useState(false);
    const [courses, setCourses] = useState(data);
    const [isLoading, setLoading] = useState(false);

    const removeCourse = async (course, e) => {
        e.stopPropagation();
        await toast.promise(
            CourseService.deleteCourseByID({courseUuid: course.uuid, authToken: authData.authToken}),
            {
                loading: 'Удаляю курс...',
                success: <b>Курс удален!</b>,
                error: <b>Ошибка. Не удалось удалить курс!</b>,
            }
        ).then((response) => {
            setCourses(courses.filter(c=>c.uuid !== course.uuid))
        }).catch(() => {

        })
    }

    const createCourse = async (newCourse) => {
        setLoading(true)
        await toast.promise(
            CourseService.createCourse({
                title: newCourse.title,
                description: newCourse.desc,
                authToken: authData.authToken
            }),
            {
                loading: 'Создаю курс...',
                success: <b>Курс создан!</b>,
                error: <b>Не удалось создать курс</b>,
            }
        )
            .then((response) => {
                setCourses([...courses, {title: response.data.title, uuid: response.data.uuid, imageUrl: response.data.imageUrl}])
            })
            .catch(() => {

            })
            .finally(() => {
                setModal(false)
                setLoading(false)
            })
    }

    return (
        <div className="page-header">
            <SideMenu/>
            <MyModal visible={modal} setVisible={setModal}>
                <CourseForm create={createCourse}/>
            </MyModal>
            <div className="content">
                <NavBar hasText={false}/>
                <div className="courses-page-wrap">
                    <div className="courses-page-content">
                        <div className="courses-page-content-header">
                            <h1 className="courses-page-title">Курсы</h1>
                            <button className="courses-page-button-add-course" onClick={() => setModal(true)}>Добавить курс</button>
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