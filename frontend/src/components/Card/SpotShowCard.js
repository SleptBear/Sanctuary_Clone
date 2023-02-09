import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import './Card.css'


// function SpotCard({title, imageUrl, body}) {
function SpotShowCard({spot}) {
console.log("SPOT SHOW CARD", spot)
    return (
       <div className="large-card-container">
            <div className="large-image-container">
                <img src={spot.SpotImages[0].url} alt='NOT FOUND'></img>
            </div>


            <div className="spot-body">
                    <h2>{spot.description}</h2>
                    <h2>${spot.price} night</h2>
            </div>
       </div>
    )
}


export default SpotShowCard
