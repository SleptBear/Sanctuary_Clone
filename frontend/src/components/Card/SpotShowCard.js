import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import './Card.css'


// function SpotCard({title, imageUrl, body}) {
function SpotShowCard({spot}) {

    return (
       <div className="large-card-container">
            <div className="large-image-container">
                <img src={spot.SpotImages[0].url} alt='NOT FOUND'></img>
            </div>
            <br></br>
            <div className="card-title">
                <h3>{spot.state}</h3>
            </div>
            <br></br>
            <div className="card-body">
                <h3>{spot.price}</h3>
            </div>
       </div>
    )
}


export default SpotShowCard
