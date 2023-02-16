import React from "react";
import ReserveModule from "../ReserveModule/ReserveModule";
import './Card.css'


//todo make there be a way to edit preview image as well
//todo make spotshow card show multiple images not just first one
function SpotShowCard({spot}) {
    // const ulRef = useRef();
    // console.log('SpotShowCard', spot)
    //todo map all images if more than one to this container or import new component to display images in grid like manner
    //todo strange live site interaction where browser sorts array but also randomly sets preview image to new image??
    spot.SpotImages.sort((a, b) => {
        return a.id - b.id
    });
    let extraImages = spot.SpotImages.slice(1)
    // console.log("sliced", extraImages)

    // console.log("current images", spot.SpotImages)

    // let ulClassName = 'extra-imgs' + (spot?.SpotImages.length > 4 ? "" : " hidden");

    return (
       <div className="large-card-container">
        <div className="all-images-container">
            <div className="large-image-container">
                <img src={spot.SpotImages[0].url} alt='NOT FOUND'></img>
            </div>
            <div className="extra-images-container">
                {/* <ul> */}

            {
                extraImages.map(img => (
                    <img src={img.url} alt='nothing yet' key={img.id} className='extra-imgs'></img>
                    ))
                }
                {/* </ul> */}
            </div>
        </div>
        <div className="spot-sub-info">

                <div className="spot-body">
                    <h2>Hosted by {spot.Owner.firstName + ' ' + spot.Owner.lastName}</h2>
                    {/* <h2>${spot.price} night</h2> */}
                    <div className="detailed-description">
                        <p>{spot.description}</p>
                    </div>
                </div>
                <div className="reserve-container">
                    <ReserveModule spot={spot}></ReserveModule>
                </div>
        </div>
       </div>
    )
}


export default SpotShowCard
