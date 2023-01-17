const CREATE = '';
const READ = '';
const UPDATE = '';
const DELETE = '';

export const actionCreateSpot = (spot) => ({
    type: CREATE,
    spot
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




const initialState = {}


export default function spotReducer(state = initialState, action) {
    const newState = {...state}
    switch (action.type) {
        case CREATE:
            newState[action.book.id] = action.book
            return newState
        // case READ:
        case UPDATE:
            newState[action.book.id] = { ...state[action.book.id],
                address: action.spot.address,
                city: action.spot.city,
                state: action.spot.state,
                country: action.spot.country,
                lat: action.spot.lat,
                lng: action.spot.lng,
                name: action.spot.name,
                description: action.spot.description,
                price: action.spot.price}
            return newState
        case DELETE:
            delete newState[action.id]
            return newState
        default:
             return state;
    }
}
