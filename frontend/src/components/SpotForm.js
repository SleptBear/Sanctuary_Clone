import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { actionCreateSpot } from "../store/spots";
import { useModal } from "../context/Modal";

const SpotForm = ({ spot, formType }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [address, setAddress] = useState();
    const [city, setCity] = useState();
    const [state ,setState] = useState();
    const [lat ,setLat] = useState();
    const [lng ,setLng] = useState();
    const [country ,setCountry] = useState();
    const [name ,setName] = useState();
    const [description ,setDescription] = useState();
    const [price ,setPrice] = useState();

    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefaults();
        spot = { ...spot, address, city, state, lat, lng, name, description, price };
        dispatch(actionCreateSpot(spot))
        history.push(`/spots/${spot.id}`);
    };

    return (

        <form onSubmit={handleSubmit} >
          <h2>{formType}</h2>
          <label>
            address
            <input
              type="text"
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
          </label>
          <label>
            city
            <textarea
              value={city}
              onChange={e => setCity(e.target.value)}
            />
          </label>
          <label>
            state
            <textarea
              value={state}
              onChange={e => setCity(e.target.value)}
            />
          </label>
          <label>
            latitude
            <textarea
              value={lat}
              onChange={e => setCity(e.target.value)}
            />
          </label>
          <label>
            longitude
            <textarea
              value={lng}
              onChange={e => setCity(e.target.value)}
            />
          </label>
          <label>
            country
            <textarea
              value={country}
              onChange={e => setCity(e.target.value)}
            />
          </label>
          <label>
            name
            <textarea
              value={name}
              onChange={e => setCity(e.target.value)}
            />
          </label>
          <label>
            description
            <textarea
              value={description}
              onChange={e => setCity(e.target.value)}
            />
          </label>
          <label>
            price
            <textarea
              value={price}
              onChange={e => setCity(e.target.value)}
            />
          </label>
          <input type="submit" value={formType} />
        </form>
      );
    }

    export default SpotForm
