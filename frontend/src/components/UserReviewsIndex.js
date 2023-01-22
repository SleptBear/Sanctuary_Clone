import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { getUserReviews } from "../store/reviews";
import { deleteReview } from "../store/reviews";
import { useHistory } from "react-router-dom";


const UserReviewsIndex = () => {
const dispatch = useDispatch();
const history = useHistory();
const { spotId }= useParams();
// const reviewsArray = useSelector(state => state.reviews.spot)
// const data = reviewsArray
const userReviewsObj = useSelector(state => state.reviews.user)
const reviewData = Object.values(userReviewsObj)
const [myReview, setMyReview] = useState('')
const [reviewId, setReviewId] = useState('')
const [errors, setErrors] = useState([]);
console.log("REVIEW OBJ", userReviewsObj)
console.log("FROM STATE", reviewData)
let id = ''




const checkIfReview = () => {
    console.log("ID WE ARE AT", spotId)
    // console.log(reviewData)
    let review = reviewData.find(element => element.spotId == spotId)

        console.log("did it find one", review)
        if (review){
            id = review.id
            console.log("ID", id)
            return review
        }
        return false
    }

    useEffect(() => {
        dispatch(getUserReviews())
        // if(!checkIfReview()) return null
    }, [])
//     // console.log("CHECK THIS ID", spotId)
//     // console.log("CHECK THIS ID FROM STATE", reviewData[0].spotId)
//     // console.log("USER FILE", userReviewsArray)

    const deleteIndex = async (e) => {
        e.preventDefault();
        setErrors([]);
        // setReviewId(id)

        dispatch(deleteReview(id))
        dispatch(getUserReviews())
        // history.push(`/spots/${spotId}`)
        // dispatch(deleteReview(reviewId))
    }
    if (!reviewData) return null
    // console.log(Object.values(reviewData[0]).includes(spotId))
// console.log(checkIfReview())


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
