import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from 'react-router-dom';
import { getSpot } from "../store/spots";
import SpotsIndex from "./SpotsIndex";
import SpotIndexItem from "./SpotsIndexItem";

const SpotShow = () => {
    const dispatch = useDispatch();
    let { spotId } = useParams();
    console.log(typeof spotId)

    // const [id, setId] = useState()


    const spot= useSelector(state => state.spot.spot)
    console.log("spots Obj", spot)

    // const spot = Object.values(spotsObj)
    // const spot = useSelector(state => state.spot[+spotId])
    // const spots = Object.values(spot)
    // console.log('object.values', spot)

    useEffect(() => {
        dispatch(getSpot(spotId))
    }, [dispatch])





    // const spotInfo = (e) => {
    //     e.preventDefault();
    // };

    return (
        <section>
        ID: {spot.id}
        <br/>
        Location: {spot.country}
        <br/>
        Owner: {spot.Owner.firstName}
        <br/>
        {/* <button onClick={}> */}

        {/* </button> */}
        <br/>
        <Link to="/">Back Home</Link>
      </section>
    )
}



export default SpotShow;
