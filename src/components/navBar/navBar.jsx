import React from 'react';
import "./navBar.css"
import {NavLink, useNavigate} from "react-router-dom";

const NavBar = ({hasText= true, course}) => {

    const navigate = useNavigate();

    return (
        <div className="nav-bar">
            <nav>
                {hasText === true ?
                (<><NavLink
                    to={"/courses/" + course + "/lessons"}
                    className={({isActive}) => (isActive ? "link-active" : "link")}
                >
                    Уроки
                </NavLink>
                    <NavLink
                        end
                    to={"/courses/" + course + "/analytics"}
                    className={({isActive}) => (isActive ? "link-active" : "link")}
                 >
                Аналитика
                </NavLink></>)
                    :
                    null
            }
            </nav>
            <div className="nav-bar-image" onClick={(e)=> {
                e.preventDefault();
                navigate("/account");
            }}></div>
        </div>
    );
};

export default NavBar;