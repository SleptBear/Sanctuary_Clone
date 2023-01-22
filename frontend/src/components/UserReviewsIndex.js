import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { getUserReviews } from "../store/reviews";
import { deleteReview } from "../store/reviews";


const UserReviewsIndex = () => {
const dispatch = useDispatch();
const { spotId }= useParams();
// const reviewsArray = useSelector(state => state.reviews.spot)
// const data = reviewsArray
const userReviewsArray = useSelector(state => state.reviews.user)
const reviewData = userReviewsArray.Reviews
const userReview = ''
console.log("FROM STATE", reviewData)

useEffect(() => {
    dispatch(getUserReviews())
}, [])
// console.log("CHECK THIS ID", spotId)
// console.log("CHECK THIS ID FROM STATE", reviewData[0].spotId)
// console.log("USER FILE", userReviewsArray)


const deleteIndex = async (e) => {
    e.preventDefault();
    dispatch(deleteReview(reviewId))
}
if (!reviewData) return null
// console.log(Object.values(reviewData[0]).includes(spotId))

let reviewId = ''

const checkIfReview = () => {
    // let checks = false
    // let array = []
    console.log("ID WE ARE AT", spotId)
    console.log(reviewData)
    let review = reviewData.find(element => element.spotId == spotId)
        // array.push(Object.values(element))
    // if (array.includes(spotId)) {
    //     checks = true
    // }
    // console.log(array)
        console.log("did it find one", review)
        if (review){
            reviewId = review.id
            return review
        }
        return false
}

console.log(checkIfReview())


if(!checkIfReview()) return null


    return (
        <>
            <h2>USERS REVIEWS</h2>
            <section>
                {reviewData.map(review => (
                    review.review + "   " + review.stars
                ))
            }
            <button
        onClick={deleteIndex}>Delete</button>
            </section>
        </>
    )
}

export default UserReviewsIndex
