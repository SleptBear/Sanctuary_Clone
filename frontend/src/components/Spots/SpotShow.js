import { useEffect, useRef, useState } from "react";
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
import ReserveModule from "../ReserveModule/ReserveModule";

const SpotShow = () => {
    const dispatch = useDispatch();
    const ulRef = useRef();
    let history = useHistory();
    let { spotId } = useParams();
    const [errors, setErrors] = useState([]);


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
            .then(async (res) => {

                history.push(`/`)

              })
              .catch(async (res) => {
                const data = await res.json();
                // console.log("data from api", data)
                if (data && data.errors) setErrors(data.errors)
                // console.log('ERRORS', errors)
              });
        }
    }

    //if spot does not exist return null
    if(!owner) return null
    //if parameters id does not match store id then do not render  jsx
    if (+spotId !== spot.id) return null

    let ulClassName = "delete-button" + (owner?.id === sessionUser?.id ? "" : " hidden");

    function checkIfReview() {
        if (spot.numReviews === 0) {
            return "No Reviews Yet!"
        } else {
            return ((Math.floor(spot.avgStarRating * 100)/100)).toLocaleString()
        }
    }


    return (
        <>
<section className="spotDetailsContainer">
    <div className="spotShowContainer">


            <div id="name">
        <div className="name">
                {spot.name}</div>
            </div>
        <br></br>
        <div id='location'>

            <div className="location">
                {spot.city + ", " + spot.state + ", " + spot.country}
                <div style={{display:'flex'}}>
                    <UpdateSpotFormButton user={sessionUser} />
                    <button onClick={deleteIndex} className={ulClassName} id="gray-button">Destroy Sanctuary</button>
                </div>
            </div>
        </div>
        <br></br>

        <SpotShowCard spot={spot}></SpotShowCard>
        <div id="review-section">

<div className="review-section">
    <div id="spot-show-left">

        <div className="spot-sub-info">
                <div className="spot-body">
                    <h2>Hosted by {spot.Owner.firstName + ' ' + spot.Owner.lastName}</h2>
                    {/* <h2>${spot.price} night</h2> */}
                    <div className="detailed-description">
                        {/* {console.log(spot.description.length)} */}
                        <h1>Important Details</h1>
                        <p>{spot.description}</p>
                    </div>
                </div>
                {/* <div className="reserve-container">
                    <ReserveModule spot={spot}></ReserveModule>
                </div> */}
        </div>

    <hr style={{width:'100%'}}></hr>

    <br></br>
<div>

</div>
<div id="below-card">

</div>
    <h2 className="rating-container">
        <i className="fa-solid fa-star"></i> {checkIfReview() + " · " + spot.numReviews} review(s)

    </h2>
    <br></br>
    <br></br>

        <ReviewsIndex></ReviewsIndex>
        <br></br>

        {/* <DeleteReviewButton></DeleteReviewButton> */}
        <br></br>
        <br></br>
        <CreateReviewFormButton></CreateReviewFormButton>
        <br></br>
        <hr style={{width:'100%'}}></hr>

</div>
<div id="spot-show-right">
    <br></br>
    <br></br>
<div className="reserve-container">
                    <ReserveModule spot={spot}></ReserveModule>
                </div>
</div>

</div>
                </div>
                </div>
</section>
</>
    )
}

export default SpotShow;
