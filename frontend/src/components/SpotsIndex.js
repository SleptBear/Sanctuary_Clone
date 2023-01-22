import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { getSpots } from "../store/spots";
import SpotDetails from "./SpotDetails";
import SpotsIndexItem from "./SpotsIndexItem";
import { Link } from "react-router-dom";
import ReviewsIndex from "./ReviewsIndex";




const SpotsIndex = () => {
    const dispatch = useDispatch();
    const spotsObj = useSelector(state => state.spot.spots)
    const oneSpot = useSelector(state => state.spot.spot)
    const spots = Object.values(spotsObj)
    // const spotsArray = spots[0]
    // const data = spotsArray.Spots
    console.log("LOOK", spotsObj)
    console.log("HERE", spots)
    console.log("NOW")
    // console.log("data", data)

    useEffect(() => {
        dispatch(getSpots())
    }, [dispatch])

    if(!spots[0]) return null

    return (
<>
        <section>
            <ul>
                {
                    spots.map(spot => (
                        <SpotsIndexItem
                        spot={spot}
                        key={spot.id}
                        />
                        ))
                    }
            </ul>

        </section>

</>
    )
}




export default SpotsIndex;
