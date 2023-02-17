import { csrfFetch } from "./csrf";


const CREATE = 'reviews/CREATE_REVIEW';
const READ_SPOT = 'reviews/READ_SPOT_REVIEWS';
const READ_USER = 'reviews/READ_USER_REVIEWS';
// const UPDATE = 'reviews/UPDATE_REVIEW';
const DELETE = 'reviews/DELETE_REVIEW';

export const actionCreateReview = (review) => ({
    type: CREATE,
    review
})

export const actionReadReviews = (reviews) => ({
    type: READ_SPOT,
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

    export const actionDeleteReview = (reviewId) => ({
        type: DELETE,
        reviewId
    })

    export const deleteReview = (reviewId) => async dispatch => {
        const res = await csrfFetch(`/api/reviews/${reviewId}`, {
            method: 'DELETE'
        })
        // console.log('res', res)
        if (res.ok) {
            // const data = await res.json();
            dispatch(actionDeleteReview(reviewId))

            // return reviewId
        }
    }
    export const createReview = (spotId, review) => async dispatch => {

        const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(review)
        })

        const data = await res.json()
    if (res.ok) {
        dispatch(actionCreateReview(data))
        dispatch(getReviews(spotId))
        // console.log("data for create review action", data)
    }
    return data
}

export const getReviews = (spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`)

    if (res.ok) {
        // console.log("response", res)
        const review = await res.json();
        // console.log("Reviews?", review)
        dispatch(actionReadReviews(review))
    }
}

export const getUserReviews = () => async dispatch => {
    const res = await csrfFetch('/api/reviews/current')

    if (res.ok) {
        const review = await res.json();
        dispatch(actionReadUserReviews(review))
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



let initialState = { spot: {}, user: {} }

export default function reviewReducer(state = initialState, action) {
    let newState = { ...state}
    const normalizedReviews = {}
    switch(action.type) {
        case READ_SPOT:
            // console.log(action)
            action.reviews.Reviews.forEach(
                (review) => (normalizedReviews[review.id] = review)
            );
            newState.spot = normalizedReviews;

            return newState
        case READ_USER:
            action.reviews.Reviews.forEach(
                (review) => (normalizedReviews[review.id] = review)
            );
            newState.user = normalizedReviews
            return newState
        case CREATE:
            newState = { ...state, spot: {...state.spot}, user: {...state.user} }
            // newState.spot.Reviews.push(action.review)
            // newState.user.Reviews.push(action.review)
            newState.user = {...state.user}
            newState.spot = {...state.spot, [action.review.id]: action.review}
            return newState
        // case UPDATE:
        //     newState = { ...state, spot: {...state.spot}, user: {...state.user} }
        //     return newState
        case DELETE:

            newState.spot = {...state.spot}
            newState.user = {...state.user}
            delete newState.spot[action.reviewId]
            delete newState.user[action.reviewId]
            return newState
        default:
            return state
    }
}
