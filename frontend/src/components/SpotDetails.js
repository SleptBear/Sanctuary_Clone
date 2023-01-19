import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getSpot } from "../store/spots";

const SpotDetails = ({ spot }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSpot(spot))
    }, [spot, dispatch])

    if(!spot) return null;

    return (
        <section>
            <h2>spot</h2>
        </section>
    )
}


export default SpotDetails
