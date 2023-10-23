import { csrfFetch } from './csrf';

// Type
export const CREATE_BOOKING = 'bookings/CREATE_BOOKING';

// Action Creators
export const createBooking = (booking) => ({
    type: CREATE_BOOKING,
    booking
})


// Thunk Action Creators
export const createBookingThunk = (spot, booking) => async (dispatch) => {

    try {
        const response = await csrfFetch(`/api/spots/${spot.id}/bookings`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(booking)
        })

        if (response.ok) {
            const newBooking = await response.json();
            console.log('ok response newBooking:', newBooking);
            dispatch(createBooking(newBooking));
            return newBooking;
        } else {
            const error = await response.json();
            console.log('not ok response error:', error);
            return error
        }

    } catch (error) {
        console.log('createBookingThunk ERROR:', error);
        return error;
    }
}

// Initial State
const initialState = { user: {}, spot: {} };

// Reducer
const bookingReducer = (state = initialState, action ) => {
    let newState;
    switch (action.type) {
        case CREATE_BOOKING:
        newState = { ...state, user: { ...state.user }, spot: { ...state.spot } };
        newState.spot[action.booking.id] = action.booking;
        return newState

        default:
            return state;
    }
};

export default bookingReducer;