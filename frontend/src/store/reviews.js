import { csrfFetch } from "./csrf";

const CREATE = 'reviews/CREATE_REVIEW';
const READ = 'reviews/READ_REVIEWS';
const READ_USER = 'reviews/READ_USER_REVIEWS';
// const UPDATE = 'reviews/UPDATE_REVIEW';
const DELETE = 'reviews/DELETE_REVIEW';

export const actionCreateReview = (review) => ({
    type: CREATE,
    review
})

export const actionReadReviews = (reviews) => ({
    type: READ,
    reviews
})
export const actionReadUserReviews = (reviews) => ({
    type: READ_USER,
    reviews
})

// export const actionUpdateReview = (review) => ({
//     type: UPDATE,
//     review
// })
export const actionDeleteReview = (id) => ({
    type: DELETE,
    id
})

export const createReview = (spotId, review) => async dispatch => {

    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(review)
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(actionCreateReview(data))
        return data
    }
}

export const getReviews = (spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`)

    if (res.ok) {
        console.log("response", res)
        const review = await res.json();
        console.log("Reviews?", review)
        dispatch(actionReadReviews(review))
    }
}

export const getUserReviews = () => async dispatch => {
    const res = await csrfFetch('/api/reviews/current')

    if (res.ok) {
        const reviews = await res.json();
        dispatch(actionReadUserReviews(reviews))
    }
}

// export const updateReview = (review, reviewId) => async dispatch => {
//     const res = await csrfFetch(`/api/reviews/${reviewId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(review)
//     })

//     if (res.ok) {
//         const data = await res.json();
//         dispatch(actionUpdateReview(data))

//         return data
//     }
// }

export const deleteReview = (reviewId) => async dispatch => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })

    if (res.ok) {
        const data = await res.json();
        dispatch(actionDeleteReview(data))
        return data
    }
}


let initialState = { spot: {}, user: {} }

export default function reviewReducer(state = initialState, action) {
    let newState = { ...state}
    switch(action.type) {
        case CREATE:
            newState = { ...state, spot: {...state.spot}, user: {...state.user} }
            newState.spot.Reviews.push(action.review)
            newState.user.Reviews.push(action.review)
            return newState
        case READ_USER:
            newState.user = action.reviews
            return newState
        case READ:
            newState.spot = action.reviews
            return newState
        // case UPDATE:
        //     newState = { ...state, spot: {...state.spot}, user: {...state.user} }
        //     return newState
        case DELETE:
            const delReview = {
                ...state
            }
            delete delReview.spot[action.reviewId]
            return newState
        default:
            return state
    }
}
