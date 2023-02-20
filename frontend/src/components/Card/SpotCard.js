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
            // console.log(spot.avgRating)
        return <i className="fa-solid fa-star"></i>
        }
    }

    function checkAvg() {
        if ((Math.round(spot?.avgRating * 100)/100) === 0) {
            return null
        } else
        return (Math.round(spot?.avgRating * 100)/100)
    }

    function checkPrice() {
        let price = spot.price
        price = price.toLocaleString()
        // console.log(price)
        return price
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
                <h3>{checkStar()} {checkAvg()}</h3>
            </div>
            <div>
            </div>
            {/* <br></br> */}
            <div className="card-body">
                <div>$ {checkPrice()} night</div>
            </div>
        </div>
       </div>
    )
}


export default SpotCard
