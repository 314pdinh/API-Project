import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpotsThunk } from "../../store/spot";
import { NavLink } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";

const manageSpot = () => {
    const dispatch = useDispatch();
    const spots = useSelector((state) => state.spots);
    const user = useSelector((state) => state.session.user);
    const allSpots = Object.values(spots.allSpots);

    useEffect(() => {
        dispatch(getAllSpotsThunk());
    }, [dispatch]);

    const usersSpot = allSpots.filter(spot => {
        return (user.id === spot.ownerId)
    })

    return (
        <div className="spots-container">
            <h2>Manage Your Spots</h2>
            <div id='manage-create-a-newSpot'>
                <NavLink to="/spots/new" style={{ textDecoration: 'none' }}>
                    Create a New Spot
                </NavLink>
            </div>

            <div className="spot-columns">
                {usersSpot.map(spot => (
                    <div key={spot.id}>
                        <>
                            <NavLink key={spot.id} to={`/spots/${spot.id}`}>
                                <div className="each-spot">
                                    <img id="spot-image" src={spot.previewImage} alt="img" />
                                    <div className="review">
                                        <b>★ {spot.avgRating.toFixed(1)}</b>
                                    </div>
                                    <div className="city">{spot.city}, {spot.state}</div>
                                    <div className="country">{spot.country}</div>
                                    <div className="price">
                                        <b>${spot.price}</b> night
                                    </div>
                                </div>
                            </NavLink>

                                                        
                            <div className="Update-Delete">
                                <NavLink style={{ textDecoration: "none" }} to={`/spots/${spot.id}/`} id="update-Button">
                                    Update
                                </NavLink>

                                <OpenModalButton
                                    buttonText='Delete'
                                />
                            </div>
                        </>
                    </div>
                ))}
            </div>



        </div>
    );
};

export default manageSpot;
