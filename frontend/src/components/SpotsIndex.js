// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { getSpots } from "../store/spots";
import SpotDetails from "./SpotDetails";
import SpotIndexItem from "./SpotsIndexItem";




const SpotsIndex = () => {
    const dispatch = useDispatch();
    const spotsObj = useSelector(state => state.spot)
    const spots = Object.values(spotsObj)
    const spotsArray = spots[0]
    const data = spotsArray.Spots
    console.log("LOOK", spots)
    console.log("HERE", spotsArray)
    console.log("NOW", spotsArray.Spots)
    console.log("data", data)
    // const spotList = data.map((spot) =>
    //         <li>spot</li>
    // )

    useEffect(() => {
        dispatch(getSpots())
    }, [dispatch])


    return (
        // <div>
        //     <ul>
        //         {spotList}
        //     </ul>
        // </div>
    // return React.createElement(
    //     'div',
    //     null,
    //     React.createElement('h1', null, {data})
    // )

//     )
// }
        // <section>
        //     <ul>
        //         {
        //             data.map(spot => (
        //                 // <SpotDetails
        //                 // spot={spot}
        //                 // key={spot.id}
        //                 // />
        //             ))
        //         }
        //     </ul>
        // </section>


        // <section className="home-page">
        //     <ul>
        //         {
        //             data.map(spot => (
        //                 <SpotIndexItem
        //                     spot={spots}
        //                     key={spot.id}
        //                 />
        //             ))
        //         }
        //     </ul>
        // </section>
        null
    )
}




export default SpotsIndex;
