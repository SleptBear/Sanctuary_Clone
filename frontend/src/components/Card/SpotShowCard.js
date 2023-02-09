import React from "react";
import './Card.css'

function SpotShowCard({spot}) {
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
