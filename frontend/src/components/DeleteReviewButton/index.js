import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteReview } from "../../store/reviews";
import { getSpot } from "../../store/spots";
import { getUserReviews } from "../../store/reviews";



const DeleteReviewButton = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const spotState = useSelector(state => state.reviews.spot)
    const reviewOwner = useSelector(state => state.reviews.user)
    const currentUser = useSelector(state => state.session.user)
    const [errors, setErrors] = useState([])
    const ulRef = useRef();
    let usersReviewId = ''

//some sort of logic to deletete only object in reviews where user id and spot id are found together in one review
let findUserReview = (array, value) => {
    let boolean = false;
    array.forEach(index => {
      // console.log("each index userId", index?.userId)
      // console.log('value in function', value)
      if (index?.userId === value) {
        boolean = true
        usersReviewId = index
      }
      })
      return boolean
  }

  let userID = currentUser?.id
  let userReviews = Object.values(reviewOwner)


  const removeIndex = async (e) => {
      e.preventDefault();
      console.log("state of review here", spotState)
      console.log("state of users reviews", reviewOwner)
      console.log('review ID at this moment', usersReviewId)
      dispatch(deleteReview(usersReviewId.id))
      .then(async(res) => {
        dispatch(getUserReviews())
        dispatch(getSpot(spotId))
      })
      .catch(async (res) => {
        const data = await res.json();
        console.log("Checking data returning to form", data)
        if (data && data.errors) setErrors(data.errors)
        console.log("ERRORS", errors)
      });



  }
  // console.log("THE ARRAY", Object.values(spotState))
  // console.log('CURRENT USER', currentUser)
  //  console.log("response from function", findUserReview(Object.values(reviewOwner), currentUser?.id))
    const ulClassName = "delete-review-button" + ((findUserReview(Object.values(spotState), currentUser?.id) && currentUser?.id) ? "" : " hidden");

    return (
        <div className={ulClassName} ref={ulRef}>
        <button
        onClick={removeIndex}>Remove Review</button>
        </div>
    )
}

export default DeleteReviewButton
