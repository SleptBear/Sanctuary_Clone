import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// import { actionDeleteSpot } from '../store/spots'
// import { deleteSpot } from '../store/spots';

const SpotsIndexItem = ({ spot }) => {
    const dispatch = useDispatch();

    // const deleteIndex = async (e) => {
    //     e.preventDefault();
    //     console.log(typeof spot.id)
    //     dispatch(deleteSpot(spot.id))
    // }

    return (
        <div className='card-container'>
            <Link to={`/spots/${spot.id}`}>Spot #{spot.id}</Link>


        </div>
    )
}


export default SpotsIndexItem
