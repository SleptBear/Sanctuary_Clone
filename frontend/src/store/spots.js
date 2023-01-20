import { csrfFetch } from "./csrf";

const CREATE = 'spots/CREATE_SPOT';
const READ = 'spots/READ_SPOT';
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
    type: READ,
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

export const createSpot = (spot) => async dispatch => {
console.log(spot)
console.log("LOOOOOOK", JSON.stringify(spot))
    const res = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(spot)
})
    if (res.ok) {
        console.log("New Spot from API", res)
        const data = await res.json()
        console.log("DATA", data)
        dispatch(actionCreateSpot(data))
        return data
    }
}

export const deleteSpot = (spotId) => async dispatch => {

    const res = await csrfFetch(`/api/spots/${spotId}`, {method: 'DELETE'})

        if (res.ok) {
            const data = await res.json();
            dispatch(actionDeleteSpot(spotId))
            return data
        }

}

export const updateSpot = (spot, spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot)
    })
    if (res.ok) {
        const data = await res.json()
        data.Owner = spot.Owner
        data.spotImages = spot.spotImages
        dispatch(actionUpdateSpot(data))

        return data
    }
}


export const getSpots = () => async dispatch => {
    const res = await csrfFetch('/api/spots/');

    if (res.ok) {
        const spots = await res.json();

        dispatch(actionReadSpots(spots))
    }
}

export const getSpot = (spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}`);


    if (res.ok) {
        const spot = await res.json();
        console.log('from get spot thunk', spot)
        dispatch(actionReadSpot(spot))
    }
}




const initialState = { spots: {}, spot: {} }


export default function spotReducer(state = initialState, action) {
    const newState = { ...state, spots: {...state.spots}, spot: {...state.spot} }
    switch (action.type) {
        case CREATE:
            // newState[action.spot.id] = action.spot
            newState.spot = action.spot
            return newState
        case READ_ALL:
            newState.spots = action.spots
            return newState
        case READ:
            newState.spot = action.spot
            return newState
        // 
        case UPDATE:
            newState.spot = action.spot
            console.log("UPDATE TEST", newState)
            return newState
        case DELETE:
            // delete newState[action.id]
            newState.spot = {}
            // newState.spot = action.spot
            // delete newState.spot
            console.log("DELETE TEST", newState)
            return newState
        default:
            return state;
    }
}
