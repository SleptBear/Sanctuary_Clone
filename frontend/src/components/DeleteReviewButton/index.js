import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteReview } from "../../store/reviews";



const DeleteReviewButton = () => {
    const { spotId } = useParams();
    const spotState = useSelector(state => state.reviews.spot)
    const userState = useSelector(state => state.reviews.user)

//some sort of logic to deletete only object in reviews where user id and spot id are found together in one review


    const removeIndex = async (e) => {
        e.preventDefault();
        console.log("SPOTid", spotId)
    console.log('SPOTS REVIEWS', spotState)
    console.log('USERS REVIEW', userState)
        // dispatch(deleteReview(reviewId))
        return null
    }
    return (
        <>
        <button
        onClick={removeIndex}>Remove Review</button>
        </>
    )
}

export default DeleteReviewButton
