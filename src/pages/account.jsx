import React from 'react';
import SideMenu from "../components/sideMenu/sideMenu";
import NavBar from "../components/navBar/navBar";
import "./account.css"
import {useNavigate} from "react-router-dom";

const Account = () => {
    const navigate = useNavigate();

    return (
            <div className="page-header">
                <SideMenu/>
                <div className="content">
                    <NavBar hasText={false}/>
                    <div className="account-page-wrap">
                        <div className="account-page-content">
                            <div className="account-page-content-header">
                                <h1 className="account-page-title">Личный кабинет</h1>
                                <button className="account-page-button-logout" onClick={()=> navigate("/")}>Выйти</button>
                            </div>

                            <div className="account-page-content-form">
                                <div className="account-page-content-form-wrapper">
                                    <div className="account-page-content-form-img">
                                        <div className="account-page-content-img"></div>
                                        <div className="account-page-content-img-text">Фото профиля</div>
                                    </div>

                                    <div className="account-page-content-form-all-rows">
                                        <div className="account-page-content-form-row-line-1">
                                            <div className="account-page-content-form-row-line-1-item-1">
                                                <p className="account-page-content-form-row-line-1-item-1-par">Имя</p>
                                                <input autoComplete="on"
                                                       className="account-page-content-form-row-line-1-item-1-input"
                                                       placeholder="Дарья"></input>
                                            </div>
                                            <div className="account-page-content-form-row-line-1-item-2">
                                                <p className="account-page-content-form-row-line-1-item-2-par">Фамилия</p>
                                                <input autoComplete="on"
                                                       className="account-page-content-form-row-line-1-item-2-input"
                                                       placeholder="Ковалева"></input>
                                            </div>
                                        </div>

                                        <div className="account-page-content-form-row-line-2">
                                            <div className="account-page-content-form-row-line-2-item-1">
                                                <p className="account-page-content-form-row-line-2-item-1-par">Отчество</p>
                                                <input autoComplete="on"
                                                       className="account-page-content-form-row-line-2-item-1-input"
                                                       placeholder="Максимовна"></input>
                                            </div>
                                            <div className="account-page-content-form-row-line-2-item-2">
                                                <p className="account-page-content-form-row-line-2-item-2-par">Почта</p>
                                                <input autoComplete="on"
                                                       className="account-page-content-form-row-line-2-item-2-input"
                                                       placeholder="jaskolski.brent@yahoo.com"></input>
                                            </div>
                                        </div>

                                        <div className="account-page-content-form-row-line-3">
                                            <div className="account-page-content-form-row-line-3-item-1">
                                                <p className="account-page-content-form-row-line-3-item-1-par">Учебная группа</p>
                                                <input autoComplete="on"
                                                       className="account-page-content-form-row-line-3-item-1-input"
                                                       placeholder="-"></input>
                                            </div>
                                            <div className="account-page-content-form-row-line-3-item-2">
                                                <p className="account-page-content-form-row-line-3-item-2-par">Роль</p>
                                                <input autoComplete="on"
                                                       className="account-page-content-form-row-line-3-item-2-input"
                                                       placeholder="Преподаватель"></input>
                                            </div>
                                        </div>

                                        <button className="account-page-content-form-row-button" onClick={() => navigate("/account")}>Сохранить</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default Account;