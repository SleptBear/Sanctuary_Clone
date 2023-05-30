import { useDispatch, useSelector } from "react-redux";
import { getAllBookingUser } from "../../store/bookings";
import { useEffect } from "react";


function UserBookings() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)
    const bookingsObj = useSelector((state) => state.bookings.userBookings)
    const bookings = Object.values(bookingsObj)

    useEffect(() => {
        if (user && user.id) {
          dispatch(getAllBookingUser());
        }
      }, [dispatch, user]);

      if (!user) {
        return <h1>Login or Create an account</h1>
      }

      if (!bookings || bookings.length === 0) {
        return <h1>You have no Trips</h1>;
      }

      console.log(bookings)

    return (
        <div className='bookings-root'>
          <h1>Trips</h1>
          <div className='User-Bookings-Container'>
            <hr style={{width: '100%'}}></hr>
            <br></br>
            {bookings.map((booking) => (
                <div className='User-Booking-Container' key={booking.id}>
                <div>Destination: {booking?.Spot.name}</div>
                <div>Location: {booking?.Spot.country}, {booking.Spot.city}</div>
                <div>Check In: {booking?.startDate.slice(0,10)}</div>
                <div>Check Out: {booking?.endDate.slice(0,10)}</div>
                {/* <img src={booking.Spot.SpotImages[0].url}></img> */}


                <br></br>
                <hr style={{width: '100%'}}></hr>

            </div>
          ))}

          </div>
        </div>
      );
}


export default UserBookings
