import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionDeleteSpot } from '../store/spots'

const SpotIndexItem = ({ spot }) => {
    const dispatch = useDispatch();

    const deleteSpot = async (e) => {
        e.preventDefault();
        dispatch(actionDeleteSpot(spot.id))
    }

    return (
        <li>
            <Link to={`/spots/${spot.id}`}>Spot #{spot.id}</Link>
            <button>Update</button>
            <button onClick={deleteSpot}>Delete</button>
        </li>
    )
}


export default SpotIndexItem
