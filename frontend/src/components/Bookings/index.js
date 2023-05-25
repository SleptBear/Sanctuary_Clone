import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as bookingThunks from "../../store/bookings"
import Calendar from "react-calendar";
import ReserveButton from "../Reservations/ReserveButton"
import "./bookings.css";
import 'react-calendar/dist/Calendar.css';


const Bookings = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const bookingDetail = useSelector((state) => state.bookings.allBookings);
  const bookingsArr = Object.values(bookingDetail);
  const user = useSelector((state) => state.session.user);
  const spotDetail = useSelector((state) => state.spot.spot);
  const spotId = spotDetail.id
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    dispatch(bookingThunks.getAllBookings(spotId));
  }, [dispatch, spotId]);

  const [selectedRange, setSelectedRange] = useState([null, null]);

  const onRangeChange = (range) => {
    setSelectedRange(range);
  };

  const handleCreateBooking = () => {
    const startDate = selectedRange[0]
    const endDate = selectedRange[1]
    const userId = user.id

    if (!startDate || !endDate) {
      return;
    }

    const conflicts = (startDate, endDate, bookingsArr) => {
      for (const { startDate: bookingStart, endDate: bookingEnd } of bookingsArr) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const bookingStartObj = new Date(bookingStart);
        const bookingEndObj = new Date(bookingEnd);
        if (hasOverlappingDates(start, end, bookingStartObj, bookingEndObj)) {
          return true;
        }
      }
      return false;
    };

    const hasOverlappingDates = (startDate, endDate, bookingStart, bookingEnd) => {
      return (
        (startDate >= bookingStart && startDate < bookingEnd) ||
        (endDate > bookingStart && endDate <= bookingEnd) ||
        (startDate <= bookingStart && endDate >= bookingEnd)
      );
    };

    if (userId == spotDetail.ownerId) {
      alert("You cannot create a booking for a spot that belongs to you");
      return
    } else if (endDate <= startDate) {
      alert("End Date must be after start date")
      return
    } else if (conflicts(startDate, endDate, bookingsArr)) {
      alert("The selected dates conflict with an existing booking");
      return;
    }
    else {
      alert("Booking has been created, check my bookings page")
    }

    dispatch(bookingThunks.addBookings({ spotId, startDate, endDate, userId }));
    setSelectedRange([null, null]);
  }
  if (!bookingDetail) {
    return null
}

  // if (!user) {
  //   return (
  //     <div>
  //       <h1>Sign in to see your bookings</h1>
  //     </div>
  //   )
  // }

  if (!user) {
    return <ReserveButton/>
  }

  return (
    <div className="reserve-button">
      <button className='show-calendar' onClick={() => setShowCalendar(!showCalendar)}>
        {showCalendar ? "Hide Calendar" : " Show Calendar"}
      </button>
      {showCalendar ? (
        user.id === spotDetail.userId ? (
          <>
            <h2>Bookings for your spot</h2>
            <ul className="booking-mapped">
              {bookingsArr
              .filter(booking => booking.spotId === id)
              .map(({id, spotId, userId, startDate, endDate, firstName, lastName}) => (
                  <li key={id}>
                    <p>
                      User: {firstName} {lastName}
                    </p>
                    <p>Start Date: {startDate}</p>
                    <p>End Date: {endDate}</p>
                  </li>
                )
              )}
            </ul>
          </>
        ) : (
          <>
            <p className="date-calendar-range">Selected range: {selectedRange[0] ? selectedRange[0].toLocaleDateString() : 'None'} to {selectedRange[1] ? selectedRange[1].toLocaleDateString() : 'None'}</p>
            <div className="calendar-container">
              <Calendar
                onChange={onRangeChange}
                value={selectedRange}
                selectRange={true}
                className="calendar"
                />
            </div>
            <button onClick={handleCreateBooking} className="create-booking-button">Create Booking</button>
          </>
        )
      ) : null}
    </div>
  );
}

export default Bookings;
