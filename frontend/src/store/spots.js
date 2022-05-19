import { csrfFetch } from './csrf';

const GET_SPOTS = 'spots/getAllSpots';
const GET_SPOT = 'spot/getSpot';
const ADD_SPOT = 'spots/addSpot';
const REMOVE_SPOT = 'spots/removeSpot';
const GET_REVIEWS = 'spots/getReviews';
const REVIEW_STATUS = 'spots/reviewStatus';

const getAllSpots = (spots) => {
    return {
        type: GET_SPOTS,
        spots,
    };
};

const removeSpot = (spotId) => {
    return {
        type: REMOVE_SPOT,
        spotId
    };
};

const addSpot = (spot) => {
    return {
        type: ADD_SPOT,
        spot
    };
};

const getSpot = (spot) => {
    return {
        type: GET_SPOT,
        spot
    };
};

const getReviews = (payload) => {
    return {
        type: GET_REVIEWS,
        payload
    };
};

const reviewStatus = (payload) => {
    return {
        type: REVIEW_STATUS,
        payload
    };
};

export const addSingleSpot = (spot) => async (dispatch) => {
    const res = await csrfFetch('/api/spots', {
        method: 'POST',
        body: JSON.stringify(spot)
    });

    if (res.ok) {
        const newSpot = await res.json();
        await dispatch(addSpot(newSpot));
    };
    return res;
};

export const editSpot = (spot) => async (dispatch) => {
    const res = await csrfFetch('/api/spots', {
        method: 'PUT',
        body: JSON.stringify(spot)
    });

    if (res.ok) {
        const newSpot = await res.json();
        await dispatch(addSpot(newSpot));
    };
    return res;
};

export const deleteSpot = (spotId) => async (dispatch) => {
    const res = await csrfFetch('/api/spots', {
        method: 'DELETE',
        body: JSON.stringify({ spotId })
    });
    if (res.ok) {
        const deletedSpot = await res.json();
        dispatch(removeSpot(deletedSpot));
    };

};

export const getSpots = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots');

    if (res.ok) {
    const spots = await res.json();
    await dispatch(getAllSpots(spots));
    };
};

export const editImages = (images) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${images.spotId}/images`, {
        method: 'PUT',
        body: JSON.stringify(images)
    });
    
    if (res.ok) {
        const editedSpot = await res.json();
        await dispatch(addSpot(editedSpot));
    };
};

export const getSpotReviews = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if (res.ok) {
        const payload = await res.json();
        dispatch(getReviews(payload));
    };
};

export const getReviewStatus = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/bookings`);

    if (res.ok) {
        const payload = await res.json();
        dispatch(reviewStatus(payload));
    };
};

const initialState = {};

const spotsReducer = (state = initialState, action) => {
    let newState = { ...state };

    switch (action.type) {
        case GET_SPOTS:
            console.log(action.spots);
            newState = { ...newState, ...action.spots};
            return newState;

        case REMOVE_SPOT:
            delete newState[action.spotId];
            return newState;

        case ADD_SPOT:
            newState[action.spot.id] = {...action.spot};
            return newState;

        case GET_REVIEWS:
            newState[action.payload.spotId].Reviews = action.payload.reviews;
            return newState;

        case REVIEW_STATUS:
            newState[action.payload.spotId].hasBooked = action.payload.bookings;
            return newState;

        default:
            return state;
    };
};

export default spotsReducer;