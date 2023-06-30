import { csrfFetch } from './csrf';

// Action Types
const GET_ALL_SPOTS = 'spot/getAllSpots';

// Action Creators
const getAllSpots = (spots) => ({
  type: GET_ALL_SPOTS,
  spots
});

// Thunk Action
export const getAllSpotsThunk = () => async (dispatch) => {
  const response = await csrfFetch('/api/spots');

  if (response.ok) {
    const { Spots } = await response.json();
    dispatch(getAllSpots(Spots));
    return Spots;
  }
};

// Initial State
const initialState = {
  allSpots: {},
  singleSpot: { SpotImages: [] }
};

// Reducer
const spotReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SPOTS: {
      const allSpots = {};
      action.spots.forEach((spot) => {
        allSpots[spot.id] = spot;
      });
      return { ...state, allSpots };
    }
    default:
      return state;
  }
};

export default spotReducer;