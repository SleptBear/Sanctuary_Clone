import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from 'react-router-dom';
import { getSpot } from "../store/spots";
import SpotsIndex from "./SpotsIndex";

const SpotShow = () => {
    const dispatch = useDispatch();
    let { spotId } = useParams();
    // spotId = +spotId
    console.log(typeof spotId)

    // const [id, setId] = useState()


    const spotsObj = useSelector(state => state.spot.spot)
    console.log(spotsObj)

    const spots = Object.values(spotsObj)
    // const spot = useSelector(state => state.spot[+spotId])
    // const spots = Object.values(spot)
    console.log('object.values', spots)

    useEffect(() => {
        dispatch(getSpot(spotId))
    }, [])



    // const spotInfo = (e) => {
    //     e.preventDefault();
    // };

    return (
        <h2>OneSpotShow</h2>




    )
}



export default SpotShow;
