import { csrfFetch } from './csrf';

// TYPE
const GET_REVIEW = 'review/getReview';

// ACTION CREATORS
const getReviews = (reviews) => {
    return {
        type: GET_REVIEW,
        reviews
    };
};

// THUNK ACTION CREATORS
export const getReviewsThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if (response.ok) {
        const reviews = await response.json()
        dispatch(getReviews(reviews))
        return reviews
    };
};

// INITIAL STATE
const initialState = { 
    spot: {}, 
    user: {} 
};

// REDUCER
const reviewReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_REVIEW: {
            const updatedState = {...state, spot: {}, user: {}}
            const reviews = action.reviews.Reviews
            reviews.forEach(review => updatedState.spot[review.id] = review)
            return updatedState
        };
        default: 
            return state;
    };
};

export default reviewReducer;