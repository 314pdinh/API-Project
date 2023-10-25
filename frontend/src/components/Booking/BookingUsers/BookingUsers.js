import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { usersBookingsThunk } from "../../../store/booking"
import './BookingUsers.css';
import SpotImages from '../../Spot/SpotId/SpotImages';

const BookingUsers = () => {
    const dispatch = useDispatch()
    const bookings = useSelector(state => state.bookings.user)
    const user = useSelector(state => state.session.user)
    const list = Object.values(bookings)

    const userId = user ? user.id : null;

    const bookingList = list.filter((booking) => booking.userId === userId)
    console.log("bookignLISTTTTT---", bookingList)

    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    useEffect(() => {
        dispatch(usersBookingsThunk())
    }, [dispatch])


// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (!bookingList) {
        return null
    }

    return (
        <>
            <div className="bookings-container">
                <div className="users-bookings">
                    <h1>Your Bookings</h1>
                </div>
                <ul className="bookings-list">
                    {bookingList.length > 0 && bookingList.map(booking => (
                        <div key={booking.id} className="booking-card">
                            <h3>{booking.Spot.name ? booking.Spot.name : undefined}</h3>

                            <img src={booking.Spot.previewImage} alt="Spot Preview" />

                            <div className="bookings-date">
                                <h4>Start: {formatDate(booking.startDate)}</h4>
                                <h4>End: {formatDate(booking.endDate)}</h4>
                            </div>
                        </div>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default BookingUsers;