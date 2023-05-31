import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { getReviews, getUserReviews } from "../../store/reviews";
import CreateReviewFormButton from "../CreateReviewFormModal/CreateReviewFormButton";
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

// console.log(reviewsObj)
// function getDate(review) {
//     let date = review.createdAt;
//     console.log(new Date(date)))
// }



if (!reviewsArray[0]) return null
    return (
        <>

            {/* <h2>REVIEWS</h2> */}

            <div className="entire-review-container">

            <section className="bigger-review-container">

                {reviewsArray.map(review => (
                    <div key={review.id} className='individual-reviews-container'>
                        {/* {getDate(review)} */}

                    <h4 className="review-top" style={{margin: '0px'}}>

                        <i className="fa-solid fa-user"></i>
                            <p style={{fontSize: 'x-large', marginBottom: '10px'}} >{review.User?.firstName}</p>
                        <div className="review-top-nd">

                        <DeleteReviewButton user={currentUser} review={review}></DeleteReviewButton>
                        </div>

                    </h4>
                            <p style={{fontWeight: 'initial', margin: '0px', fontSize: 'small'}}>{(review.createdAt.slice(0,10))}</p>

                    <div>
                        <p style={{fontSize: 'large'}} className="p-review">{review.review}</p>
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
