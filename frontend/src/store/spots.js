import { csrfFetch } from './csrf';

const GET_SPOTS = 'spots/getAllSpots';
const ADD_SPOT = 'spots/addSpot'
const REMOVE_SPOT = 'spots/removeSpot';

const getAllSpots = (spots) => {
    return {
        type: GET_SPOTS,
        spots,
    };
};

const removeSpot = () => {
    return {
        type: REMOVE_SPOT,
    };
};

const addSpot = (spot) => {
    return {
        type: ADD_SPOT,
        spot
    }
}

export const addSingleSpot = (spot) => async (dispatch) => {
    // const { name, address, city, country, price } = spot;
    const res = await csrfFetch('/api/spots', {
        method: 'POST',
        body: JSON.stringify(spot)
    });

    if (res.ok) {
        const newSpot = await res.json();
        dispatch(addSpot(newSpot));
        return newSpot;
    }
}

export const getSpots = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots');

    if (res.ok) {
    const spots = await res.json();
    dispatch(getAllSpots(spots));
    return spots;
    }
}

// export const signup = (user) => async (dispatch) => {
//     const { firstName, lastName, email, password } = user;
//     const res = await csrfFetch('/api/users', {
//         method: 'POST',
//         body: JSON.stringify({
//             firstName,
//             lastName,
//             email,
//             password
//         })
//     });



const initialState = {};

const spotsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_SPOTS:
            newState = { ...state };
            action.spots.forEach(spot => {
                return newState[spot.id] = spot
            });
            return newState;
        case REMOVE_SPOT:
            newState = { ...state };
            newState.user = null;
            return newState;
        case ADD_SPOT:
            newState = { ...state, [action.spot.id]:{...action.spot} };
            return newState
        default:
            return state;
    }
};

export default spotsReducer;