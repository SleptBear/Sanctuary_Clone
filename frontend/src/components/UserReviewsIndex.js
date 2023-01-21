import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { getUserReviews } from "../store/reviews";


const UserReviewsIndex = () => {
const dispatch = useDispatch();
const { spotId }= useParams();
// const reviewsArray = useSelector(state => state.reviews.spot)
// const data = reviewsArray
useEffect(() => {
    dispatch(getUserReviews())
}, [])

const userReviewsArray = useSelector(state => state.reviews.user)
const data = userReviewsArray

// console.log(spotId)
// console.log(reviewsArray)



    return (
        <>
            <h2>REVIEWS</h2>
            {/* <section>
                {data.map(review => (
                    review.User.firstName + ' ' + review.User.lastName + ' ' +
                    review.review + ' ' + review.stars
                ))
            }
            </section> */}
        </>
    )
}

export default UserReviewsIndex
