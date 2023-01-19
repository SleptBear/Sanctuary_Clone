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

    const handleSubmit = (e) => {
        e.preventDefault();
        // spot = { ...spot, address, city, state, lat, lng, name, description, price };
        // dispatch(actionCreateSpot(spot))
        // history.push(`/spots/${spot.id}`);

        return dispatch(createSpot({
            address,
            city,
            state,
            lat,
            lng,
            country,
            name,
            description,
            price
         }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
        return setErrors(['Confirm form fields are filled'])
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
            <textarea
              value={city}
              onChange={e => setCity(e.target.value)}
              required
            />
          </label>
          <label>
            state
            <textarea
              value={state}
              onChange={e => setCity(e.target.value)}
              required
            />
          </label>
          <label>
            latitude
            <textarea
              value={lat}
              onChange={e => setCity(e.target.value)}
              required
            />
          </label>
          <label>
            longitude
            <textarea
              value={lng}
              onChange={e => setCity(e.target.value)}
              required
            />
          </label>
          <label>
            country
            <textarea
              value={country}
              onChange={e => setCity(e.target.value)}
              required
            />
          </label>
          <label>
            name
            <textarea
              value={name}
              onChange={e => setCity(e.target.value)}
              required
            />
          </label>
          <label>
            description
            <textarea
              value={description}
              onChange={e => setCity(e.target.value)}
              required
            />
          </label>
          <label>
            price
            <textarea
              value={price}
              onChange={e => setCity(e.target.value)}
              required
            />
          </label>
          <button type="submit">Submit Home</button>
        </form>
        </>
      );
    }

    export default CreateSpotFormModal
