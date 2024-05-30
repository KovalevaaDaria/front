import React, {useContext, useEffect, useState} from 'react';
import SideMenu from "../components/sideMenu/sideMenu";
import NavBar from "../components/navBar/navBar";
import "./account.css"
import {useLoaderData, useNavigate} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton from "react-loading-skeleton";
import toast from "react-hot-toast";
import AuthService from "../API/services/AuthService";


const Account = () => {
    const navigate = useNavigate();
    const accountData = useLoaderData();

    const [account, setAccount] = useState(accountData)
    const [checkData, setCheckData] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const {setIsAuth, authData} = useContext(AuthContext);

    const saveAccountData = async (account) => {
        await toast.promise(
            AuthService.changeAccountData({
                account: account,
                authToken: authData.authToken
            }),
            {
                loading: 'Обновляю данные...',
                success: <b>Данные обновлены!</b>,
                error: <b>Ошибка. Не удалось обновить данные!</b>,
            }
        ).then(() =>
            navigate(0)
        ).catch(() => {

        })
    }

    const checkIfValid = () => {
        if ( JSON.stringify(account) === JSON.stringify(accountData)) {
            setCheckData(false)
            return;
        }
        for (const key in account) {
            if (account[key] === "") {
                setCheckData(false)
                return;
            }
        }
        setCheckData(true)
    }

    useEffect(() => {
        checkIfValid()
    }, [account]);

    useEffect(() => {
        setAccount(accountData);
    }, [accountData]);

    return (
        <div className="page-header">
            <SideMenu/>
            <div className="content">
                <NavBar hasText={false}/>
                <div className="account-page-wrap">
                    <div className="account-page-content">
                        <div className="account-page-content-header">
                            <h1 className="account-page-title">Личный кабинет</h1>
                            <button className="account-page-button-logout" onClick={() => {
                                setIsAuth(false);
                                localStorage.removeItem('auth')
                                navigate("/")
                            }}>Выйти</button>
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
                                            <p className="account-page-content-form-row-line-1-item-1-par">Фамилия</p>
                                            <input autoComplete="on"
                                                   placeholder="Фамилия"
                                                   style={account.surname === "" ? {borderColor: "#EF3826"} : null}
                                                   value={account.surname}
                                                   onChange={e => setAccount({...account, surname: e.target.value})}
                                                   className="account-page-content-form-row-line-1-item-1-input"
                                                  />
                                        </div>
                                        <div className="account-page-content-form-row-line-1-item-2">
                                            <p className="account-page-content-form-row-line-1-item-2-par">Имя</p>
                                            <input autoComplete="on"
                                                   className="account-page-content-form-row-line-1-item-2-input"
                                                   style={account.name === "" ? {borderColor: "#EF3826"} : null}
                                                   placeholder="Имя"
                                                   value={account.name}
                                                   onChange={e => setAccount({...account, name: e.target.value})}
                                            />

                                        </div>
                                    </div>

                                    <div className="account-page-content-form-row-line-2">
                                        <div className="account-page-content-form-row-line-2-item-1">
                                            <p className="account-page-content-form-row-line-2-item-1-par">Отчество</p>
                                            <input autoComplete="on"
                                                   className="account-page-content-form-row-line-2-item-1-input"
                                                   placeholder="Отечество"
                                                   style={account.patronymic === "" ? {borderColor: "#EF3826"} : null}
                                                   value={account.patronymic}
                                                   onChange={e => setAccount({...account, patronymic: e.target.value})}
                                            />
                                        </div>
                                        <div className="account-page-content-form-row-line-2-item-2">
                                            <p className="account-page-content-form-row-line-2-item-2-par">Почта</p>
                                            <input autoComplete="on"
                                                   className="account-page-content-form-row-line-2-item-2-input"
                                                   placeholder="jaskolski.brent@yahoo.com"
                                                   disabled={true}
                                                   style={account.email === "" ? {borderColor: "#EF3826"} : null}
                                                   value={account.email}
                                                   onChange={e => setAccount({...account, email: e.target.value})}
                                            />
                                        </div>
                                    </div>
                                    <div className="account-page-content-form-row-line-3">
                                        <div className="account-page-content-form-row-line-3-item-1">
                                            <p className="account-page-content-form-row-line-3-item-1-par">Учебная
                                                группа</p>
                                            <input autoComplete="on"
                                                   className="account-page-content-form-row-line-3-item-1-input"
                                                   placeholder="-"
                                                   disabled={true}
                                                   style={account.group === "" ? {borderColor: "#EF3826"} : null}
                                                   value={account.group}
                                                   onChange={e => setAccount({...account, group: e.target.value})}
                                            />
                                        </div>
                                        <div className="account-page-content-form-row-line-3-item-2">
                                            <p className="account-page-content-form-row-line-3-item-2-par">Роль</p>
                                            <input autoComplete="on"
                                                   className="account-page-content-form-row-line-3-item-2-input"
                                                   placeholder="Преподаватель"
                                                   disabled={true}
                                                   style={account.role === "" ? {borderColor: "#EF3826"} : null}
                                                   value={account.role}
                                                   readOnly={true}
                                            />
                                        </div>
                                    </div>
                                    <div className="account-page-content-form-row-button-container">
                                        <button className="account-page-content-form-row-button"
                                                style={(!checkData || isLoading)? {background: "white", color: "#4880FF", border: "2px solid #4880FF"} : {}}
                                                disabled={!checkData || isLoading}
                                                onClick={async () => {
                                                    setIsLoading(true)
                                                    await saveAccountData(account)
                                                        .then(() => {
                                                            setIsLoading(false)
                                                        })
                                                    }
                                                }>{isLoading ? 'Загрузка...' : 'Сохранить'}
                                        </button>
                                    </div>
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