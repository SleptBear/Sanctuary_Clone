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
    // const history = useHistory();
    let stateSpot = useSelector(state => state.spot.spot)
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state ,setState] = useState('');
    const [lat ,setLat] = useState('');
    const [lng ,setLng] = useState('');
    const [country ,setCountry] = useState('');
    const [name ,setName] = useState('');
    const [description ,setDescription] = useState('');
    const [price ,setPrice] = useState('');
    const [imgUrl ,setImgUrl] = useState('');
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const [newSpot, setNewSpot] = useState();
    const history = useHistory()


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
          Owner: stateSpot.Owner,
          // spotImages: [stateSpot.spotImages]
          SpotImages: [imgUrl]

        };

        const updatedImgData = {
          url: imgUrl,
          preview: true
        }

        const handleSubmit = (e) => {
            e.preventDefault();
            setErrors([]);



            dispatch(createSpot(newSpotData, updatedImgData))
            .then(async (res) => {
              console.log("Success")
              // const data = await res.json();
              // const data = useSelector(state => state.spot.spot)
              // console.log(data)
              closeModal()
              history.push(`/spots/${stateSpot.id}`)
            })
            .catch(async (res) => {
              const data = await res.json();
              console.log(data)
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
              <ul>
                 {errors.map((error, idx) => <li key={idx}>{error}</li>)}
              </ul>
          <button type="submit">Submit Home</button>
        </form>
        </>
      );
    }

    export default CreateSpotFormModal
