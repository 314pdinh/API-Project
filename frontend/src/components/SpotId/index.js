import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotThunk, getAllSpotsThunk } from "../../store/spot";
import { useParams } from "react-router-dom";
import "./Spot.css";

const SpotId = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const oneSpot = useSelector((state) => state.spots.singleSpot);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getSpotThunk(spotId));
      await dispatch(getAllSpotsThunk());
      setIsLoaded(true);
    };

    fetchData();
  }, [dispatch, spotId]);

  return (
    isLoaded && (
      <>
        <div className="spotId-container">
          <div className="title">
            {oneSpot.name}
            <p className="spotId-location">
              {oneSpot.city}, {oneSpot.state}, {oneSpot.country}
            </p>
          </div>
          <div className="image-container">
          <img id='image-cover' src={oneSpot.SpotImages[4].url}/>
            <div className="image-grid">
              {oneSpot.SpotImages.slice(0, 4).map((image, index) => (
                <img
                  key={index}
                  className="each-image"
                  id={
                    index === 0
                      ? "top-left"
                      : index === 1
                        ? "top-right"
                        : index === 2
                          ? "bottom-left"
                          : "bottom-right"
                  }
                  src={image.url}
                  alt={`image-${index}`}
                />
              ))}
            </div>

          </div>
        </div>
        <div className="description-container">
          <div className="Host-description">
            Hosted by {oneSpot.Owner.firstName} {oneSpot.Owner.lastName}
            <p>{oneSpot.description}</p>
          </div>
          <div className="booking-description">
            <div className="pricenstar">
              <div>
                ${oneSpot.price} night
              </div>
              <div>★ {oneSpot.avgStarRating}</div>
            </div>
            <button id="reserve-button">Reserve</button>
          </div>
        </div>
      </>
    )
  );
};

export default SpotId;
