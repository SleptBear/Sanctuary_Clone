import { useEffect } from "react";
// import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { getSpot } from "../store/spots";
// import SpotsIndex from "./SpotsIndex";
// import SpotIndexItem from "./SpotsIndexItem";
import { deleteSpot } from '../store/spots';
import { useHistory } from "react-router-dom";
// import { useModal } from "../context/Modal";
import UpdateSpotFormButton from "./UpdateSpotFormButton";
import ReviewsIndex from "./ReviewsIndex";
import UserReviewsIndex from "./ReviewsIndex";

const SpotShow = () => {
    let history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    let { spotId } = useParams();
    const spot = useSelector(state => state.spot.spot)
    const User = spot.Owner

    useEffect(() => {
        dispatch(getSpot(spotId))
    }, [])


    const deleteIndex = async (e) => {
        e.preventDefault();
        dispatch(deleteSpot(spotId))
    }

    //find better way of  returning home after delete
    // if(!spot.id) return history.push('/')
    if(!User) return null

    return (
<>
        <section>
        ID: {spot.id}
        <br/>
        Country: {spot.country}
        <br/>
        City: {spot.city}
        <br/>
        <br/>
        Property Owner: {User.id}
        <br/>

        <button
        onClick={deleteIndex}>Delete</button>
        <UpdateSpotFormButton user={sessionUser} />

        {/* <br/> */}
        {/* <Link to="/">Back Home</Link> */}
      </section>
      <br></br>
      <section>
            <ReviewsIndex></ReviewsIndex>
        </section>
      {/* <section>
            <UserReviewsIndex></UserReviewsIndex>
        </section> */}
</>
    )
}



export default SpotShow;
