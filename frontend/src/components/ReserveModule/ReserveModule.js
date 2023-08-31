import ReserveButton from "../Reservations/ReserveButton"
import Bookings from "../Bookings"


const ReserveModule = ({spot}) => {

    function checkIfReview() {
        if (spot.numReviews === 0) {
            return ''
        } else {
            return (Math.floor(spot.avgStarRating * 100)/100)
        }
    }

    function checkPrice() {
        let price = spot.price
        price = price.toLocaleString()
        // console.log(price)
        return price
    }

    return (

    <div className="reserve-box">
        {/* <div className="reserve-info"> */}
            <div className="reserve-price">$
                <div >
                {checkPrice()}
                </div>
                <div id="post-price">
                night
                </div>
                </div>
            {/* <div className="rating">
                <i className="fa-solid fa-star"></i>
                <div>
                    {checkIfReview() + " · " + spot.numReviews} Review(s)
                </div>
            </div> */}
        {/* </div> */}

        <div className="reserve-button-container">
            {/* <ReserveButton></ReserveButton> */}
            <Bookings/>
        </div>
    </div>
)}



export default ReserveModule
