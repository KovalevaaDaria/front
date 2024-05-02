import Login from "../pages/login";
import CreateAccount from "../pages/createAccount";
import MainBaumanClass from "../pages/mainBaumanClass";
import Courses from "../pages/courses";
import Analyz from "../pages/analyz";
import MyLessons from "../pages/myLessons";
import LessonPage from "../pages/lesson";
import AddNewTest from "../pages/addNewTest";
import Account from "../pages/account";
import {Navigate} from "react-router-dom";


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
