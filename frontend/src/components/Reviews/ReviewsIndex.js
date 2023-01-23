import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { getReviews } from "../../store/reviews";
// import { deleteReview } from "../store/reviews";


const ReviewsIndex = () => {
const dispatch = useDispatch();
let { spotId }= useParams();
// spotId = Number(spotId)
const reviewsObj = useSelector(state => state.reviews.spot)
const reviewsArray = Object.values(reviewsObj)
// const data = reviewsObj.spotId
// const userReviewsArray = useSelector(state => state.reviews.user)

// console.log(spotId)
// console.log("OBJECT", reviewsObj)
// console.log("OBJECT ENTRIES", reviewsArray)
// console.log("ID FILE", data)


useEffect(() => {
    dispatch(getReviews(spotId))
}, [])

// const deleteIndex = async (e) => {
//     e.preventDefault();
//     dispatch(deleteReview(spotId))
// }

// if (!data) return null
    return (
        <>
            <h2>REVIEWS</h2>
            <div>
                {/* {reviewsObj} */}
            </div>
            <section>
                {reviewsArray.map(review => (
                    "Details:" + "" + review.review + "   " + " Stars:" + review.stars
                ))
            }
            </section>

        </>
    )
}

export default ReviewsIndex
