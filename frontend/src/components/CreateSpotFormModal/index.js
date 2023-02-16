import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createSpot } from "../../store/spots";

import { useHistory } from "react-router-dom";


const CreateSpotFormModal = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [address, setAddress] = useState('honeyLane');
    const [city, setCity] = useState('Marcos');
    const [state ,setState] = useState('CA');
    // const [lat ,setLat] = useState(null);
    // const [lng ,setLng] = useState(null);
    const [country ,setCountry] = useState('USA');
    const [name ,setName] = useState('HoneyPlace');
    const [description ,setDescription] = useState('To die for');
    const [price ,setPrice] = useState('555');
    const [imgUrl ,setImgUrl] = useState('https://a0.muscache.com/im/pictures/0eb500ca-0f15-4889-9e1b-6156699b9505.jpg?im_w=1200')
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const { closeModal } = useModal();

    const newSpotData = {
      address,
      city,
      state,
      // lat,
      // lng,
      country,
      name,
      description,
      price,
    };

    const updatedImgData = {
      url: imgUrl,
      preview: true
    }

        const handleSubmit = (e) => {
          e.preventDefault();
          setHasSubmitted(true);

          dispatch(createSpot(newSpotData, updatedImgData))
          .then(async (res) => {

            history.push(`/spots/${res.id}`)
              closeModal()
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
          {/* <label className='input-box'>

            <input
              className="input-fields"
              type="text"
              value={lat}
              placeholder='latitude'
              onChange={e => setLat(e.target.value)}
              // required
              />
          </label>
          <label className='input-box'>

            <input
              className="input-fields"
              type="text"
              value={lng}
              placeholder='longitude'
              onChange={e => setLng(e.target.value)}
              // required
              />
          </label> */}
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
