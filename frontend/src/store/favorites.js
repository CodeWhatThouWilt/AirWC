import { csrfFetch } from './csrf';

const GET_FAVORITES = 'favorites/getFavorites';
const ADD_FAVORITE = 'favorites/addFavorite';
const REMOVE_FAVORITE = 'favorites/removeFavorite';
const REMOVE_ALL_FAVORITES = 'favorites/removeAllFavorites';

const getFavorites = (payload) => {
    return {
        type: GET_FAVORITES,
        payload
    };
};

const addFavorite = (favorite) => {
    return {
        type: ADD_FAVORITE,
        favorite
    };
};

const removeFavorite = (favorite) => {
    return {
        type: REMOVE_FAVORITE,
        favorite
    };
};

export const removeAllFavorites = () => {
    return {
        type: REMOVE_ALL_FAVORITES
    };
};

export const getAllFavorites = () => async(dispatch) => {
    const res = await csrfFetch(`/api/favorites`);

    if (res.ok) {
        const payload = await res.json();
        dispatch(getFavorites(payload));
    };
};

export const createFavorite = (spotId) => async(dispatch) => {
    const res = await csrfFetch('/api/favorites', {
        method: 'POST',
        body: JSON.stringify({spotId})
    });

    if (res.ok) {
        const favorite = await res.json();
        dispatch(addFavorite(favorite));
    };
};

export const deleteFavorite = (favId) => async(dispatch) => {
    const res = await csrfFetch(`/api/favorites/${favId}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        const favorite = await res.json();
        dispatch(removeFavorite(favorite));
    };
};

const initialState = {};

const favoritesReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {

        case GET_FAVORITES:
            newState = { ...newState, ...action.payload };
            return newState;

        case ADD_FAVORITE:
            newState[action.favorite.spotId] = action.favorite;
            return newState;

        case REMOVE_FAVORITE:
            delete newState[action.favorite.spotId];
            return newState;

        case REMOVE_ALL_FAVORITES:
            return initialState;

        default:
            return state;
    }
};

export default favoritesReducer;