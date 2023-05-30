import { useDispatch } from "react-redux";
import { useState } from "react";
import { deleteBooking, getAllBookingUser } from "../../store/bookings";

const DeleteBookingButton = (prop) => {

    // console.log("PROP", prop)

    //   const { spotId } = useParams();
      const dispatch = useDispatch();
      const [errors, setErrors] = useState([])



    const removeIndex = async (e) => {
        e.preventDefault();
        dispatch(deleteBooking(prop.booking.id))
        .then(async(res) => {
          dispatch(getAllBookingUser())
        })
        .catch(async (res) => {
          const data = await res
          console.log("Checking data returning to form", data)
          if (data && data.errors) setErrors(data.errors)
          console.log("ERRORS", errors)
        });
    }

    //   if (!prop.user?.id || prop.user?.id !== prop.review?.userId) return null
      return (
          <div className="delete-booking-button">
          <button
          onClick={removeIndex}><i className="fa-solid fa-trash-can"></i></button>
          </div>
      )
  }

  export default DeleteBookingButton
