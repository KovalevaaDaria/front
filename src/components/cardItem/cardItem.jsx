import React, { useState} from 'react';
import {useNavigate} from "react-router-dom";
import "./cardItem.css"
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import toast from "react-hot-toast";

const CardItem = (props) => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    if (props.student) return (
        <div
            className="card-item-student"
            onClick={() => toast("navigate(props.card.userUuid)")}
        >
            <div className="card-item-img-container-student">
                <img src={props.card.userUrl} className="card-item-image" alt={props.card.name} loading={"lazy"}
                     onLoad={() => setLoading(false)}/>
            </div>
            <div className="card-item-body-student">
                <div className="card-item-body-header-student">
                    {props.card.userFullName}
                </div>
                <div className="card-item-body-mark-student">
                    Оценка: {props.card.userTestMark}
                </div>
            </div>
        </div>
    )
    else return (
        <div className="card-item">
            <div className="card-item-img-container">
                {props.remove ?
                    <div className="card-item-bin" onClick={async (e) => props.remove(props.card, e)}></div>
                    :
                    <></>
                }
                <img src={props.card.imageUrl} className="card-item-image" alt={props.card.name} loading={"lazy"}
                     onLoad={() => setLoading(false)}/>
            </div>
            <div className="card-item-body">
                <div className="card-item-body-header">
                    {props.card.title}
                </div>
                <button className="card-item-body-button" onClick={() => navigate(props.card.uuid + '/lessons')}>
                    Перейти
                </button>
            </div>
        </div>
    );
};

export default CardItem;