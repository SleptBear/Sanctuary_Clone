// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { getSpots } from "../store/spots";
import SpotDetails from "./SpotDetails";
import SpotsIndexItem from "./SpotsIndexItem";
import { Link } from "react-router-dom";




const SpotsIndex = () => {
    const dispatch = useDispatch();
    const spotsObj = useSelector(state => state.spot)
    const spots = Object.values(spotsObj)
    const spotsArray = spots[0]
    const data = spotsArray.Spots
    // console.log("LOOK", spots)
    // console.log("HERE", spotsArray)
    // console.log("NOW", spotsArray.Spots)
    // console.log("data", data)

    useEffect(() => {
        dispatch(getSpots())
    }, [dispatch])

    if(!data) return null

    return (

        <section>
            <ul>
                {
                    data.map(spot => (
                        <SpotsIndexItem
                        spot={spot}
                        key={spot.id}
                        />
                    ))
                }
            </ul>
            
        </section>
        // null
    )
}




export default SpotsIndex;
