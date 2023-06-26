import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createSpot } from "../../store/spots";

import { useHistory } from "react-router-dom";


const CreateSpotFormModal = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state ,setState] = useState('');
    // const [lat ,setLat] = useState(null);
    // const [lng ,setLng] = useState(null);
    const [country ,setCountry] = useState('');
    const [name ,setName] = useState('');
    const [description ,setDescription] = useState('');
    const [price ,setPrice] = useState('');
    const [imgUrl ,setImgUrl] = useState(null)
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
              // console.log("data from api", data)
              if (data && data.errors) setErrors(data.errors)
              // console.log('ERRORS', errors)
            });
          return
        };

        return (
          <>
        <form onSubmit={handleSubmit} className="create-spotform" >
    <h1>My Sanctuary</h1>
        <label className="input-box">
              Address:
            <input
              className="input-fields"
              type="text"
              value={address}
              placeholder="address"
              pattern="[a-zA-Z0-9 ]*"
              title="No Symbols or special characters"
              onChange={e => setAddress(e.target.value)}
              required
              />
          </label>
          <label className="input-box">
            City:
            <input
              className="input-fields"
              type="text"
              value={city}
              placeholder="city"
              pattern="[a-zA-Z ]*"
              title="No Symbols or special characters"
              onChange={e => setCity(e.target.value)}
              required
              />


          </label>
          <label className="input-box">
            State:
            <input
              className="input-fields"
              type="text"
              value={state}
              placeholder="state"
              pattern="[a-zA-Z ]*"
              title="No Symbols, numbers, or special characters"
              onChange={e => setState(e.target.value)}
              required
              />
          </label>
          {/* <label className="input-box">

            <input
              className="input-fields"
              type="text"
              value={lat}
              placeholder="latitude"
              onChange={e => setLat(e.target.value)}
              // required
              />
          </label>
          <label className="input-box">

            <input
              className="input-fields"
              type="text"
              value={lng}
              placeholder="longitude"
              onChange={e => setLng(e.target.value)}
              // required
              />
          </label> */}
          <label className="input-box">
            Country:
            <input
              className="input-fields"
              type="text"
              value={country}
              placeholder="country"
              pattern="[a-zA-Z ]*"
              title="No Symbols, numbers, or special characters"
              onChange={e => setCountry(e.target.value)}
              required
              />
          </label>
          <label className="input-box">
            Name:
            <input
              className="input-fields"
              type="text"
              value={name}
              placeholder="name"
              pattern="[a-zA-Z ]*"
              title="No Symbols, numbers, or special characters"
              onChange={e => setName(e.target.value)}
              required
              />
          </label>
          <label className="input-box">
            Description:
            <textarea
              className="input-fields"
              type="text"
              placeholder="description..."
              pattern="[-a-zA-Z0-9 .,;:?! ]*"
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
              />
          </label>
          <label className="input-box">
            Price:
            <input
              className="input-fields"
              type="text"
              placeholder="price"
              pattern="[0-9]*"
              title="No Symbols or Characters"
              value={price}
              onChange={e => setPrice(e.target.value)}
              required
              />
          </label>
          <label className='input-box'>
            Preview Image:
            <input
                type='file'
                className='custom-file-upload'
                accept='image/*'
                onChange={(e) => setImgUrl(e.target.files[0])}
                title='Please add Image of location'
                required
                >
                    {/* <i class="fa-solid fa-file-arrow-up"></i> */}
                </input>
            {/* <input
              className="input-fields"
              type="url"
              value={imgUrl}
              placeholder='Preview Image'
              onChange={e => setImgUrl(e.target.value)}
              required
              /> */}
          </label>
          {/* <div className="home-submit-button"> */}

          <br></br>
          <button type="submit">Submit Home</button>
          <br></br>
        {hasSubmitted && errors.length > 0 && (
        <div className="error-lists">
           {errors.map((error) => <li key={error}>{error}</li>)}
        </div>
        )}
          {/* </div> */}
        </form>
        </>
      );
    }

    export default CreateSpotFormModal
