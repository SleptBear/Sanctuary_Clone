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

export const getSpots = () => async dispatch => {
    const res = await csrfFetch('/api/spots/');

    if (res.ok) {
    const spots = await res.json();
    let normalizedSpots = {}
    let spotsArray = spots.Spots

        spotsArray.forEach(spot => {
            normalizedSpots[spot.id] = spot
        });
        dispatch(actionReadSpots(normalizedSpots))
    }

}
export const createSpot = (spot, imgData) => async dispatch => {

    const res = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(spot)
})
// console.log("RES", res)
// console.log("DATA Before Change", data)

if (res.ok) {
    const data = await res.json()
    const res2 = await csrfFetch(`/api/spots/${data.id}/images`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(imgData)
    })
    if(res2.ok) {
        const data2 = await res2.json();
        // console.log("data2", data2)
        data.previewImage = data2.url
        // console.log("DATA After Change", data)
    }
        dispatch(actionCreateSpot(data))
    }
    //todo  send data with data 2 attached?
    
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
            //todo for all thunks return data to send back to component for error handeling
        }
}

const initialState = { spots: {}, spot: {} }

export default function spotReducer(state = initialState, action) {
    let newState = { ...state}
    switch (action.type) {
        case CREATE:
            // newState[action.spot.id] = action.spot
            newState = { ...state, spots: {...state.spots}, spot: {...state.spot} }
            newState.spots[action.spot.id] = action.spot
            // newState.spot = action.spot
            //todo go back to normalizing data here in reducer to account for differing state shapes of spot and spots
            //todo think about chaining thunk dispatches
            //todo can try to add get state to thunk
            return newState

        case READ_ALL:
            newState.spots = {...action.spots}
            // newState.spot = {}
            return newState

        case READ_ONE:
            newState = { ...state, spots: {...state.spots}, spot: {...state.spot} }
            newState.spot = action.spot
            // newState.spots = {}
            return newState

        case UPDATE:
            newState = { ...state, spots: {...state.spots}, spot: {...state.spot} }
            newState.spot = action.spot
            // console.log("UPDATE TEST", newState)
            return newState

        case DELETE:
            // delete newState[action.id]
            //TODO might want to add in empty replacement for spots
            newState.spot = {}
            return newState

        default:
            return state;
    }
}
