import './App.css';
import {RouterProvider} from "react-router-dom";
import {AuthContext} from "./context/AuthContext";
import React, {useEffect, useState} from "react";
import {router} from "./router/router";
import ErrorForm from "./components/errorForm/errorForm";
import MyModal from "./components/myModal/myModal";
import {Toaster} from "react-hot-toast";
import AuthService from "./API/services/AuthService";

export default function App() {
    const [isAuth, setIsAuth] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const [authData, setAuthData] = useState({userUuid: ""})
    const [modal, setModal] = useState(false)
    const [error, setError] = useState("")


    useEffect(() => {
        if (localStorage.getItem('auth')) {
            const authToken = localStorage.getItem('auth')
            const data = AuthService.getUserInfo({authToken: authToken})
            data.then((response) => {
                if (response.message) {
                    setAuthData({...authData, authToken: authToken})
                    setIsAuth(true)
                } else {
                    setIsAuth(false)
                }
            })
        }
        setIsLoading(false)
    }, []);

    if (isLoading) return <></>

    return (
        isLoading ?
            <></>
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
            <RouterProvider router={router(isAuth, authData, setModal, setError, setAuthData)}
                            fallbackElement={<></>}/>
        </AuthContext.Provider>
    );
}