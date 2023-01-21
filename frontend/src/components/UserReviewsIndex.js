import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { getUserReviews } from "../store/reviews";


const UserReviewsIndex = () => {
const dispatch = useDispatch();
const { spotId }= useParams();
// const reviewsArray = useSelector(state => state.reviews.spot)
// const data = reviewsArray
const userReviewsArray = useSelector(state => state.reviews.user)
const reviewData = userReviewsArray.Reviews

// console.log(spotId)
console.log("USER FILE", userReviewsArray)

useEffect(() => {
    dispatch(getUserReviews())
}, [])




if (!reviewData) return null
    return (
        <>
            <h2>USERS REVIEWS</h2>
            <section>
                {reviewData.map(review => (
                    review.User.firstName + ' ' + review.User.lastName + ' ' +
                    review.review + ' ' + review.stars
                ))
            }
            </section>
        </>
    )
}

export default UserReviewsIndex
