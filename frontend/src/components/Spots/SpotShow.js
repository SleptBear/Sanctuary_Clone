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
    // const spotStore = useSelector(state => state.spot)
    // let spot = spotStore.spot
    // let spots = spotStore.spots
    const spot = useSelector(state => state.spot.spot)
    // const spots = useSelector(state => state.spot.spots)

    let owner = spot.Owner
    console.log("History", history)

    useEffect(() => {
        // console.log("LOOOOOK", spots[spotId])
        // if (!spots[spotId]) dispatch(getSpots())
        //only want this to run if spots store state falsey..key into {}
        // dispatch(getSpot(spotId))
        // .then((res) => {
        //     setTargetSpot(res)
        // })
        // console.log("TARGET SPOT", targetSpot)
    }, [dispatch])

    useEffect(() => {
        dispatch(getSpot(spotId))

    }, [dispatch])

    // console.log("OWNER FROM SPOT", Owner)
    // console.log("FROM SPOT UseSelector", spot)
    // console.log("LOGGED IN USER FROM UseSelector", sessionUser)
    // console.log("SPOT FROM USESTATE", targetSpot)

    //TODO refactor to have delete component imported from its own file
    const deleteIndex = async (e) => {
        e.preventDefault();
        console.log(owner.id)
        console.log(sessionUser.id)
        if(owner.id === sessionUser.id) {
            dispatch(deleteSpot(spotId))
            history.push('/')
        }
    }
    if(!owner) return null
    console.log("SPOT SHOW", spot)
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
