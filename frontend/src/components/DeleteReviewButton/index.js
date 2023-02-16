import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteReview } from "../../store/reviews";
import { getSpot } from "../../store/spots";
import { getUserReviews } from "../../store/reviews";



const DeleteReviewButton = (prop) => {

  console.log("PROP", prop)

    const { spotId } = useParams();
    const dispatch = useDispatch();
    // const spotState = useSelector(state => state.reviews.spot)
    // const reviewOwner = useSelector(state => state.reviews.user)
    // const currentUser = useSelector(state => state.session.user)
    const [errors, setErrors] = useState([])
    // const ulRef = useRef();
    // let usersReviewId = ''

//some sort of logic to deletete only object in reviews where user id and spot id are found together in one review
// let findUserReview = (array, value) => {
//     let boolean = false;
//     array.forEach(index => {
//       // console.log("each index userId", index?.userId)
//       // console.log('value in function', value)
//       if (index?.userId === value) {
//         boolean = true
//         usersReviewId = index
//       }
//       })
//       return boolean
//   }

  // let userID = currentUser?.id
  // let userReviews = Object.values(reviewOwner)


  const removeIndex = async (e) => {
      e.preventDefault();
      // console.log("state of review here", spotState)
      // console.log("state of users reviews", reviewOwner)
      console.log('review ID from prop', prop.review.id)
      dispatch(deleteReview(prop.review.id))
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
    // const ulClassName = "delete-review-button" + ((findUserReview(Object.values(spotState), currentUser?.id) && currentUser?.id) ? "" : " hidden");

    // console.log("truthy?", review.userId === user.id)
    // console.log(review)
    // console.log(spotState)
    // console.log(user)

    // if (!prop.user?.id) return null
    if (!prop.user?.id || prop.user?.id !== prop.review?.userId) return null
    return (
        <div className="delete-review-button">
        <button
        onClick={removeIndex}><i className="fa-solid fa-trash-can"></i></button>
        </div>
    )
}

export default DeleteReviewButton
