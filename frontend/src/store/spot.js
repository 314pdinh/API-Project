import { csrfFetch } from "./csrf";

//TYPE 
export const GET_ALL_SPOTS = 'spots/GET_ALL_SPOTS';
export const GET_SPOT = 'spots/GET_SPOT';
export const GET_CURRENT_USER_SPOT = 'spots/GET_CURRENT_USER_SPOT';
export const CREATE_SPOT = 'spot/CREATE_SPOT';
export const UPDATE_SPOT = 'spots/UPDATE_SPOT';
export const DELETE_SPOT = 'spots/DELETE_SPOT';

// ACTION CREATORS 
export const getAllSpots = (spots) => ({
  type: GET_ALL_SPOTS,
  spots,
});

export const getSpot = (spot) => ({
  type: GET_SPOT,
  spot,
});

export const getCurrentUserSpot = (spots) => ({
  type: GET_CURRENT_USER_SPOT,
  spots,
});

export const createSpot = (spot) => ({
  type: CREATE_SPOT,
  spot
})

export const updateSpot = (spot) => ({
  type: UPDATE_SPOT,
  spot,
});

export const deleteSpot = (spot) => ({
  type: DELETE_SPOT,
  spot,
});


// THUNK ACTION CREATORS
export const getAllSpotsThunk = () => async (dispatch) => {
  const response = await csrfFetch('/api/spots');

  if (response.ok) {
    const spots = await response.json();
    dispatch(getAllSpots(spots));
    return spots;
  }
};

export const getSpotThunk = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}`);

  if (response.ok) {
    const spotInfo = await response.json();
    dispatch(getSpot(spotInfo));
    return spotInfo;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const getCurrentUserSpotThunk = () => async (dispatch) => {
  const response = await csrfFetch('/api/spots/current');

  if (response.ok) {
    const userSpots = await response.json();
    dispatch(getCurrentUserSpot(userSpots));
  }
};

export const createSpotThunk = (spot, images) => async (dispatch) => {
  const response = await csrfFetch('/api/spots', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(spot),
  });

  const newSpot = await response.json();
  if (response.ok) {
    for (let img of images) {
      await csrfFetch(`/api/spots/${newSpot.id}/images`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(img),
      });
    }

    dispatch(getSpot(newSpot));
    return newSpot;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const updateSpotThunk = (spot) => async (dispatch) => {
  try {
    console.log("Update Spot Thunk called with spot:", spot);
    const response = await csrfFetch(`/api/spots/${spot.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(spot),
    });

    if (response.ok) {
      const updatedSpotId = await response.json();
      console.log("Update Spot Thunk - Response from API:", updatedSpotId);
      dispatch(updateSpot(updatedSpotId));
      return updatedSpotId;
    } else {
      const errors = await response.json();
      console.log("Update Spot Thunk - Error Response from API:", errors);
      return errors;
    }
  } catch (error) {
    console.log("Update Spot Thunk - Error:", error);
    return error;
  }
};

export const deleteSpotThunk = (spot) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spot.id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    dispatch(deleteSpot(spot));
  } else {
    const errors = await response.json();
    return errors;
  }
};


//Initial State
const initialState = { allSpots: {}, singleSpot: {} };

//Reducer
const spotReducer = (state = initialState, action) => {
  switch (action.type) {


    case GET_ALL_SPOTS: {
      const allSpots = { ...state.allSpots };

      action.spots.Spots.forEach(spot => {
        allSpots[spot.id] = spot;
      });

      return { ...state, allSpots };
    }


    case GET_SPOT: {
      return { ...state, singleSpot: { ...action.spot } };
    }


    case GET_CURRENT_USER_SPOT: {
      const allSpots = { ...state.allSpots };

      if (action.spots && action.spots.Spots) {
        action.spots.Spots.forEach(spot => {
          allSpots[spot.id] = spot;
        });
      }

      return { ...state, allSpots };
    }


    case UPDATE_SPOT: {
      console.log("Reducer - UPDATE_SPOT action:", action);
      console.log("Reducer - Current state:", state);
      console.log("Reducer - action.spot:", action.spot);
      console.log("updateSpot Reducer - newState", newState)
      
      
      const newState = { ...state, allSpots: { ...state.allSpots }, singleSpot: { ...state.singleSpot } }
      newState.allSpots[action.spot.id] = {...newState.allSpots[action.spotId], ...action.spot}
      // return { ...state, singleSpot: { ...action.spot } };    }
    }

    case DELETE_SPOT: {
      const allSpots = { ...state.allSpots };
      delete allSpots[action.spot.id];
      return { ...state, allSpots, singleSpot: {} };
    }


    default:
      return state;
  }
};

export default spotReducer;