import { useEffect, useState } from "react";
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
    let history = useHistory();
    let { spotId } = useParams();


    const sessionUser = useSelector(state => state.session.user);
    const spot = useSelector(state => state.spot.spot)

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


    return (
        <>
<section className="spotDetailsContainer">

        <div className="name">{spot.name}</div>
        <br></br>
        <div className="rating">
        Avg Rating {spot.avgStarRating} Stars with {spot.numReviews} Review(s)
        
        <UpdateSpotFormButton user={sessionUser} />
        </div>
        <br></br>
        <SpotShowCard spot={spot}></SpotShowCard>

<div >
    <hr></hr>

        <CreateReviewFormButton></CreateReviewFormButton>

        <ReviewsIndex></ReviewsIndex>

        <DeleteReviewButton></DeleteReviewButton>
<br></br>
        <button onClick={deleteIndex}>Delete Spot</button>

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
