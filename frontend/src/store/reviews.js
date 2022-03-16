import { csrfFetch } from "./csrf";

const GET_REVIEWS = 'reviews/getReviews'


const getReviews = (reviews) => {
    return {
        type: GET_REVIEWS,
        reviews
    }
}






const initialState = {}

const reviewsReducer = (state = initialState, action) => {
    let newState = {...state};
    
    switch (action.type) {
        case GET_REVIEWS:
            break
        default:
            return newState
    }
}

export default reviewsReducer;