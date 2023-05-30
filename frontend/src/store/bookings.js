import { csrfFetch } from "./csrf";

const LOAD_BOOKINGS = 'bookings/loadBookings'
const ADD_BOOKINGS = 'bookings/addBookings'
const EDIT_BOOKINGS = 'bookings/editBookings'
const DELETE_BOOKINGS = 'bookings/deleteBooking'
const LOAD_USER_BOOKINGS = 'bookings/loadUserBookings'


export const loadBookings = (bookings) => ({
    type: LOAD_BOOKINGS,
    payload: bookings
})


export const createBooking = (bookings) => ({
    type: ADD_BOOKINGS,
    payload: bookings
})


export const removeBooking = (bookings) => ({
    type: DELETE_BOOKINGS,
    payload: bookings
})

export const updateBookings = (bookings) => ({
    type: EDIT_BOOKINGS,
    payload: bookings
})

export const loadUserBookings = (bookings) => ({
    type: LOAD_USER_BOOKINGS,
    payload: bookings
})

export const getAllBookings = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${id}/bookings`)
    if (response.ok) {
        const bookingData = await response.json()
        console.log({bookingData})
        dispatch(loadBookings(bookingData))
        return bookingData
    }
}

export const getAllBookingUser = () => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/current`)
    if (response.ok) {
        const bookings = await response.json()
        // dispatch(loadAllReviewsForUser(reviews))
        // dispatch(loadBookings(bookings))
        dispatch(loadUserBookings(bookings))
        return bookings
    }
}


export const addBookings = (booking) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${booking.spotId}/bookings`, {
        method: 'POST',
        body: JSON.stringify(booking)
    })
    if (response.ok) {
        const booking = await response.json()
        dispatch(createBooking(booking))
        return booking
    }
}

export const deleteBooking = (bookingId) => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(removeBooking(data))
        return data
    }
}

export const editBookings = (booking) => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/${booking.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking)
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(updateBookings(data))
        // console.log('after dispatch', data)
        return data
    }
}

const initialState = { allBookings: {}, singleBooking: {}, userBookings: {} }

export const bookingsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_BOOKINGS:
            newState = { ...state }
            let copy = {}
            // console.log('newState', newState)
            // console.log('ACTION2', action.payload)
            action.payload.Bookings.forEach((booking, index) => {
                // console.log('ACTION', action.payload)

                copy[index] = booking
            });
            newState.allBookings = copy
            return newState
        case LOAD_USER_BOOKINGS:
            newState = { ...state }
            let copy4 = {}
            // console.log('newState', newState)
            // console.log('ACTION2', action.payload.id)
            action.payload.Bookings.forEach((booking, index) => {
                // console.log('ACTION', action.payload)

                copy4[index] = booking
            });
            newState.userBookings = copy4
            return newState
        case ADD_BOOKINGS:
            newState = { ...state }
            let copy2 = { ...newState.allBookings }
            // console.log('ACTION', action.payload)
            // console.log('newState', newState)
            // console.log('ACTION2', action.payload.id)
            copy2[action.payload.id] = action.payload
            newState.allBookings = copy2
            return newState;
        case EDIT_BOOKINGS:
            const updatedBookings = { ...state.singleBooking }
            updatedBookings[action.payload.id] = action.payload
            return { ...state, singleBooking: updatedBookings }
        case DELETE_BOOKINGS:
            newState = {...state}
            let copy3 = {...newState.allBookings}
            delete copy3[action.payload.id]
            newState.allBookings = copy3
            return newState
        default:
            return state
    }
}
