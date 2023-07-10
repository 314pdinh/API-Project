import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpotsThunk, getCurrentUserSpot } from "../../store/spot";
import { NavLink, useHistory, Link } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteSpot from "../SpotDelete";

import './manageSpot.css';

const ManageSpot = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const spotObj = useSelector(state => state.spots.allSpots);
    const user = useSelector(state => state.session.user);

    const spotList = useSelector(state => Object.values(state.spots.allSpots));
    const [menu, setMenu] = useState(false);

    const newList = spotList.filter(spot => spot.ownerId === user.id);

    useEffect(() => {
        dispatch(getCurrentUserSpot());
    }, [dispatch]);

    useEffect(() => {
        if (!menu) return;

        const exitMenu = (e) => {
            if (!e.target.closest('.menu')) {
                setMenu(false);
            }
        }

        document.addEventListener("click", exitMenu);

        return () => document.removeEventListener("click", exitMenu);
    }, [menu]);

    const exitMenu = () => setMenu(false);



    const create = () => {
        history.push('/spots/new');
    };

    // if (!newList) {
    //     return null;
    // }

    return (
        <main>
            <div className="manage">
                <h1>Manage Your Spots</h1>
                <button onClick={create}>
                    Create a New Spot
                </button>
            </div>
            <ul>
                {newList.length > 0 && newList.map(spot => (
                    <div key={spot.id} className="spot">
                        <Link to={`/spots/${spot.id}`}>
                            <div className="image">
                                <img src={spot.previewImage} alt='house' />
                            </div>
                            <div className='list'>
                                <div className='star'>
                                    <li>{spot.city}, {spot.state}</li>
                                    <li>★ {spot.avgRating.toFixed((1))}</li>
                                </div>
                                <li>${spot.price} night</li>
                            </div>
                        </Link>

                        <div className="buttons-del-update">
                            <button onClick={() => history.push(`/spots/${spot.id}/edit`)}>
                                Update
                            </button>


                            <OpenModalMenuItem
                                buttonText="Delete"
                                onItemClick={exitMenu}
                                modalComponent={<DeleteSpot spot={spot} />}
                            />
                            


                        </div>
                    </div>
                ))}
            </ul>
        </main>
    );
}

export default ManageSpot;