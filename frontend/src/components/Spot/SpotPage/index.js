import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpotsThunk } from "../../../store/spot";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import './Spots.css';

const Spots = () => {
  const dispatch = useDispatch();
  const allSpots = useSelector(state => Object.values(state.spots.allSpots));
  const spotVal = Object.values(allSpots);



  useEffect(() => {
    dispatch(getAllSpotsThunk());
  }, [dispatch]);


  if (allSpots.length === 0) {
    return null;
  }

  return (

    <main className='spots-tile'>
      <ul>
        {spotVal.length > 0 &&
          spotVal.map(spot => (
            <div key={spot.id} className='spot' title={spot.name}>
              <Link to={`/spots/${spot.id}`}>
                <div className='image'>
                  <img src={spot.previewImage} alt='home' />
                </div>
                <div className='list'>
                  <div className='star'>
                    <p>{spot.city}, {spot.state}</p>
                    {!spot.avgRating && <li>★ New</li>}
                    {spot.avgRating && <li>★ {spot.avgRating.toFixed(1)}</li>}
                  </div>
                  <p>
                    <b>${spot.price}</b> night
                  </p>
                </div>
              </Link>
            </div>
          ))}
      </ul>
    </main>
  );
};

export default Spots;