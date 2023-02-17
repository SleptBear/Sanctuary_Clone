import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createSpot } from "../../store/spots";

import { useHistory } from "react-router-dom";


const CreateSpotFormModal = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [address, setAddress] = useState('HoneyLane');
    const [city, setCity] = useState('Santa Barbara');
    const [state ,setState] = useState('California');
    // const [lat ,setLat] = useState(null);
    // const [lng ,setLng] = useState(null);
    const [country ,setCountry] = useState('United State of America');
    const [name ,setName] = useState('HoneyPlace');
    const [description ,setDescription] = useState('Lorem ipsum dolor sit amet, nec timeam corrumpit an, nam accusam scripserit inciderint ei. Vim ea omnium repudiandae, graeco ancillae ne per. Ne consul audiam molestie mel, id his homero neglegentur definitiones. Prompta bonorum per cu, nec ei paulo temporibus.');
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
            Address:
            <input
              className="input-fields"
              type="text"
              value={address}
              placeholder='address'
              pattern="[a-zA-Z0-9 ]*"
              onChange={e => setAddress(e.target.value)}
              required
              />
          </label>
          <label className='input-box'>
            City:
            <input
              className="input-fields"
              type="text"
              value={city}
              placeholder='city'
              pattern="[a-zA-Z ]*"
              onChange={e => setCity(e.target.value)}
              required
              />
          </label>
          <label className='input-box'>
            State:
            <input
              className="input-fields"
              type="text"
              value={state}
              placeholder='state'
              pattern="[a-zA-Z ]*"
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
          Country:
            <input
              className="input-fields"
              type="text"
              value={country}
              placeholder='country'
              pattern="[a-zA-Z ]*"
              onChange={e => setCountry(e.target.value)}
              required
              />
          </label>
          <label className='input-box'>
          Name:
            <input
              className="input-fields"
              type="text"
              value={name}
              pattern="[a-zA-Z ]*"
              placeholder='name'
              onChange={e => setName(e.target.value)}
              required
              />
          </label>
          <label className='input-box'>
          Description:
            <input
              className="input-fields"
              type="text"
              value={description}
              pattern="[a-zA-Z.,;:?! ]*"
              placeholder='description'
              onChange={e => setDescription(e.target.value)}
              required
              />
          </label>
          <label className='input-box'>
          Price:
            <input
              className="input-fields"
              type="text"
              value={price}
              pattern="[0-9]*"
              placeholder='price'
              onChange={e => setPrice(e.target.value)}
              required
              />
          </label>
          <label className='input-box'>
            Preview Image:
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
           {errors.map((error) => <li key={error}>{error}</li>)}
        </ul>
        )}
          <button type="submit">Submit Home</button>
        </form>
        </>
      );
    }

    export default CreateSpotFormModal
