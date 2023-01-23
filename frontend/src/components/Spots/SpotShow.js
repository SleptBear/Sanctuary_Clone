import { useEffect, useState } from "react";
// import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { getSpot } from "../../store/spots";
// import SpotsIndex from "./SpotsIndex";
// import SpotIndexItem from "./SpotsIndexItem";
import { deleteSpot } from '../../store/spots';
import { useHistory } from "react-router-dom";
// import { useModal } from "../context/Modal";
import UpdateSpotFormButton from "./UpdateSpotFormButton";
import CreateReviewFormButton from "../CreateReviewFormModal/CreateReviewFormButton"
import ReviewsIndex from "../Reviews/ReviewsIndex";
import UserReviewsIndex from "../Reviews/UserReviewsIndex";
// import SpotCard from "./Card/SpotCard";

const SpotShow = () => {
    let history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    let { spotId } = useParams();
    const [targetSpot, setTargetSpot] = useState('')
    const [spotImg, setSpotImg] = useState('')
    const [user, setUser] = useState('')
    useEffect(() => {
        dispatch(getSpot(spotId))
        .then((res) => {
            setTargetSpot(res)
            console.log(spotId)
            setUser(spot.Owner)

        })
    }, [])

    
    const spot = useSelector(state => state.spot.spot)
    console.log("FROM SPOT UseSelector", spot)
    console.log("FROM USER UseSelector", user)
    console.log("FROM TARGET UseSelector", targetSpot)
    console.log("SPOT FROM USESTATE", targetSpot)



    // const User = spot.Owner
    //key into spotImg array breaks code
    // const spotImg = spot.SpotImages[0]
    // const imgUrl = spotImg.url


    //maybe refactor to have delete comonent imported from its own file
    const deleteIndex = async (e) => {
        e.preventDefault();
        dispatch(deleteSpot(spotId))
        history.push('/')
    }



    //find better way of  returning home after delete
    // if(!spot.id) return history.push('/')
    if(!user || !targetSpot.id || !spot) return null
    // if(!spotImg) return null

    return (
<>
<section className="spotDetailsContainer">

{/* <section className="detailsImage">
    <img src={imgUrl} alt='NOT FOUND'></img>

</section> */}

        <section>
        ID: {spot.id}
        <br/>
        Country: {spot.country}
        <br/>
        City: {spot.city}
        <br/>
        <br/>
        Property Owner: {user.id}
        <br/>

        <button
        onClick={deleteIndex}>Delete</button>
        <UpdateSpotFormButton user={sessionUser} />

      </section>
      <br></br>
      <section>
            <ReviewsIndex></ReviewsIndex>
        </section>
        <br></br>
        <section>
            <CreateReviewFormButton></CreateReviewFormButton>
        </section>

        <br></br>
      {/* <section>
            <UserReviewsIndex></UserReviewsIndex>
        </section> */}

        {/* <section>
            <SpotCard></SpotCard>
        </section> */}

        </section>
</>
    )
}



export default SpotShow;
