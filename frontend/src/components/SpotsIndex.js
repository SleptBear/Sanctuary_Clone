// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { getSpots } from "../store/spots";
import SpotDetails from "./SpotDetails";
import SpotIndexItem from "./SpotsIndexItem";
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
    // const spotList = data.map((spot) =>
    //         <li>spot</li>
    // )

    useEffect(() => {
        dispatch(getSpots())
    }, [dispatch])

    if(!data) return null

    return (

        <section>
            <ul>
                {
                    data.map(spot => (
                        <SpotIndexItem
                        spot={spot}
                        key={spot.id}
                        />
                    ))
                }
            </ul>
            {/* <Link>Add Home to Listings</Link> */}
        </section>
        // null
    )
}




export default SpotsIndex;
