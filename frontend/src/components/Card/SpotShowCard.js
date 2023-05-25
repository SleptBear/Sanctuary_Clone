import React from "react";
import ReserveModule from "../ReserveModule/ReserveModule";
import Bookings from "../Bookings"
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
    let urls = []
    extraImages.forEach(element => {
        urls.push(element.url)
    });
    // console.log("sliced", extraImages)
    // console.log("URLS", urls)
    while (urls.length < 4) {
        urls.push('https://cdn.pixabay.com/photo/2017/11/10/05/24/add-2935429_1280.png')
    }
    // console.log("URLs AFTER", urls)

    let firstUrls = urls.slice(0,2)
    let secondUrls = urls.slice(2)
    // let ulClassName = 'extra-imgs' + (spot?.SpotImages.length > 4 ? "" : " hidden");

    return (
       <div className="large-card-container">
        <div className="all-images-container">
            <div className="large-image-container">
                <img src={spot.SpotImages[0].url} alt='NOT FOUND'></img>
            </div>
            <div className="extra-images-container">
            {
                firstUrls.map((img, index) => (
                    <img src={img} alt='nothing yet' key={index} className='extra-imgs'></img>
                    ))
                }
            </div>
            <div className="extra-images-container">
            {
                secondUrls.map((img, index) => (
                    <img src={img} alt='nothing yet' key={index} className='extra-imgs'></img>
                    ))
                }
            </div>
        </div>
        {/* <div className="spot-sub-info">
                <div className="spot-body">
                    <h2>Hosted by {spot.Owner.firstName + ' ' + spot.Owner.lastName}</h2>
                    <div className="detailed-description">
                        <p>{spot.description}</p>
                    </div>
                </div>
                <div className="reserve-container">
                    <ReserveModule spot={spot}></ReserveModule>
                </div>
        </div> */}
       </div>
    )
}


export default SpotShowCard
