import Login from "../pages/login";
import CreateAccount from "../pages/createAccount";
import MainBaumanClass from "../pages/mainBaumanClass";
import Courses from "../pages/courses";
import Analyz from "../pages/analyz";
import MyLessons from "../pages/myLessons";
import LessonPage from "../pages/lesson";
import AddNewTest from "../pages/addNewTest";
import Account from "../pages/account";
import {createBrowserRouter, Navigate, Outlet} from "react-router-dom";
import Error from "../pages/error";
import React from "react";
import {lessonsLoader} from "../API/loaders/lessonsLoader";
import {coursesLoader} from "../API/loaders/coursesLoader";
import Test from "../pages/test";
import {accountLoader} from "../API/loaders/accountLoader";
import {testsLoader} from "../API/loaders/testsLoader";

export const router = (isLoggedIn, authData, setModal, setError, setAuthData, setIsAuth) => createBrowserRouter([

    {
        path: '/',
        element: !isLoggedIn ? <Outlet/> : <Navigate to="/courses"/>,
        children: [
            {path: '/', element: <MainBaumanClass/>},
            {path: '/login', element: <Login/>},
            {path: '/create-account', element: <CreateAccount/>},
        ],
    },
    {
        path: '/courses',
        element: isLoggedIn ? <Outlet/> : <Navigate to="/login"/>,
        children: [
            { path: '', element: <Courses/>, loader: async () => {
                    return coursesLoader({authData, setModal, setError, setIsAuth})}
            },
            {
                path: ':course', element: <Outlet/>,
                children: [
                    {path: 'analytics', element: <Analyz/>},
                    {path: 'lessons', component: <Outlet/>,
                        children: [
                            {path: '', element: <MyLessons/>, loader: async ({ params }) => {
                                    return lessonsLoader({params, authData, setModal, setError})},
                                errorElement: <Navigate to='/courses'/>,
                            },
                            {path: ':lesson', component: <Outlet/>
                                ,
                                children: [
                                    {path: '', element: <LessonPage/>, loader: async ({ params }) => {
                                            return testsLoader({params, authData, setModal, setError})}},
                                    {path: ':test', element: <Test/>},
                                    {path: 'add-new-test', element: <AddNewTest/>}
                                ]
                            }
                        ]
                    },
                ]
            }
        ],
    },
    {
        path: '/account',
        element: isLoggedIn ? <Account/> : <Navigate to="/login" l/>,
        loader: async ({params}) => {
            return accountLoader({authData, setModal, setError, setIsAuth, params})
        }
    },
    {
        path: '*',
        element:
            <Error/>
    }
]);

export const publicRoutes = [
    {path: '/', component: <MainBaumanClass/>, exact: true},
    {path: '/login', component: <Login/>, exact: true},
    {path: '/create-account', component: <CreateAccount/>, exact: true},
    {path: '*', component: <Navigate to={'/login'} replace={false}/>, exact: true},
]

export const privateRoutes = [
    {path: '/courses', component: <Courses/>, exact: true},
    {path: '/courses/:course/analytics', component: <Analyz/>, exact: true},
    {path: '/courses/:course/lessons', component: <MyLessons/>, exact: true},
    {path: '/courses/:course/lessons/:lesson', component: <LessonPage/>, exact: true},
    {path: '/courses/:course/lessons/:lesson/add-new-test', component: <AddNewTest/>, exact: true},
    {path: '/account', component: <Account/>, exact: true},
    {path: '*', component: <Navigate to={'/courses'} replace={true}/>, exact: true},
]
