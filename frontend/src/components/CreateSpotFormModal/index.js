import React, { useState, useEffect } from "react";
// import * as sessionActions from '../../store/session'
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createSpot } from "../../store/spots";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// import '../../index.css'
//css file import here

const CreateSpotFormModal = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    let stateSpot = useSelector(state => state.spot.spot)
    let allSpots = useSelector(state => state.spot.spots)
    let keys = Object.keys(allSpots)
    const [address, setAddress] = useState('ddd');
    const [city, setCity] = useState('ddd');
    const [state ,setState] = useState('ddd');
    const [lat ,setLat] = useState('3.3');
    const [lng ,setLng] = useState('3.3');
    const [country ,setCountry] = useState('ddd');
    const [name ,setName] = useState('ddd');
    const [description ,setDescription] = useState('ddd');
    const [price ,setPrice] = useState('999');
    const [imgUrl ,setImgUrl] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu1pyrNOCmc9iKeJ3TJI-O1TtEV_HPbST7Lu9ql3nouw&s');

    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const { closeModal } = useModal();

    const newSpotData = {
      address,
      city,
      state,
      lat,
      lng,
      country,
      name,
      description,
      price,
    };

    const updatedImgData = {
      url: imgUrl,
      preview: true
    }

    let newId
    newId = Object.keys(allSpots)
    newId = newId[newId.length - 1]
    newId = +newId + 1

        const handleSubmit = (e) => {
          e.preventDefault();
          setErrors([]);
          setHasSubmitted(true);

          dispatch(createSpot(newSpotData, updatedImgData))
          .then(async (res) => {
            // console.log("Success")
            // const data = await res.json();
              closeModal()
              history.push(`/spots/${newId}`)
          })
            .catch(async (res) => {
              const data = await res.json();
              console.log("data from api", data)
              if (data && data.errors) setErrors(data.errors)
              console.log('ERRORS', errors)
            });
            
          return
        };


        return (
          <>
    <h1>My Home's Information</h1>
        <form onSubmit={handleSubmit} className="create-spotform" >
          <label className='input-box'>

            <input
              className="input-fields"
              type="text"
              value={address}
              placeholder='address'
              onChange={e => setAddress(e.target.value)}
              required
              />
          </label>
          <label className='input-box'>

            <input
              className="input-fields"
              type="text"
              value={city}
              placeholder='city'
              onChange={e => setCity(e.target.value)}
              required
              />
          </label>
          <label className='input-box'>

            <input
              className="input-fields"
              type="text"
              value={state}
              placeholder='state'
              onChange={e => setState(e.target.value)}
              required
              />
          </label>
          <label className='input-box'>

            <input
              className="input-fields"
              type="text"
              value={lat}
              placeholder='latitude'
              onChange={e => setLat(e.target.value)}
              required
              />
          </label>
          <label className='input-box'>

            <input
              className="input-fields"
              type="text"
              value={lng}
              placeholder='longitude'
              onChange={e => setLng(e.target.value)}
              required
              />
          </label>
          <label className='input-box'>

            <input
              className="input-fields"
              type="text"
              value={country}
              placeholder='country'
              onChange={e => setCountry(e.target.value)}
              required
              />
          </label>
          <label className='input-box'>

            <input
              className="input-fields"
              type="text"
              value={name}
              placeholder='name'
              onChange={e => setName(e.target.value)}
              required
              />
          </label>
          <label className='input-box'>

            <input
              className="input-fields"
              type="text"
              value={description}
              placeholder='description'
              onChange={e => setDescription(e.target.value)}
              required
              />
          </label>
          <label className='input-box'>

            <input
              className="input-fields"
              type="text"
              value={price}
              placeholder='price'
              onChange={e => setPrice(e.target.value)}
              required
              />
          </label>
          <label className='input-box'>
            <input
              className="input-fields"
              type="url"
              value={imgUrl}
              placeholder='Preview Image'
              onChange={e => setImgUrl(e.target.value)}
              required
              />
          </label>
        {hasSubmitted && errors.length > 0 && (
        <ul>
           {/* {errors.map((error, idx) => <li key={idx}>{error}</li>)} */}
           {errors.map((error) => <li key={error}>{error}</li>)}
        </ul>
        )}
          <button type="submit">Submit Home</button>
        </form>
        </>
      );
    }

    export default CreateSpotFormModal
