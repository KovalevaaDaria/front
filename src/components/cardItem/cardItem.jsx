import React, { useState} from 'react';
import {useNavigate} from "react-router-dom";
import "./cardItem.css"
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CardItem = (props) => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    return (
        <div className="card-item">
            <div className="card-item-img-container">
                <div className="card-item-bin" onClick={async (e) => props.remove(props.card, e)}></div>
                <img src={props.card.imageUrl} className="card-item-image" alt={props.card.name} loading={"lazy"} onLoad={() => setLoading(false)}/>
            </div>
            <div className="card-item-body">
                <div className="card-item-body-header">
                    {props.card.title}
                </div>
                <button className="card-item-body-button" onClick={() => navigate(props.card.uuid+'/lessons')}>
                    Перейти
                </button>
            </div>
        </div>
    );
};

export default CardItem;