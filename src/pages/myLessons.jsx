import React, {useContext, useState} from 'react';
import SideMenu from "../components/sideMenu/sideMenu";
import NavBar from "../components/navBar/navBar";
import "./myLessons.css"
import {useLoaderData, useParams} from "react-router-dom";
import LessonList from "../components/lessonList/lessonList";
import LessonForm from "../components/lessonForm/lessonForm";
import MyModal from "../components/myModal/myModal";
import LessonService from "../API/services/LessonService";
import {AuthContext} from "../context/AuthContext";
import toast from "react-hot-toast";


const MyLessons = () => {
    const {lessonsData, courseData} = useLoaderData();
    const {authData} = useContext(AuthContext);

    const [modal, setModal] = useState(false);
    const [isLoading, setLoading] = useState(false)

    const params = useParams();

    const [lessons, setLessons] = useState(lessonsData);

    const removeLesson = async (lesson, e) => {
        e.stopPropagation();
        await toast.promise(
            LessonService.deleteLesson({lessonUuid: lesson.uuid, authToken: authData.authToken}),
            {
                loading: 'Удаляю урок...',
                success: <b>Урок удален!</b>,
                error: <b>Ошибка. Не удалось удалить урок!</b>,
            }
        ).then((response) => {
            console.log(response)
            setLessons(lessons.filter(l => l.uuid !== lesson.uuid))
        }).catch(() => {

        })
    }

    const createLesson = async (newLesson) => {
        setLoading(true)
        await toast.promise(
            LessonService.addLesson({
                title: newLesson.title,
                description: "",
                courseUuid: params.course,
                authToken: authData.authToken
            }),
            {
                loading: 'Создаю урок...',
                success: <b>Урок создан!</b>,
                error: <b>Не удалось создать урок</b>,
            }
        )
            .then((response) => {
            setLessons([...lessons, {title: response.data.title, uuid: response.data.uuid}])
        })
        .finally(() => {
            setModal(false)
            setLoading(false)
        })
    }


    if (authData.role === "TEACHER") return (
        <div className="page-header">
            <SideMenu/>
            <div className="content">
                <NavBar course={params.course}/>
                <MyModal visible={modal} setVisible={setModal}>
                    <LessonForm create={createLesson} isLoading={isLoading}/>
                </MyModal>
                <div className="my-lessons-page-wrap">
                    <div className="my-lessons-page-content">
                        <div className="my-lessons-page-content-header">
                            <h1 className="my-lessons-page-title">Учебная группа</h1>
                            <div className="my-lessons-page-content-form">
                                <div className="courses-page-content-layout-form-invite-code">
                                    <div className="courses-page-content-layout-form-invite-code-title">Код
                                        приглашения:
                                    </div>
                                    <input className="courses-page-content-layout-form-invite-code-input"
                                           id="courses-page-content-layout-form-invite-code-input"
                                           disabled={true}
                                           value={courseData.inviteCode}>
                                    </input>
                                    <div className="courses-page-content-layout-form-invite-code-input-icon"
                                         onClick={() => {
                                             navigator.clipboard.writeText(document.getElementById('courses-page-content-layout-form-invite-code-input').value)
                                             toast.success("Код скопирован!")
                                         }
                                         }/>
                                </div>
                                <div className="my-lessons-page-content-form-header">{courseData.title}</div>
                                <div className="my-lessons-page-content-form-description">{courseData.description}
                                </div>
                            </div>
                        </div>

                        <div className="my-lessons-page-content-list">
                            <div className="my-lessons-page-content-list-row">
                                <div className="my-lessons-page-content-list-header">Уроки</div>
                                <button className="my-lessons-page-content-list-button"
                                        onClick={() => setModal(true)}>Добавить урок
                                </button>
                            </div>
                            <LessonList remove={removeLesson} title={"На данный момент уроков нет..."}
                                        lessons={lessons}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );

    //Отображение страницы у студента
    else return (
        <div className="page-header">
            <SideMenu/>
            <div className="content">
                <NavBar course={params.course}/>
                <div className="my-lessons-page-wrap">
                    <div className="my-lessons-page-content">
                        <div className="my-lessons-page-content-header">
                            <h1 className="my-lessons-page-title">Учебная группа</h1>
                            <div className="my-lessons-page-content-form">
                                <div className="my-lessons-page-content-form-header">{courseData.title}</div>
                                <div className="my-lessons-page-content-form-description">{courseData.description}
                                </div>
                            </div>
                        </div>

                        <div className="my-lessons-page-content-list">
                            <div className="my-lessons-page-content-list-row">
                                <div className="my-lessons-page-content-list-header">Уроки</div>
                            </div>
                            <LessonList title={"На данный момент уроков нет..."}
                                        lessons={lessons}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default MyLessons;