import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { updateSpot, getSpot } from "../../store/spots";
import { useEffect } from "react";




const UpdateSpotFormModal = () => {
    const dispatch = useDispatch();
    // let { spotId } = useParams();
    let stateSpot = useSelector(state => state.spot.spot)
    const spotId = stateSpot.id
    // console.log(stateSpot.id);
    const [address, setAddress] = useState(stateSpot.address);
    const [city, setCity] = useState(stateSpot.city);
    const [state ,setState] = useState(stateSpot.state);
    // const [lat ,setLat] = useState(stateSpot.lat);
    // const [lng ,setLng] = useState(stateSpot.lng);
    const [country ,setCountry] = useState(stateSpot.country);
    const [name ,setName] = useState(stateSpot.name);
    const [description ,setDescription] = useState(stateSpot.description);
    const [price ,setPrice] = useState(stateSpot.price);
    const [imgUrl ,setImgUrl] = useState('');
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    // const [updatedSpot, setUpdatedSpot] = useState();


    //might not need if params has id already:

        // useEffect(() => {
        //     dispatch(getSpot(spotId))
        //     console.log('RENDERED ONCE')
        // }, [dispatch, updateSpot])

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedSpotData = {
          address,
          city,
          state,
          // lat,
          // lng,
          country,
          name,
          description,
          price,
          // Owner: stateSpot.Owner,
          // SpotImages: stateSpot.SpotImages
        };

        const updatedImgData = {
          url: imgUrl,
          preview: true
        }

        dispatch(updateSpot(updatedSpotData, spotId, updatedImgData))
        // .then((res) => setUpdatedSpot(res))
        .then(async (res) => {
          closeModal()
        })
        .catch(async (res) => {
            const data = await res.json();
            console.log("Checking data returning to form", data)
            if (data && data.errors) setErrors(data.errors)
            console.log('ERRORS', errors)
          });
    }



    return (
        <>
    <h1>Home's New Information</h1>
        <form onSubmit={handleSubmit} className="update-spotform" >
          <label className="input-box">

            <input
              className="input-fields"
              type="text"
              value={address}
              placeholder="address"
              onChange={e => setAddress(e.target.value)}
              required
              />
          </label>
          <label className="input-box">
            <input
              className="input-fields"
              type="text"
              value={city}
              placeholder="city"
              onChange={e => setCity(e.target.value)}
              required
              />


          </label>
          <label className="input-box">

            <input
              className="input-fields"
              type="text"
              value={state}
              placeholder="state"
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

            <input
              className="input-fields"
              type="text"
              value={country}
              placeholder="country"
              onChange={e => setCountry(e.target.value)}
              required
              />
          </label>
          <label className="input-box">

            <input
              className="input-fields"
              type="text"
              value={name}
              placeholder="name"
              onChange={e => setName(e.target.value)}
              required
              />
          </label>
          <label className="input-box">
            <input
              className="input-fields"
              type="text"
              placeholder="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
              />
          </label>
          <label className="input-box">
            <input
              className="input-fields"
              type="text"
              placeholder="price"
              value={price}
              onChange={e => setPrice(e.target.value)}
              required
              />
          </label>
          <label className="input-box">
            <input
              className="input-fields"
              type="url"
              placeholder="Add Image"
              value={imgUrl}
              onChange={e => setImgUrl(e.target.value)}
              required
              />
          </label>
              <ul>
                 {errors.map((error, idx) => <li key={idx}>{error}</li>)}
              </ul>
          <button type="submit">Update Home</button>
        </form>
        </>
      );
    }

    export default UpdateSpotFormModal
