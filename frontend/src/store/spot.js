import { csrfFetch } from './csrf';

// TYPE
const GET_ALL_SPOTS = 'spot/getAllSpots';

const GET_SPOT = 'spot/getSpot';

const CREATE_SPOT = 'spot/createSpot';

// ACTION CREATORS
const getAllSpots = (spots) => ({
  type: GET_ALL_SPOTS,
  spots
});

const getSpot = (spot) => ({
  type: GET_SPOT,
  spot
})

export const createSpot = (newSpot) => ({
  type: CREATE_SPOT,
  newSpot
})


// THUNK ACTION CREATORS
export const getAllSpotsThunk = () => async (dispatch) => {
  const response = await csrfFetch('/api/spots');

  if (response.ok) {
    const { Spots } = await response.json();
    dispatch(getAllSpots(Spots));
    return Spots;
  }
};

export const getSpotThunk = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`);

  if (response.ok) {
    const spot = await response.json();
    dispatch(getSpot(spot));
    return spot;
  }
}

export const createSpotThunk = (spot, image) => async (dispatch) => {

  const response = await csrfFetch("/api/spots", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(spot),
  });

  if (response.ok) {
    const newSpot = await response.json();
    dispatch(createSpotImagesThunk(newSpot, image));
    return newSpot;
  }

};

export const createSpotImagesThunk = (newSpotId, images) => async (dispatch) => {
  for (const image of images) {
    const imageResponse = await csrfFetch(`/api/spots/${newSpotId.id}/images`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(image),
    });

    if (imageResponse.ok) {
      const newImage = await imageResponse.json();
      newSpotId.previewImage = newImage.url;
      dispatch(createSpot(newSpotId));
      return newSpotId;

    } 
  }
};

// Initial State
const initialState = {
  allSpots: {},
  singleSpot: { SpotImages: [] }
};

// REDUCER
const spotReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SPOTS: {
      const allSpots = {};
      action.spots.forEach((spot) => {
        allSpots[spot.id] = spot;
      });
      return {
        ...state,
        allSpots
      };
    }

    case GET_SPOT: {
      const updatedSpotImages = action.spot.SpotImages.map((image, i) => {
        return state.singleSpot.SpotImages[i] || image;
      });
      const updatedSingleSpot = {
        ...action.spot,
        SpotImages: updatedSpotImages,
      };
      return {
        ...state,
        singleSpot: updatedSingleSpot,
      };
    }

    case CREATE_SPOT: {
      const singleSpot = { ...action.spot };
      const newState = {
        ...state,
        singleSpot,
        allSpots: {
          ...state.allSpots,
          [action.spot.id]: { ...action.spot }
        }
      };
      return newState;
    }



    default:
      return state;
  }
};

export default spotReducer;