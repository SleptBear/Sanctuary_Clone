import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { getSpot } from "../../store/spots";
import { deleteSpot } from '../../store/spots';
import UpdateSpotFormButton from "./UpdateSpotFormButton";
import CreateReviewFormButton from "../CreateReviewFormModal/CreateReviewFormButton"
import ReviewsIndex from "../Reviews/ReviewsIndex";
// import UserReviewsIndex from "../Reviews/UserReviewsIndex";
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
    }, [dispatch, spotId])


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

    function checkIfReview() {
        if (spot.numReviews === 0) {
            return "Be the first to leave us a Review!"
        } else {
            return (Math.floor(spot.avgStarRating * 100)/100)
        }
    }


    return (
        <>
<section className="spotDetailsContainer">

        <div className="name" style={{width:'80%'}}>{spot.name}</div>
        <br></br>
        <div style={{width:'80%'}}>

            <div className="location">
                {spot.city + ", " + spot.state + ", " + spot.country}
                <div style={{display:'flex'}}>
                    <UpdateSpotFormButton user={sessionUser} />
                    <button onClick={deleteIndex} className={ulClassName}>Delete Spot</button>
                </div>
            </div>
        </div>
        <br></br>
        <SpotShowCard spot={spot}></SpotShowCard>

<div className="review-section">

    <br></br>

    <hr style={{width:'100%'}}></hr>

    <br></br>

    <div className="rating-container">
        <i className="fa-solid fa-star"></i> {checkIfReview() + " · " + spot.numReviews} Review(s)
        <CreateReviewFormButton></CreateReviewFormButton>

    </div>

        <ReviewsIndex></ReviewsIndex>
        <br></br>

        {/* <DeleteReviewButton></DeleteReviewButton> */}
        <br></br>

</div>

</section>
</>
    )
}

export default SpotShow;
