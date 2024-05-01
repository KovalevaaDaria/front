import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/login";
import CreateAccount from "./pages/createAccount";
import MyLessons from "./pages/myLessons";
import Analyz from "./pages/analyz";
import Account from "./pages/account";
import LessonPage from "./pages/lesson";
import AddNewTest from "./pages/addNewTest";
import MainBaumanClass from "./pages/mainBaumanClass";
import Courses from "./pages/courses";

export default function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route index element={<MainBaumanClass/>}/>
            <Route path={"login"} element={<Login/>}/>
            <Route path={"create-account"} element={<CreateAccount/>}/>
            <Route path={"courses"} element={<Courses/>}/>
            <Route path={"courses/:course/analytics"} element={<Analyz/>}/>
            <Route path={"courses/:course/lessons"} element={<MyLessons/>}/>
            <Route path={"courses/:course/lessons/:lesson"} element={<LessonPage/>}/>
            <Route path={"courses/:course/lessons/:lesson/add-new-test"} element={<AddNewTest/>}/>
            <Route path={"account"} element={<Account/>}/>
        </Routes>
      </BrowserRouter>
  );
}