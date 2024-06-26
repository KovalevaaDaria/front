import './App.css';
import {RouterProvider} from "react-router-dom";
import {AuthContext} from "./context/AuthContext";
import React, {useEffect, useState} from "react";
import {router} from "./router/router";
import ErrorForm from "./components/errorForm/errorForm";
import MyModal from "./components/myModal/myModal";
import {Toaster} from "react-hot-toast";
import AuthService from "./API/services/AuthService";
import Loader from "./components/loader/loader";

export default function App() {
    const [isAuth, setIsAuth] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [authData, setAuthData] = useState({userUuid: ""})
    const [modal, setModal] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        const authToken = localStorage.getItem('auth')
        const fetchData = async (authToken) => {
            return await AuthService.getUserInfo({authToken})
        }

        if (localStorage.getItem('auth')) {
            console.log("VALIDATING TOKEN")
            fetchData(authToken)
                .then(r => {
                    console.log(r)
                    if (r.data.message) {
                        localStorage.removeItem('auth')
                    } else {
                        setAuthData({...authData, authToken: authToken, role: r.data.role})
                        setIsAuth(true)
                    }
                })
                .catch(r => {
                    console.log("ERROR")
                    localStorage.removeItem('auth')
                })
                .finally(() => {
                    console.log("LOADED!")
                    setIsLoading(false)
                })
        } else {
            console.log("NO AUTH IN LOCAL")
            setIsLoading(false)
        }
    }, []);

    if (window.innerWidth < 1000) {
        return <div
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: "25px",
                flexDirection: "column",
                gap: "5vh"
            }}>
            <div className="homiak"></div>
            МОБИЛЬНАЯ ВЕРСИЯ НЕДОСТУПНА...
        </div>
    }

    return (
        isLoading ?
            <div className='loader-wrap'>
                <Loader/>
            </div>
            :
            <AuthContext.Provider value={{
                isAuth,
                setIsAuth,
                isLoading,
                setIsLoading,
                authData,
                setAuthData,
                setModal,
                setError
            }}>
                <MyModal visible={modal} setVisible={setModal}>
                    <ErrorForm error={error} setModal={setModal}/>
                </MyModal>
                <div><Toaster/></div>
                <RouterProvider router={router(isAuth, authData, setModal, setError, setAuthData, setIsAuth)}
                                fallbackElement={<></>}/>
            </AuthContext.Provider>
    );
}