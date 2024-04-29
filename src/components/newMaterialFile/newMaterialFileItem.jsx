import React from 'react';
import "./newMaterialFileItem.css"
import {Link} from "react-router-dom";

const NewMaterialFileItem = (props) => {
    return (

        <div className="lesson-page-content-form-materials-files-item">
            <Link className="lesson-page-content-form-materials-files-item-text-icon" to={`https://icedrive.net/assets/frontend/img/laptop.png`}
                  download={"laptop.png"}
                  rel="noreferrer">
                <div
                    className="lesson-page-content-form-materials-files-item-icon"></div>
                <div
                    className="lesson-page-content-form-materials-files-item-text">{props.material.title}
                </div>
            </Link>
            <button
                className="lesson-page-content-form-materials-files-item-button" onClick={(e) => props.remove(props.material, e)}></button>
        </div>
    );
};

export default NewMaterialFileItem;