import './App.css';
import {RouterProvider} from "react-router-dom";
import {AuthContext} from "./context/AuthContext";
import React, {useEffect, useState} from "react";
import {router} from "./router/router";
import ErrorForm from "./components/errorForm/errorForm";
import MyModal from "./components/myModal/myModal";
import {Toaster} from "react-hot-toast";

export default function App() {
    const [isAuth, setIsAuth] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [authData, setAuthData] = useState({userUuid: ""})
    const [modal, setModal] = useState(false);
    const [error, setError] = useState("")
    useEffect(() => {
        if (localStorage.getItem('auth')) {
            setIsAuth(true)
            // fetch userData by API
            setAuthData({...authData, authToken: localStorage.getItem('auth')})
        }
        setTimeout(() => {

        })
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