import React from "react";
import './Card.css'

//todo make there be a way to edit preview image as well
//todo make spotshow card show multiple images not just first one
function SpotShowCard({spot}) {
    console.log('SpotShowCard', spot)
    return (
       <div className="large-card-container">
            <div className="large-image-container">
                <img src={spot.SpotImages[spot.SpotImages.length - 1].url} alt='NOT FOUND'></img>
            </div>


            <div className="spot-body">
                    <h2>{spot.description}</h2>
                    <h2>${spot.price} night</h2>
            </div>
       </div>
    )
}


export default SpotShowCard
