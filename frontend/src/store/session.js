import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user,
    };
};

const removeUser = () => {
    return {
        type: REMOVE_USER,
    };
};

export const logout = () => async (dispatch) => {
    const res = csrfFetch('/api/session', {
        method: 'DELETE'
    });

    dispatch(removeUser());
    return res;
}

export const signup = (user) => async (dispatch) => {
    const { firstName, lastName, email, password } = user;
    const res = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
            firstName,
            lastName,
            email,
            password
        })
    });

    if (res.ok) {
        const { user } = await res.json();
        dispatch(setUser(user));
        return user;
    }
}

export const restoreUser = () => async (dispatch) => {
    const res = await csrfFetch('/api/session');

    if (res.ok) {
        const { user } = await res.json();
        dispatch(setUser(user));
        return user;
    }
}

export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password,
        }),
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case SET_USER:
            newState.user = action.payload;
            return newState;
        case REMOVE_USER:
            newState.user = null;
            return newState;
        default:
            return state;
    }
};

export default sessionReducer;