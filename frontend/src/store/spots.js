//THINK YOU ONLY NEED NEW REF'S IN MEMORY FOR CREATE AND UPDATE
//SINCE THEY ARE ACTUALLY GOING TO CHANGE DATA
import { csrfFetch } from "./csrf";

const CREATE = 'spots/CREATE_SPOT';
const READ_ONE = 'spots/READ_ONE_SPOT';
const READ_ALL = 'spots/READ_SPOTS';
const UPDATE = 'spots/UPDATE_SPOT';
const DELETE = 'spots/DELETE_SPOT';

export const actionCreateSpot = (spot) => ({
    type: CREATE,
    spot
})
export const actionReadSpots = (spots) => ({
    type: READ_ALL,
    spots
})
export const actionReadSpot = (spot) => ({
    type: READ_ONE,
    spot
})
export const actionUpdateSpot = (spot) => ({
    type: UPDATE,
    spot
})
export const actionDeleteSpot = (id) => ({
    type: DELETE,
    id
})

export const createSpot = (spot, imgData) => async dispatch => {

    const res = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(spot)
})

const data = await res.json()
if (res.ok) {
    data.Owner = spot.Owner
    // data.SpotImages = spot.SpotImages

    const res2 = await csrfFetch(`/api/spots/${data.id}/images`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(imgData)
    })
    if(res2.ok) {
        const data2 = await res2.json();
        data.SpotImages = [data2]

    }

        console.log("DATA", data)
        dispatch(actionCreateSpot(data))


    }
    return data
}

export const getSpots = () => async dispatch => {
    const res = await csrfFetch('/api/spots/');

    const spots = await res.json();
    if (res.ok) {
        // console.log('from get spots thunk', spots)
        dispatch(actionReadSpots(spots))

    }
    return spots
}

export const getSpot = (spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}`);

    const spot = await res.json();
    if (res.ok) {
        // console.log('from get spot thunk', spot)
        dispatch(actionReadSpot(spot))
    }
    return spot
}


export const updateSpot = (spot, spotId, imgData) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot)
    })

    const data = await res.json();
    if (res.ok) {
        data.Owner = spot.Owner
        data.SpotImages = spot.SpotImages

        const res2 = await csrfFetch(`/api/spots/${spotId}/images`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(imgData)
        })

        if(res2.ok) {
            const data2 = await res2.json();
            data.SpotImages.push(data2)

        }
        dispatch(actionUpdateSpot(data))

    }

    console.log("DATA AFTER IMAGE ADDED", data)
    console.log('does it reach here')
    return data
}

export const deleteSpot = (spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'})

        if (res.ok) {
            const data = await res.json();
            dispatch(actionDeleteSpot(spotId))
            return data
        }
}

const initialState = { spots: {}, spot: {} }

export default function spotReducer(state = initialState, action) {
    let newState = { ...state}
    const normalizedSpots = {}
    switch (action.type) {
        case CREATE:
            // newState[action.spot.id] = action.spot
            newState = { ...state, spots: {...state.spots}, spot: {...state.spot} }
            newState.spots[action.spot.id] = action.spot
            newState.spot = action.spot
            return newState
        case READ_ALL:
            action.spots.Spots.forEach(spot => {
                normalizedSpots[spot.id] = spot
            });
            newState.spots = normalizedSpots
            newState.spot = {}
            return newState
        case READ_ONE:

            newState = { ...state, spots: {...state.spots}, spot: {...state.spot} }
            newState.spot = action.spot
            return newState
        case UPDATE:
            newState = { ...state, spots: {...state.spots}, spot: {...state.spot} }
            newState.spot = action.spot
            // console.log("UPDATE TEST", newState)
            return newState
        case DELETE:
            // delete newState[action.id]
            newState.spot = {}
            return newState
        default:
            return state;
    }
}
