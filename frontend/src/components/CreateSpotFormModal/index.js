import React, { useState } from "react";
// import * as sessionActions from '../../store/session'
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

    const [newSpot, setNewSpot] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();

        setErrors([]);
        // spot = { ...spot, address, city, state, lat, lng, name, description, price };
        // dispatch(actionCreateSpot(spot))
        // history.push(`/spots/${spot.id}`);

        const newSpotData = {
          address,
          city,
          state,
          lat,
          lng,
          country,
          name,
          description,
          price
        };

        dispatch(createSpot(newSpotData))
        .then((res) => setNewSpot(res))
        .then(closeModal())
        .catch(async (res) => {
          const data = await res.json();
          console.log("Checking data returning to form", data)
          if (data && data.errors) setErrors(data.errors)
        });

        setState()

        console.log("NEW SPOT HERE", newSpot)
        //I want to redirect to that spots details page afterwards
        //find a way to route to it here i think
        return newSpot
      };
        // .catch(async (res) => {
        //   const data = await res.json();
        //   if (data && data.errors) setErrors(data.errors);
        // });
        // return setErrors(['Confirm form fields are filled'])

      // useEffect(() => {
      //   if (newSpot) {
      //     history.pushState(`/spots/${newSpot.id}`)
      //   }
      // }, [newSpot])

    return (
        <>
    <h1>My Home's Information</h1>
        <form onSubmit={handleSubmit} className="create-spotform" >
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
          <button type="submit">Submit Home</button>
        </form>
        </>
      );
    }

    export default CreateSpotFormModal
