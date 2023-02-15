import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import './Card.css'


// function SpotCard({title, imageUrl, body}) {
function SpotCard({spot}) {
    // console.log(spot)
    const currentSpot = useSelector(state => state)
    // console.log(currentSpot)

    function checkStar() {
        if (spot.avgRating) {
        return <i className="fa-solid fa-star"></i>
        }
    }
    return (
       <div className="card-container">
            <div className="image-container">
                <img src={spot.previewImage} alt='NOT FOUND'></img>
            </div>
            {/* <br></br> */}
        <div className="card-info">

            <div className="card-title">
                <h3>{spot.city}, {spot.state} </h3>
                <h3>{checkStar()} {spot?.avgRating}</h3>
            </div>
            <div>
            </div>
            {/* <br></br> */}
            <div className="card-body">
                <div>$ {spot.price} night</div>
            </div>
        </div>
       </div>
    )
}


export default SpotCard
