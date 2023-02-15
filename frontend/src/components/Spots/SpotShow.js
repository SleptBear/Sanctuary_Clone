import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { getSpot, getSpots } from "../../store/spots";
import { deleteSpot } from '../../store/spots';
import UpdateSpotFormButton from "./UpdateSpotFormButton";
import CreateReviewFormButton from "../CreateReviewFormModal/CreateReviewFormButton"
import ReviewsIndex from "../Reviews/ReviewsIndex";
import UserReviewsIndex from "../Reviews/UserReviewsIndex";
import SpotShowCard from "../Card/SpotShowCard";
import DeleteReviewButton from "../DeleteReviewButton";

const SpotShow = () => {
    const dispatch = useDispatch();
    const ulRef = useRef();
    let history = useHistory();
    let { spotId } = useParams();


    const sessionUser = useSelector(state => state.session.user);
    const spot = useSelector(state => state.spot.spot)
    // const reviews = useSelector(state => state.reviews.spot)

    // console.log('spot state on details page', spot)

    let owner = spot.Owner


    useEffect(() => {
        dispatch(getSpot(spotId))
    }, [dispatch])


    //TODO refactor to have delete component imported from its own file
    const deleteIndex = async (e) => {
        e.preventDefault();
        if(owner.id === sessionUser.id) {
            dispatch(deleteSpot(spotId))
            history.push('/')
        }
    }

    //if spot does not exist return null
    if(!owner) return null
    //if parameters id does not match store id then do not render  jsx
    if (+spotId !== spot.id) return null

    let ulClassName = "delete-button" + (owner?.id === sessionUser?.id ? "" : " hidden");

    return (
        <>
<section className="spotDetailsContainer">

        <div className="name" style={{width:'80%'}}>{spot.name}</div>
        <br></br>
        <div style={{width:'80%'}}>

        <div className="location">
            {spot.city + ", " + spot.state + ", " + spot.country}
        <UpdateSpotFormButton user={sessionUser} />
            </div>
        </div>

        <SpotShowCard spot={spot}></SpotShowCard>

<div className="review-section">

    <hr style={{width:'100%'}}></hr>

    <div className="rating">
    <i className="fa-solid fa-star"></i> {spot.avgStarRating + " · " + spot.numReviews} Review(s)

        </div>
        <ReviewsIndex></ReviewsIndex>
        <br></br>
        <CreateReviewFormButton></CreateReviewFormButton>

        <DeleteReviewButton></DeleteReviewButton>
<br></br>
        <button onClick={deleteIndex} className={ulClassName}>Delete Spot</button>

</div>

</section>
</>
    )
}

export default SpotShow;

// const handleLoad = () => {
//     dispatch(getSpot(spotId))
//     .then((res) => {
//      setTargetSpot(res)
//      console.log(res)
//     })
// }

// useEffect(() => {
//     window.addEventListener('loadSpot', handleLoad)

//     return () => {
//         window.removeEventListener('loadSpot', handleLoad)
//     }
// }, [])
