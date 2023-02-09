import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { getSpots } from "../../store/spots";
import SpotDetails from "./SpotDetails";
import SpotsIndexItem from "./SpotsIndexItem";
import { Link, useHistory } from "react-router-dom";
import ReviewsIndex from "../Reviews/ReviewsIndex";
import SpotCard from "../Card/SpotCard";




const SpotsIndex = () => {
    const dispatch = useDispatch();
    const spotsObj = useSelector(state => state.spot.spots)
    const spots = Object.values(spotsObj)

    // const [allSpots, setAllSpots] = useState({})

    // console.log("Selector Spots", spotsObj)
    // console.log("Array Spots", spots)
    // console.log("Selector Spot", oneSpot)

    useEffect(() => {
        dispatch(getSpots())
        // .then((res) => {
        //     setAllSpots(res)
        // })
        // console.log("ALL SPOTS", allSpots)

    }, [dispatch])

    if(!spots[0]) return null

    return (
<>
<div className="outside">

        <section className="body-container">
            <div className="body-container-items">

                {
                    spots.map(spot => (
                        <Link key={spot.id.toString()} to={`/spots/${spot.id}`}>
                        <SpotCard
                        spot={spot}
                        />
                    </Link>
                        ))
                    }

            </div>

        </section>
 </div>

</>
    )
}




export default SpotsIndex;
