import { csrfFetch } from './csrf';


//TYPE 
export const GET_REVIEWS = 'reviews/GET_REVIEWS';
export const POST_REVIEW = 'reviews/POST_REVIEW';
export const GET_CURRENT_USER_REVIEW = 'reviews/GET_CURRENT_USER_REVIEW';
export const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW';
export const DELETE_REVIEW = 'reviews/DELETE_REVIEW';


//ACTION CREATORS
export const getReviews = (reviews) => ({
  type: GET_REVIEWS,
  reviews,
});

export const postReview = (review) => ({
  type: POST_REVIEW,
  review,
});

export const getCurrentUserReview = (reviews) => ({
  type: GET_CURRENT_USER_REVIEW,
  reviews,
});

export const updateReview = (review) => ({
  type: UPDATE_REVIEW,
  review,
});

export const deleteReview = (review) => ({
  type: DELETE_REVIEW,
  review,
});


//THUNK ACTION CREATORS
export const getReviewsThunk = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}/reviews`);

  if (response.ok) {
    const spotReviews = await response.json();
    dispatch(getReviews(spotReviews));
    return spotReviews;
  }
};

export const postReviewThunk = (spot, review, user) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spot.id}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review),
  });

  if (response.ok) {
    const spotReview = await response.json();
    spotReview.User = user;
    dispatch(postReview(spotReview));
    return spotReview;
  } else {
    const errors = await response.json();
    return errors;
  }
};


export const getCurrentUserReviewThunk = () => async (dispatch) => {
  const response = await csrfFetch('/api/reviews/current');

  if (response.ok) {
    const userReviews = await response.json();
    dispatch(getCurrentUserReview(userReviews));
  }
};


export const updateReviewThunk = (review) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${review.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review),
  });

  if (response.ok) {
    const updatedReview = await response.json();
    dispatch(updateReview(updatedReview));
    return updatedReview;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const deleteReviewThunk = (review) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${review.id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    dispatch(deleteReview(review));
    return review;
  } else {
    const errors = await response.json();
    return errors;
  }
};


// INITIAL STATE
const initialState = { spot: {}, user: {} };

// REDUCER
const reviewReducer = (state = initialState, action) => {
  switch (action.type) {


    case GET_REVIEWS: {
      const spot = { ...state.spot };

      action.reviews.Reviews.forEach(review => {
        spot[review.id] = review;
      });

      return { ...state, spot };
    }


    case POST_REVIEW: {
      const spot = { ...state.spot };
      spot[action.review.id] = action.review;

      return { ...state, spot };
    }


    case GET_CURRENT_USER_REVIEW: {
      const user = { ...state.user };

      action.reviews.Reviews.forEach(review => {
        user[review.id] = review;
      });

      return { ...state, user };
    }


    case UPDATE_REVIEW: {
      const user = { ...state.user };
      user[action.review.id] = action.review;

      return { ...state, user };
    }


    case DELETE_REVIEW: {
      const spot = { ...state.spot };
      delete spot[action.review.id];

      return { ...state, spot, user: {} };
    }


    default:
      return state;
  }
};

export default reviewReducer;
