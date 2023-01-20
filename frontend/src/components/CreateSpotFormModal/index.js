import React, { useState } from "react";
import * as sessionActions from '../../store/session'
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createSpot } from "../../store/spots";
//css file import here
// import { useHistory } from "react-router-dom";

const CreateSpotFormModal = () => {
    const dispatch = useDispatch();
    // const history = useHistory();

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
    console.log(city)

    const handleSubmit = (e) => {
        e.preventDefault();
        // setErrors([])
        // spot = { ...spot, address, city, state, lat, lng, name, description, price };
        // dispatch(actionCreateSpot(spot))
        // history.push(`/spots/${spot.id}`);

        return (

          dispatch(createSpot({
            address,
            city,
            state,
            lat,
            lng,
            country,
            name,
            description,
            price
         })))
        // .catch(async (res) => {
        //   const data = await res.json();
        //   if (data && data.errors) setErrors(data.errors);
        // });
        // return setErrors(['Confirm form fields are filled'])
    };

    return (
        <>
    <h1>My Home's Information</h1>
        <form onSubmit={handleSubmit} >
          <ul>
             {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <label>
            address
            <input
              type="text"
              value={address}
              onChange={e => setAddress(e.target.value)}
              required
            />
          </label>
          <label>
            city
            <input
              type="text"
              value1={city}
              onChange={e => setCity(e.target.value1)}
              required
            />
          </label>
          <label>
            state
            <input
              type="text"
              value2={state}
              onChange={e => setCity(e.target.value2)}
              required
            />
          </label>
          <label>
            latitude
            <input
              type="text"
              value3={lat}
              onChange={e => setCity(e.target.value3)}
              required
            />
          </label>
          <label>
            longitude
            <input
              type="text"
              value4={lng}
              onChange={e => setCity(e.target.value4)}
              required
            />
          </label>
          <label>
            country
            <input
              type="text"
              value5={country}
              onChange={e => setCity(e.target.value5)}
              required
            />
          </label>
          <label>
            name
            <input
              type="text"
              value6={name}
              onChange={e => setCity(e.target.value6)}
              required
            />
          </label>
          <label>
            description
            <input
              type="text"
              value7={description}
              onChange={e => setCity(e.target.value7)}
              required
            />
          </label>
          <label>
            price
            <input
              type="text"
              value8={price}
              onChange={e => setCity(e.target.value8)}
              required
            />
          </label>
          <button type="submit">Submit Home</button>
        </form>
        </>
      );
    }

    export default CreateSpotFormModal
