import React, { useState } from "react";
import { useSelector } from "react-redux";
// import * as sessionActions from '../../store/session'
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { updateSpot, getSpot } from "../../store/spots";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";



const UpdateSpotFormModal = () => {
    const dispatch = useDispatch();
    // let { spotId } = useParams();
    let stateSpot = useSelector(state => state.spot.spot)
    const spotId = stateSpot.id
    console.log(stateSpot.id);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state ,setState] = useState('');
    const [lat ,setLat] = useState('');
    const [lng ,setLng] = useState('');
    const [country ,setCountry] = useState('');
    const [name ,setName] = useState('');
    const [description ,setDescription] = useState('');
    const [price ,setPrice] = useState('');
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const [updatedSpot, setUpdatedSpot] = useState();


    //might not need if params has id already:

        useEffect(() => {
            dispatch(getSpot(spotId))
            console.log('RENDERED ONCE')
        }, [dispatch, updateSpot])

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);

        const updatedSpotData = {
          address,
          city,
          state,
          lat,
          lng,
          country,
          name,
          description,
          price,
          Owner: stateSpot.Owner,
          spotImages: stateSpot.spotImages
        };

        dispatch(updateSpot(updatedSpotData, spotId))
        .then((res) => setUpdatedSpot(res))
        .then(closeModal())
        .catch(async (res) => {
            const data = await res.json();
            console.log("Checking data returning to form", data)
            if (data && data.errors) setErrors(data.errors)
          });
          // console.log('does it get here?')

          // getSpot(spotId) try to have action re render show page

          // return updatedSpot

          // history.push(`/spots/${spotId}`)
    }


    return (
        <>
    <h1>My Home's New Information</h1>
        <form onSubmit={handleSubmit} className="update-spotform" >
          <ul>
             {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <label>
            address
            <input
              className="input-fields"
              type="text"
              value={address}
              onChange={e => setAddress(e.target.value)}
              required
            />
          </label>
          <label>
            city
            <input
              className="input-fields"
              type="text"
              value={city}
              onChange={e => setCity(e.target.value)}
              required
            />
          </label>
          <label>
            state
            <input
              className="input-fields"
              type="text"
              value={state}
              onChange={e => setState(e.target.value)}
              required
            />
          </label>
          <label>
            latitude
            <input
              className="input-fields"
              type="text"
              value={lat}
              onChange={e => setLat(e.target.value)}
              required
            />
          </label>
          <label>
            longitude
            <input
              className="input-fields"
              type="text"
              value={lng}
              onChange={e => setLng(e.target.value)}
              required
            />
          </label>
          <label>
            country
            <input
              className="input-fields"
              type="text"
              value={country}
              onChange={e => setCountry(e.target.value)}
              required
            />
          </label>
          <label>
            name
            <input
              className="input-fields"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </label>
          <label>
            description
            <input
              className="input-fields"
              type="text"
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
            />
          </label>
          <label>
            price
            <input
              className="input-fields"
              type="text"
              value={price}
              onChange={e => setPrice(e.target.value)}
              required
            />
          </label>
          <button type="submit">Update Home</button>
        </form>
        </>
      );
    }

    export default UpdateSpotFormModal
