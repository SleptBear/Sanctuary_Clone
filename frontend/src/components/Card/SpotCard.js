import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import './Card.css'


// function SpotCard({title, imageUrl, body}) {
function SpotCard({spot}) {

    return (
       <div className="card-container">
            <div className="image-container">
                <img src={spot.previewImage} alt='NOT FOUND'></img>
            </div>
            <br></br>
            <div className="card-title">
                <h3>{spot.city}, {spot.state}</h3>
            </div>
            <br></br>
            <div className="card-body">
                <div>$ {spot.price} night</div>
            </div>
       </div>
    )
}


export default SpotCard
