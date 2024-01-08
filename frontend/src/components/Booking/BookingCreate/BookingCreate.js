import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createBookingThunk, usersBookingsThunk } from '../../../store/booking'
import { getSpotThunk } from "../../../store/spot";
import NoUserPopup from "./NoUserPopup";
import './BookingCreate.css';

export default function BookingCreate() {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const spot = useSelector(state => state.spots.singleSpot);
    const userId = useSelector(state => (state.session.user ? state.session.user.id : undefined));

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [popUp, setPopUp] = useState(false);
    const [errors, setErrors] = useState({});

    const owner = spot && userId === spot.ownerId;


    useEffect(() => {
        dispatch(getSpotThunk(spotId))
    }, [dispatch, spotId])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        // ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toJSON
        const currentDates = new Date().toJSON().slice(0, 10);
        // console.log('currentDate -------', currentDates);

        if (startDate < currentDates) {
            setErrors({ startDate: "Cannot book in the past dates" });
            return;
        }

        if (endDate < startDate) {
            setErrors({ endDate: "End date should be after start dates" });
            return;
        }

        const newBooking = {
            spotId,
            startDate,
            endDate,
        };


        // console.log('startDate----------', startDate);
        // console.log('endDate----------', endDate);

        try {
            await dispatch(createBookingThunk(spot, newBooking));
            setStartDate("");
            setEndDate("");
            await dispatch(usersBookingsThunk());
            history.push('/bookings/current');
        } catch (response) {
            const data = await response.json();
            if (data && data.errors) {
                setErrors(data.errors);
                history.push(`/spots/${spot.id}`);
            }
        }

    };

    
    return (
        <div className="booking-container">
            <div className='booking-box'>
                <form onSubmit={handleSubmit}>

                    <div className="form-date">
                        <label htmlFor="start-date">Check-in</label>
                        <input
                            id="start-date"
                            type="date"
                            value={startDate}
                            onChange={e => setStartDate(e.target.value)}
                        />
                        {errors.startDate && <div className="booking-error">{errors.startDate}</div>}

                    </div>

                    <div className="form-date">
                        <label htmlFor="end-date">Check-out</label>
                        <input
                            id="end-date"
                            type="date"
                            value={endDate}
                            onChange={e => setEndDate(e.target.value)}
                        />
                        {errors.endDate && <div className="booking-error">{errors.endDate}</div>}

                    </div>


                    {!userId ? (
                        <>
                            <button
                                type="button"
                                className="reserve-button"
                                onClick={() => setPopUp(true)}
                            >
                                Reserve
                            </button>
                            {popUp && (
                                <NoUserPopup onClose={() => setPopUp(false)} />
                            )}
                        </>
                    ) : !owner ? (
                        <button
                            type="submit"
                            className="reserve-button"
                            disabled={!userId}
                        >
                            Reserve
                        </button>
                    ) : (
                        <div className="no-reserve-box">
                            <p className="no-reserve">You can't reserve your own spot</p>
                        </div>
                    )}


                </form>
            </div>
        </div>
    )
}