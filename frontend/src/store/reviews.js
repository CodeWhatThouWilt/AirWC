import { csrfFetch } from "./csrf";

const GET_REVIEWS = 'reviews/getReviews'


const getReviews = (reviews) => {
    return {
        type: GET_REVIEWS,
        reviews
    }
}


export const getSpotReviews = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`)
    console.log("Made it")
    if (res.ok) {
        const reviews = await res.json();
        await dispatch(getReviews(reviews));
    }
}




const initialState = {}

const reviewsReducer = (state = initialState, action) => {
    let newState = {...state};
    
    switch (action.type) {
        case GET_REVIEWS:
            action.reviews.forEach(review => {
                newState[review.id] =  review
            });
            return newState
        default:
            return newState
    }
}

export default reviewsReducer;