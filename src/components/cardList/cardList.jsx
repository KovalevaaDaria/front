import React from 'react';
import CardItem from "../cardItem/cardItem";
import "./cardList.css";

const CardList = ({cards, remove, title, student}) => {

    if (!cards.length) {
        return (
            <div className="courses-page-content-layout-header-container">
                <h1 className="courses-page-content-layout-header" style={{textAlign: "center"}}>
                    {title}
                </h1>
            </div>
        )
    }

    return (

        <div className={"card-list" + (student? "-student" : "")}>
            {cards.map((card, index) =>
                <CardItem remove={remove} student={student} card={card} key={index}/>
            )}
        </div>
    );
};

export default CardList;