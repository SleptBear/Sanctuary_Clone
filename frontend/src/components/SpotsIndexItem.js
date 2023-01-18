import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionDeleteSpot } from '../store/spots'

const SpotIndexItem = ({ spot }) => {
    const dispatch = useDispatch();

    const deleteSpot = async (e) => {
        e.preventDefault();
        await dispatch(actionDeleteSpot(spot.id))
    }

    return (
        <li>
            <Link>Spot Name and Id</Link>
            <Link>Update</Link>
            <button onClick={deleteSpot}>Delete</button>
        </li>
    )
}


export default SpotIndexItem
