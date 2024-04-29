import React from 'react';
import SideMenu from "../components/sideMenu/sideMenu";
import NavBar from "../components/navBar/navBar";
import "./analyz.css"

const Analyz = () => {
    return (
            <div className="page-header">
                <SideMenu/>
                <div className="content">
                    <NavBar/>
                    <div className="analyz-page-content"></div>
                </div>
            </div>
    );
};

export default Analyz;