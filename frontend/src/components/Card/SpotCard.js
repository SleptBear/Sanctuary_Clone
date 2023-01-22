import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import './Card.css'


function SpotCard({title, imageUrl, body}) {



    return (
       <div className="card-container">
            <div className="image-container">
                <img src={imageUrl} alt=''></img>
            </div>
            <div className="card-title">
                <h3>{title}</h3>
            </div>
            <div className="card-body">
                <p>{body}</p>
            </div>
       </div>
    )
}


export default SpotCard
