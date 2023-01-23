import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { getSpots } from "../../store/spots";
import SpotDetails from "./SpotDetails";
import SpotsIndexItem from "./SpotsIndexItem";
import { Link, useHistory } from "react-router-dom";
import ReviewsIndex from "../Reviews/ReviewsIndex";




const SpotsIndex = () => {
    const dispatch = useDispatch();
    const [updatedSpot, setUpdatedSpot] = useState()
    const spotsObj = useSelector(state => state.spot.spots)
    const oneSpot = useSelector(state => state.spot.spot)
    const spots = Object.values(spotsObj)
    // const spotsArray = spots[0]
    // const data = spotsArray.Spots
    // console.log("LOOK", spotsObj)
    // console.log("HERE", spots)
    // console.log("NOW")
    // console.log("data", data)

    useEffect(() => {
        dispatch(getSpots())
    }, [setUpdatedSpot, useHistory])

    if(!spots[0]) return null

    return (
<>
<div className="outside">

        <section className="body-container">
            <div className="body-container-items">
                {
                    spots.map(spot => (
                        <SpotsIndexItem
                        spot={spot}
                        key={spot.id}
                        />
                        ))
                    }
            </div>

        </section>
                    </div>

</>
    )
}




export default SpotsIndex;
