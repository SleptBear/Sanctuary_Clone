import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { updateReview } from "../../store/reviews";
import { useModal } from "../../context/Modal";
import { createReview } from "../../store/reviews";
import { useParams } from "react-router-dom";
import { getUserReviews } from "../../store/reviews";


const CreateReviewFormModal = () => {
    const dispatch = useDispatch();
    // const spotId = useParams()
    let stateSpot = useSelector(state => state.spot.spot);
    const spotId = stateSpot.id
    let sessionUser = useSelector(state => state.session.user)
    const [review, setReview] = useState('');
    const [stars, setStars] = useState('');
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

console.log(spotId)

const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    const reviewData = {
        review,
        stars
    }

    dispatch(createReview(spotId, reviewData))
    .then(closeModal())
    .catch(async (res) => {
      const data = await res.json();
      console.log("Checking data returning to form", data)
      if (data && data.errors) setErrors(data.errors)
    });
    getUserReviews();
}

    return (
    <>
    <h1>Submit Your Review</h1>
        <form onSubmit={handleSubmit} className="create-reviewform" >
          <ul>
             {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <label>
            REVIEW
            <input
              className="input-fields"
              type="text"
              value={review}
              onChange={e => setReview(e.target.value)}
              required
            />
          </label>
          <label>
            STARS
            <input
              className="input-fields"
              type="number"
              value={stars}
              onChange={e => setStars(e.target.value)}
              required
            />
          </label>

          <button type="submit">Update Home</button>
        </form>
        </>
      );
    }





export default CreateReviewFormModal
