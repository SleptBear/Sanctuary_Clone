import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { getReviews } from "../store/reviews";


const ReviewsIndex = () => {
const dispatch = useDispatch();
const { spotId }= useParams();
const reviewsArray = useSelector(state => state.reviews.spot)
const data = reviewsArray.Reviews
// const userReviewsArray = useSelector(state => state.reviews.user)

// console.log(spotId)
console.log("ID FILE", reviewsArray)
console.log("ID FILE", data)


useEffect(() => {
    dispatch(getReviews(spotId))
}, [])

if (!data) return null
    return (
        <>
            <h2>REVIEWS</h2>
            <section>
                {data.map(review => (
                    review.User.firstName + ' ' + review.User.lastName + ' ' +
                    review.review + ' ' + review.stars
                ))
            }
            </section>
        </>
    )
}

export default ReviewsIndex
