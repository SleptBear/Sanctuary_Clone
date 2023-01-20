import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { getSpot } from "../store/spots";
// import SpotsIndex from "./SpotsIndex";
// import SpotIndexItem from "./SpotsIndexItem";
import { deleteSpot } from '../store/spots';
import { useHistory } from "react-router-dom";
// import { useModal } from "../context/Modal";
import UpdateSpotFormButton from "./UpdateSpotFormButton";

const SpotShow = () => {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    let { spotId } = useParams();
    console.log("SHOW RENDERED")
    const spot = useSelector(state => state.spot.spot)
    // console.log(spot)
    const User = spot.Owner
    const [spotState, setSpotState] = useState()

    useEffect(() => {
        dispatch(getSpot(spotId))
    }, [])


    // useEffect(() => {
    //     // dispatch(getSpot(spotId))
    // }, [dispatch, spot])


    const deleteIndex = async (e) => {
        e.preventDefault();
        dispatch(deleteSpot(spotId))
    }


    let history = useHistory();
    // console.log(typeof spotId)
    // const [id, setId] = useState()
    // console.log("spots Obj", spot)
    // const spot = Object.values(spotsObj)
    // const spot = useSelector(state => state.spot[+spotId])
    // const spots = Object.values(spot)
    // console.log('object.values', spot)
    // console.log('Owner name', spot.Owner)


    // const [address, setAddress] = useState(spot.address);
    // const [city, setCity] = useState(spot.city);
    // const [state ,setState] = useState(spot.state);
    // const [country ,setCountry] = useState(spot.country);
    // const [name ,setName] = useState(spot.name);
    // const [description ,setDescription] = useState(spot.description);
    // const [price ,setPrice] = useState(spot.price);

    // const [errors, setErrors] = useState([]);
    // const { closeModal } = useModal();


    // const updateIndex = async (e) => {
    //     e.preventDefault();
    //     dispatch(updateSpot(spotId))
    // }
console.log("SPOT RN", spot)
    if(!spot.id) return history.push('/')
    if(!User) return null

    return (
        <section>
        ID: {spot.id}
        <br/>
        Country: {spot.country}
        <br/>
        City: {spot.city}
        <br/>
        <br/>
        Property Owner: {User.id}
        <br/>

        <button
        onClick={deleteIndex}>Delete</button>
        <UpdateSpotFormButton user={sessionUser} />

        {/* <br/> */}
        {/* <Link to="/">Back Home</Link> */}
      </section>
    )
}



export default SpotShow;
