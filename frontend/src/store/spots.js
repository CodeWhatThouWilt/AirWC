import { csrfFetch } from './csrf';

const GET_SPOTS = 'spots/getAllSpots';
const ADD_SPOT = 'spots/addSpot'
const REMOVE_SPOT = 'spots/removeSpot';
const EDIT_SPOT = 'spots/editSpot'


// const editSpot = (spot) => {
//     return {
//         type: EDIT_SPOT,
//         spot
//     }
// };

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

export const addSingleSpot = (spot) => async (dispatch) => {
    // const { name, address, city, country, price } = spot;
    const res = await csrfFetch('/api/spots', {
        method: 'POST',
        body: JSON.stringify(spot)
    });

    if (res.ok) {
        const newSpot = await res.json();
        await dispatch(addSpot(newSpot));
    }
}

export const editSpot = (spot) => async (dispatch) => {
    const res = await csrfFetch('/api/spots', {
        method: 'PUT',
        body: JSON.stringify(spot)
    });

    if (res.ok) {
        const newSpot = await res.json();
        await dispatch(addSpot(newSpot));
    }
}

export const deleteSpot = (spotId) => async (dispatch) => {
    const res = await csrfFetch('/api/spots', {
        method: 'DELETE',
        body: JSON.stringify({ spotId })
    });
    if (res.ok) {
        const deletedSpot = await res.json();
        dispatch(removeSpot(deletedSpot))
    }

}

export const getSpots = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots');

    if (res.ok) {
    const spots = await res.json();
    dispatch(getAllSpots(spots));
    }
}

const initialState = {};

const spotsReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case GET_SPOTS:
            action.spots.forEach(spot => {
                return newState[spot.id] = spot
            });
            return newState;
        case REMOVE_SPOT:
            delete newState[action.spotId];
            return newState;
        case ADD_SPOT:
            newState[action.spot.id] = {...action.spot};
            return newState
        default:
            return state;
    }
};

export default spotsReducer;