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
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const { closeModal } = useModal();

    // const [updatedSpot, setUpdatedSpot] = useState();


    //might not need if params has id already:

        // useEffect(() => {
        //     dispatch(getSpot(spotId))
        //     console.log('RENDERED ONCE')
        // }, [dispatch, updateSpot])

    const handleSubmit = (e) => {
        e.preventDefault();
        setHasSubmitted(true);
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
          preview: false
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
//todo check if create validation inbackend works for upating spot errors rn no errors return.



    return (
        <>
    <h1>Sanctuary Updates</h1>
        <form onSubmit={handleSubmit} className="update-spotform" >
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
            <input
              className="input-fields"
              type="text"
              placeholder="description"
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
          <label className="input-box">
            Image:
            <input
              className="input-fields"
              type="url"
              placeholder="Add New Image (optional)"
              value={imgUrl}
              onChange={e => setImgUrl(e.target.value)}
              // required
              />
          </label>
          <button type="submit">Update Home</button>
          {hasSubmitted && errors.length > 0 && (
              <ul className="error-lists">
                {errors.map((error) => <li key={error}>{error}</li>)}
              </ul>
              )}
        </form>
        </>
      );
    }

    export default UpdateSpotFormModal
