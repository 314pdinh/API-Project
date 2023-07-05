import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpotsThunk } from "../../store/spot";
import { NavLink } from "react-router-dom";
import './Spot.css';

const Spots = () => {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots);
  const allSpots = Object.values(spots.allSpots);

  useEffect(() => {
    dispatch(getAllSpotsThunk());
  }, [dispatch]);

  return (
    <div className="spots-container">
      {allSpots.map((spot) => (
        <NavLink key={spot.id} to={`/spots/${spot.id}`}>
          <div className="spot-card">
            <img id="spot-image" src={spot.previewImage} alt="img" />

            <div className="review">
              <b>★ {spot.avgRating.toFixed(1)}</b>
            </div>
            <div className="locationPrice">

            <div className="city" >
              
              {spot.city}, {spot.state}
            
            </div>
            {/* <div className="country">{spot.country}</div> */}
            <div className="price">
              <b>${spot.price}</b>night
            </div>

            </div>
          </div>
        </NavLink>
      ))
    }
    </div>
  );
};

export default Spots;
