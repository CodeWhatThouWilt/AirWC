import { csrfFetch } from './csrf';

const GET_FAVORITES = 'favorites/getFavorites';

const getFavorites = (payload) => {
    return {
        type: GET_FAVORITES,
        payload
    };
};

export const getAllFavorites = () => async(dispatch) => {
    const res = await csrfFetch(`/api/favorites`);

    if (res.ok) {
        const payload = await res.json();
        dispatch(getFavorites(payload));
    };
};

const initialState = {};

const favoritesReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {

        case GET_FAVORITES:
            newState = { ...newState, ...action.payload };
            return newState;

        default:
            return state;
    }
};

export default favoritesReducer;