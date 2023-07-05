import { csrfFetch } from './csrf';

// TYPE
const GET_REVIEW = 'review/getReview';

const POST_REVIEW = 'review/postReview';

// ACTION CREATORS
const getReviews = (reviews) => {
    return {
        type: GET_REVIEW,
        reviews
    };
};

const postReview = (review) => {
    return {
        type: POST_REVIEW,
        review
    }
}

// THUNK ACTION CREATORS
export const getReviewsThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if (response.ok) {
        const reviews = await response.json()
        dispatch(getReviews(reviews))
        return reviews
    };
};

export const postReviewsThunk = (review, spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(review)
    })

    if (response.ok) {
        const review = await response.json()
        dispatch(postReview(review))
        return review
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

        case POST_REVIEW: {
            const updatedState = {...state, spot: {...state.spot}, user: {...state.user}}
            updatedState.spot[action.review.id] = action.review
            return updatedState
        };


        default: 
            return state;
    };
};


export default reviewReducer;