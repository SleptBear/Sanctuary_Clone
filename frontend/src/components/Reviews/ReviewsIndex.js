import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { getReviews, getUserReviews } from "../../store/reviews";
import DeleteReviewButton from "../DeleteReviewButton";


const ReviewsIndex = () => {
const dispatch = useDispatch();
let { spotId }= useParams();
// spotId = Number(spotId)
const reviewsObj = useSelector(state => state.reviews.spot)
const currentUser = useSelector(state => state.session?.user)
let reviewsArray = Object.values(reviewsObj)
// console.log("reviewsArray", reviewsArray)

// const data = reviewsObj.spotId
// const userReviewsArray = useSelector(state => state.reviews.user)

// console.log(spotId)
// console.log("OBJECT", reviewsObj)
// console.log("OBJECT ENTRIES", reviewsArray)
// console.log("ID FILE", data)


useEffect(() => {
    dispatch(getReviews(spotId))
    if(currentUser) dispatch(getUserReviews())

}, [dispatch, currentUser, spotId])

// const deleteIndex = async (e) => {
//     e.preventDefault();
//     dispatch(deleteReview(spotId))
// }



if (!reviewsArray[0]) return null
    return (
        <>

            <h2>REVIEWS</h2>
            <div className="entire-review-container">

            <section className="bigger-review-container">

                {reviewsArray.map(review => (

                    <div key={review.id} className='individual-reviews-container'>

                    <h4 className="review-top">

                        <i className="fa-solid fa-user"></i>
                        <p>{review.User?.firstName}</p>
                        
                        <DeleteReviewButton user={currentUser} review={review}></DeleteReviewButton>
                    </h4>

                    <div>
                        <p className="p-review">{review.review}</p>
                    </div>


                    </div>
                ))
            }
            </section>
            </div>

        </>
    )
}

export default ReviewsIndex
