import { csrfFetch } from './csrf';

const GET_BOOKINGS = 'bookings/getBookings';
const ADD_BOOKING = 'bookings/addBooking'
const REMOVE_BOOKING = 'bookings/removeBooking';

const getBookings = (bookings) => {
    
    return {
        type: GET_BOOKINGS,
        bookings,
    };
};

const removeBooking = (bookingId) => {
    
    return {
        type: REMOVE_BOOKING,
        bookingId
    };
};

const addBooking = (booking) => {
    return {
        type: ADD_BOOKING,
        booking
    };
};

export const editBooking = (booking) => async (dispatch) => {
    const res = await csrfFetch('/api/bookings', {
        method: 'PUT',
        body: JSON.stringify(booking)
    });

    
    if (res.ok) {
        const editedBooking = await res.json();
        await dispatch(addBooking(editedBooking));
    };
};

export const deleteBooking = (bookingId) => async (dispatch) => {
    const res = await csrfFetch('/api/bookings', {
        method: 'DELETE',
        body: JSON.stringify({ bookingId })
    });
    if (res.ok) {
        const deletedBooking = await res.json();
        dispatch(removeBooking(deletedBooking))
    };
};

export const getAllBookings = () => async (dispatch) => {
    const res = await csrfFetch('/api/bookings');

    if (res.ok) {
        const spots = await res.json();
        dispatch(getBookings(spots));
    };
};

export const createBooking = (booking) => async (dispatch) => {
    const res = await csrfFetch('/api/bookings', {
        method: 'POST',
        body: JSON.stringify(booking)
    });

    if (res.ok) {
        const booking = await res.json();
        await dispatch(addBooking(booking));
    };
};

const initialState = { spotBookings: {}, userBookings: {}};

const bookingsReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case GET_BOOKINGS:
            action.bookings.userBookings.forEach(booking => {
                newState.userBookings[booking.id] = booking
            });
            action.bookings.spotBookings.forEach(booking => {
                newState.spotBookings[booking.id] = booking
            });
            return newState;
        case REMOVE_BOOKING:
            delete newState.userBookings[action.bookingId];
            delete newState.spotBookings[action.bookingId];
            return newState;
        case ADD_BOOKING:
            newState.spotBookings[action.booking.spotBooking.id] = { ...action.booking.spotBooking };
            newState.userBookings[action.booking.userBooking.id] = { ...action.booking.userBooking };
            return newState
        default:
            return state;
    }
};

export default bookingsReducer;