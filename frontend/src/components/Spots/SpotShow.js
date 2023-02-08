import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { getSpot } from "../../store/spots";

import { deleteSpot } from '../../store/spots';
import { useHistory } from "react-router-dom";
import UpdateSpotFormButton from "./UpdateSpotFormButton";
import CreateReviewFormButton from "../CreateReviewFormModal/CreateReviewFormButton"
import ReviewsIndex from "../Reviews/ReviewsIndex";
import UserReviewsIndex from "../Reviews/UserReviewsIndex";
import SpotShowCard from "../Card/SpotShowCard";
import SpotCard from "../Card/SpotCard";
import DeleteReviewButton from "../DeleteReviewButton";

const SpotShow = () => {
    const dispatch = useDispatch();
    let history = useHistory();
    let { spotId } = useParams();
    const sessionUser = useSelector(state => state.session.user);
    const spot = useSelector(state => state.spot.spot)

    const [targetSpot, setTargetSpot] = useState('')
    const [spotImg, setSpotImg] = useState('')
    const [user, setUser] = useState('')

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

    useEffect(() => {
        console.log(spotId);
        setUser(spot.Owner);
        dispatch(getSpot(spotId))
        .then((res) => {
            setTargetSpot(res)

        })
    }, [])


    console.log("FROM SPOT UseSelector", spot)
    console.log("LOGGED IN USER FROM UseSelector", sessionUser)
    // console.log("FROM TARGET UseSelector", targetSpot)
    console.log("SPOT FROM USESTATE", targetSpot)



    let Owner = spot.Owner
    console.log("OWNER FROM SPOT", Owner)
    //key into spotImg array breaks code
    // const spotImg = spot.SpotImages[0]
    // const imgUrl = spotImg.url


    //maybe refactor to have delete comonent imported from its own file
    const deleteIndex = async (e) => {
        e.preventDefault();
        dispatch(deleteSpot(spotId))
        history.push('/')
    }



    //find better way of  returning home after delete
    // if(!spot.id) return history.push('/')

    // if(!user || !targetSpot.id || !spot) return null
    if(!Owner) return null
    // if(!spotImg) return null



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
