import React from 'react';
import "./navBar.css"
import {NavLink} from "react-router-dom";

const NavBar = ({hasText= true}) => {
    return (
        <div className="nav-bar">
            <nav>
                {hasText === true ?
                (<><NavLink
                    to="/courses/my-lessons"
                    className={({isActive}) => (isActive ? "link-active" : "link")}
                >
                    Уроки
                </NavLink>
                    <NavLink
                    to="/courses/analyz"
                    className={({isActive}) => (isActive ? "link-active" : "link")}
                 >
                Аналитика
                </NavLink></>)
                    :
                    null
            }
            </nav>
            <div className="nav-bar-image">Ава</div>
        </div>
    );
};

export default NavBar;