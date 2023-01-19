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

    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(spot)
})
    if (response.ok) {
        const data = await response.json()
        dispatch(createSpot(data))
    }

}

export const deleteSpot = (spotId) => async dispatch => {

    const response = await csrfFetch(`/api/spots/${spotId}`, {method: 'DELETE'})

        if (response.ok) {
            const res = await response.json();
            dispatch(actionDeleteSpot(spotId))
            return res
        }

}


export const getSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots/');

    if (response.ok) {
        const spots = await response.json();

        dispatch(actionReadSpots(spots))
    }
}

export const getSpot = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`);


    if (response.ok) {
        const spot = await response.json();
        console.log('from get spot thunk', spot)
        dispatch(actionReadSpot(spot))
    }
}




const initialState = { spots: {}, spot: {} }


export default function spotReducer(state = initialState, action) {
    const newState = { ...state }
    switch (action.type) {
        case CREATE:
            newState[action.spot.id] = action.spot
            return newState
        case READ_ALL:
            newState.spots = action.spots
            return newState
        case READ:
            newState.spot = action.spot
            return newState
        case UPDATE:
            newState[action.spot.id] = {
                ...state[action.spot.id],
                address: action.spot.address,
                city: action.spot.city,
                state: action.spot.state,
                country: action.spot.country,
                lat: action.spot.lat,
                lng: action.spot.lng,
                name: action.spot.name,
                description: action.spot.description,
                price: action.spot.price
            }
            return newState
        case DELETE:
            delete newState[action.id]
            return newState
        default:
            return state;
    }
}
