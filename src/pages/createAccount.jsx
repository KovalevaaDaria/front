import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import "./createAccount.css"
import ErrorForm from "../components/errorForm/errorForm";
import MyModal from "../components/myModal/myModal";
import {AuthContext} from "../context/AuthContext";
import AuthService from "../API/services/AuthService";

const CreateAccount = () => {
    const navigate = useNavigate();
    const [pageState, setPageState] = useState(false);
    const {setIsAuth, setAuthData} = useContext(AuthContext);
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
        role: "STUDENT",
        surname: "",
        name: "",
        patronymic: ""
    })
    const [modal, setModal] = useState(false);
    const [checkData, setCheckData] = useState({first: false, second: false})

    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    function isValidText(text) {
        return /^[А-ЯЁ][а-яё]+$/.test(text);
    }

    const checkIfValid = () => {
        if (!isValidEmail(credentials.email) || credentials.password.length < 8) {
            setCheckData({...checkData, first: false})
            return;
        } else {
            if (!isValidText(credentials.name) || !isValidText(credentials.surname) || (!isValidText(credentials.patronymic) && credentials.patronymic.length)) {
                setCheckData({first: true, second: false})
                return;
            }
            setCheckData({first: true, second: true})

        }
    }

    useEffect(() => {
        checkIfValid()
    }, [credentials]);

    if (pageState) {
        return (
            <div className="root-img">
                <MyModal visible={modal} setVisible={setModal}>
                    <ErrorForm error={error} setModal={setModal}/>
                </MyModal>
                <div className="wrapper_create_account">
                    <div className="create_account_form">
                        <div className="create_account_back_icon" onClick={() => setPageState(false)}></div>
                        <h1 className="create_account_form__header">Создать аккаунт</h1>
                        <p className="create_account_form__par">Создайте аккаунт, чтобы продолжить</p>

                        <div className="create_account_form__password">
                            <div className="create_account_form__password__text">
                                <p className="create_account_form__password__par">Фамилия</p>
                            </div>
                            <input autoComplete="on" type="surname" className="create_account_form__password__input"
                                   value={credentials.surname}
                                   style={(credentials.surname.length < 2 && credentials.surname) ? {borderColor: "#EF3826"} : {}}
                                   onChange={(e) => setCredentials({...credentials, surname: e.target.value})}
                                   placeholder="Тассов"></input>
                        </div>

                        <div className="create_account_form__login">
                            <div className="create_account_form__login__text">
                                <p className="create_account_form__login__par">Имя</p>
                            </div>
                            <input autoComplete="on" type="name" className="create_account_form__login__input"
                                   value={credentials.name}
                                   style={(credentials.name.length < 2 && credentials.name.length) ? {borderColor: "#EF3826"} : {}}
                                   onChange={(e) => setCredentials({...credentials, name: e.target.value})}
                                   placeholder="Кирилл"></input>
                        </div>

                        <div className="create_account_form__password">
                            <div className="create_account_form__password__text">
                                <p className="create_account_form__password__par">Отчество (Если есть)</p>
                            </div>
                            <input autoComplete="on" type="patronymic" className="create_account_form__password__input"
                                   value={credentials.patronymic}
                                   onChange={(e) => setCredentials({...credentials, patronymic: e.target.value})}
                                   placeholder="Леонидович"></input>
                        </div>

                        <div className="create_account_form__button">
                            <button className="create_account_form__button__button" type="submit"
                                    style={!checkData.second ? {
                                        background: "white",
                                        color: "#4880FF",
                                        border: "2px solid #4880FF"
                                    } : {}}
                                    disabled={!checkData.second || isLoading}
                                    onClick={async (e) => {
                                        e.preventDefault()
                                        console.log(credentials)
                                        setIsLoading(true)
                                        const response = await AuthService.register({
                                            email: credentials.email,
                                            password: credentials.password,
                                            role: credentials.role,
                                            surname: credentials.surname,
                                            name: credentials.name,
                                            patronymic: credentials.patronymic
                                        })
                                        console.log("RESPONSE", response);
                                        if (response.status === 200) {
                                            setIsAuth(true);
                                            localStorage.setItem('auth', response.data.message);
                                            navigate('/courses', {replace: true});
                                        } else {
                                            setError(response.status.toString() + ": " + response.error)
                                            setModal(true);
                                        }
                                        setIsLoading(false)
                                    }}>{isLoading ? 'Загрузка...' : 'Зарегестрироваться'}
                            </button>
                        </div>
                        <div className="create_account_form__create">
                            <p className="create_account_form__create__text">Уже есть аккаунт?</p>
                            <Link className="create_account_form__create__link" to={"/login"}>Войти</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="root-img">
                <div className="wrapper_create_account">
                    <div className="create_account_form">
                        <h1 className="create_account_form__header">Создать аккаунт</h1>
                        <p className="create_account_form__par">Создайте аккаунт, чтобы продолжить</p>

                        <div className="create_account_form__login">
                            <div className="create_account_form__login__text">
                                <p className="create_account_form__login__par">Логин</p>
                            </div>
                            <input autoComplete="on" type="email"
                                   value={credentials.email}
                                   style={(credentials.password.email < 8 && credentials.password.email) ? {borderColor: "#EF3826"} : {}}
                                   onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                                   className="create_account_form__login__input"
                                   placeholder="example@example.com"/>
                        </div>
                        <div className="create_account_form__password">
                            <div className="create_account_form__password__text">
                                <p className="create_account_form__password__par">Пароль</p>
                            </div>
                            <input autoComplete="on" type="password"
                                   value={credentials.password}
                                   style={(credentials.password.length < 8 && credentials.password.length) ? {borderColor: "#EF3826"} : {}}
                                   onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                                   className="create_account_form__password__input"
                                   placeholder="veryhardpassword228007"></input>
                        </div>

                        <div className="create_account_form__role_selector">
                            <div className="create_account_form__role_selector__text">
                                <p className="create_account_form__role_selector__par">Роль</p>
                            </div>
                            <div className="role_selector">
                                <input type="radio" name="role" id="student" value="student"
                                       onClick={() => setCredentials({...credentials, role: "STUDENT"})}
                                       checked={credentials.role === "STUDENT"}/>
                                <label htmlFor="student" className="student">Студент</label>
                                <input type="radio" name="role" id="teacher" value="teacher"
                                       onClick={() => setCredentials({...credentials, role: "TEACHER"})}
                                       checked={credentials.role === "TEACHER"}
                                />
                                <label htmlFor="teacher" className="teacher">Преподаватель</label>
                            </div>
                        </div>

                        <div className="create_account_form__button">
                            <button className="create_account_form__button__button" type="submit"
                                    style={!checkData.first ? {
                                        background: "white",
                                        color: "#4880FF",
                                        border: "2px solid #4880FF"
                                    } : {}}
                                    disabled={!checkData.first}
                                    onClick={() => setPageState(true)}>Продолжить
                            </button>
                        </div>
                        <div className="create_account_form__create">
                            <p className="create_account_form__create__text">Уже есть аккаунт?</p>
                            <Link className="create_account_form__create__link" to={"/login"}>Войти</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default CreateAccount;