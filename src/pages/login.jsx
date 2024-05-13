import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import "./login.css";
import {AuthContext} from "../context/AuthContext";
import AuthService from "../API/services/AuthService";

const Login = () => {
    const navigate = useNavigate();
    const {setIsAuth, setModal, setError, setAuthData, authData} = useContext(AuthContext);
    const [credentials, setCredentials] = useState({email: "", password: ""})

    const [checkData, setCheckData] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    const checkIfValid = () => {
        if (!isValidEmail(credentials.email) || credentials.password.length < 8) {
            setCheckData(false)
            return;
        }
        setCheckData(true)
    }

    useEffect(() => {
        checkIfValid()
    }, [credentials]);

    return (
        <div className="root-img">
            <div className="wrapper">
                <form className="log_in_form">
                    <div className="log_in_form__text">
                        <h1 className="log_in_form__header">Войти в аккаунт</h1>
                        <p className="log_in_form__par">Пожалуйста введите свои данные, чтобы продолжить</p>
                    </div>
                    <div className="log_in_form__login">
                        <p className="log_in_form__login__par">Логин</p>
                        <input autoComplete="on"
                               required={true}
                               type="email"
                               className="log_in_form__login__input"
                               placeholder="example@example.com"
                               value={credentials.email}
                               style={(!isValidEmail(credentials.email) && credentials.email.length) ? {borderColor: "#EF3826"} : {}}
                               onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                        />
                    </div>
                    <div className="log_in_form__password">
                        <div className="log_in_form__password__text ">
                            <p className="log_in_form__password__par">Пароль</p>
                        </div>
                        <input autoComplete="on" type="password" className="log_in_form__password__input"
                               required={true}
                               placeholder="veryhardpassword228007"
                               value={credentials.password}
                               style={(credentials.password.length < 8 && credentials.password.length) ? {borderColor: "#EF3826"} : {}}
                               onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                        />
                    </div>
                    <div className="log_in_form__button">
                        <button className="log_in_form__button__button" type="submit"
                                style={!checkData ? {
                                    background: "white",
                                    color: "#4880FF",
                                    border: "2px solid #4880FF"
                                } : {}}
                                disabled={!checkData || isLoading}
                                onClick={async (e) => {
                                    e.preventDefault()
                                    setIsLoading(true)
                                    await AuthService.login({
                                        email: credentials.email,
                                        password: credentials.password
                                    }).then(response => {
                                        console.log("THEN", response)
                                        if (response.data) {
                                            localStorage.setItem('auth', response.data.message);
                                            setAuthData({...authData, authToken: response.data.message});
                                            setIsAuth(true)
                                        }
                                    }).catch(response => {
                                        console.log("ERR", response)
                                        setError(response.status.toString() + ": " + response.error)
                                        setModal(true);
                                        }

                                    ).finally(() =>
                                        setIsLoading(false)
                                    )
                                }}>{isLoading ? 'Загрузка...' : 'Войти'}
                        </button>
                    </div>
                    <div className="log_in_form__create">
                        <p className="log_in_form__create__text">Нет аккаунта?</p>
                        <Link className="log_in_form__create__link" to={"/create-account"}>Создать аккаунт</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;