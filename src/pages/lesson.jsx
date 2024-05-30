import React, {useContext, useState} from 'react';
import {useLoaderData, useNavigate, useParams} from "react-router-dom";
import "./lesson.css";
import SideMenu from "../components/sideMenu/sideMenu";
import NavBar from "../components/navBar/navBar";
import LessonList from "../components/lessonList/lessonList";
import NewMaterialFileList from "../components/newMaterialFileList/newMaterialFileList";
import toast from "react-hot-toast";
import {AuthContext} from "../context/AuthContext";
import TestService from "../API/services/TestService";
import LessonService from "../API/services/LessonService";

const LessonPage = () => {

    const params = useParams();
    const navigate = useNavigate();
    const {authData} = useContext(AuthContext);

    const loaderData = useLoaderData();
    console.log(loaderData)

    const [materials, setMaterials] = useState([]);
    const [description, setDescription] = useState(loaderData.lessonData.description);

    const removeMaterial = (material, e) => {
        e.stopPropagation();
        setMaterials(materials.filter(l => l.uuid !== material.uuid))
    }

    const addMaterial = (e) => {
        e.preventDefault();
        const newMaterial = {
            uuid: Date.now(),
            title: `Лекция ${materials.length + 1}.pdf`,
            url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
        }
        setMaterials([...materials, newMaterial])
    }


    const [tests, setTests] = useState(loaderData.testData);

    const removeTest = async (test, e) => {
        e.stopPropagation();
        await toast.promise(
            TestService.deleteTest({testUuid: test.uuid, authToken: authData.authToken}),
            {
                loading: 'Удаляю тест...',
                success: <b>Тест удален!</b>,
                error: <b>Ошибка. Не удалось удалить тест!</b>,
            }
        ).then((response) => {
            setTests(tests.filter(t => t.uuid !== test.uuid))
        }).catch(() => {

        })
    }

    const editDescription = async (desc, e) => {
        e.stopPropagation();
        await toast.promise(
            LessonService.editDescription({
                description: desc,
                lessonUuid: params.lesson,
                authToken: authData.authToken
            }),
            {
                loading: 'Обновляю описание...',
                success: <b>Описание обновлено!</b>,
                error: <b>Ошибка. Не удалось обновить описание!</b>,
            }
        ).catch(() => {

        })
    }


    if (authData.role === "TEACHER") return (
        <div className="page-header">
            <SideMenu/>
            <div className="content">
                <NavBar course={params.course}/>
                <div className="lesson-page-content">

                    <div className="lessons-page-content-container">
                        <div className="lesson-page-content-header">{loaderData.lessonData.title}</div>
                        <div className="lesson-page-content-form">
                            <div className="lesson-page-content-form-container">
                                <div className="lesson-page-content-form-row">
                                    <div className="lesson-page-content-form-description">
                                        <div className="lesson-page-content-form-description-header">Описание</div>
                                        <textarea className="lesson-page-content-form-description-input"
                                                  placeholder={"Описание урока"}
                                                  value={description}
                                                  onChange={(e) => setDescription(e.target.value)}
                                        ></textarea>
                                        <div className="lesson-page-content-form-description-button-container">
                                            <button
                                                className="lesson-page-content-form-description-button"
                                                onClick={async (e) => {
                                                    e.preventDefault();
                                                    await editDescription(description, e);
                                                }}
                                            >Сохранить
                                            </button>
                                        </div>

                                    </div>

                                    <div className="lesson-page-content-form-materials">
                                        <div className="lesson-page-content-form-materials-header">Материалы</div>

                                        <NewMaterialFileList remove={removeMaterial} title={"..."}
                                                             materials={materials}/>
                                        <div className="lesson-page-content-form-materials-button-container">
                                            <button className="lesson-page-content-form-materials-button"
                                                    type="submit"
                                                    onClick={(e) => addMaterial(e)}>Добавить
                                            </button>
                                        </div>

                                    </div>
                                </div>

                                <div className="lesson-page-content-form-tests">
                                    <div className="lesson-page-content-form-tests-header">Тесты</div>
                                    <div className="lesson-page-content-form-tests-files-list">
                                        <LessonList remove={removeTest} title={"На данный момент тестов нет..."}
                                                    lessons={tests}/>
                                    </div>
                                    <div className="lesson-page-content-form-test-button-container">

                                        <button className="lesson-page-content-form-test-button"
                                                onClick={() => navigate("add-new-test")}>Добавить тест
                                        </button>
                                    </div>
                                </div>
                                <div className="lesson-page-content-form-button-container">
                                    <button className="lesson-page-content-button"
                                            onClick={() => navigate("../")}>Сохранить
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    //Отображение страницы у ученика
    else return (
        <div className="page-header">
            <SideMenu/>
            <div className="content">
                <NavBar course={params.course}/>
                <div className="lesson-page-content">

                    <div className="lessons-page-content-container">
                        <div className="lesson-page-content-header">{loaderData.lessonData.title}</div>
                        <div className="lesson-page-content-form">
                            <div className="lesson-page-content-form-container">
                                <div className="lesson-page-content-form-row">
                                    <div className="lesson-page-content-form-description">
                                        <div className="lesson-page-content-form-description-header">Описание</div>
                                        <textarea
                                            className="lesson-page-content-form-description-input-student"
                                            value={description}
                                        ></textarea>
                                    </div>

                                    <div className="lesson-page-content-form-materials">
                                        <div className="lesson-page-content-form-materials-header">Материалы</div>

                                        <NewMaterialFileList remove={removeMaterial} title={"..."}
                                                             materials={materials}/>
                                    </div>
                                </div>

                                <div className="lesson-page-content-form-tests">
                                    <div className="lesson-page-content-form-tests-header">Тесты</div>
                                    <div className="lesson-page-content-form-tests-files-list">
                                        <LessonList title={"На данный момент тестов нет..."}
                                                    lessons={tests}/>
                                    </div>
                                </div>
                                <div className="lesson-page-content-form-button-container">
                                    <button className="lesson-page-content-button"
                                            onClick={() => navigate("../")}>Закрыть
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LessonPage;