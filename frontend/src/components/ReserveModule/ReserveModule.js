import ReserveButton from "../Reservations/ReserveButton"


const ReserveModule = ({spot}) => {
    let test = spot
    console.log(spot)

    function checkIfReview() {
        if (spot.numReviews === 0) {
            return "Be the first to leave us a Review!"
        } else {
            return (Math.floor(spot.avgStarRating * 100)/100)
        }
    }


    return (

    <div className="reserve-box">
        <div className="reserve-info">
            <div className="reserve-price" style={{width:'50%'}}>${spot.price} night</div>
            <div className="rating">
                <i className="fa-solid fa-star"></i>
                <div>
                    {checkIfReview() + " · " + spot.numReviews} Review(s)
                </div>
            </div>
        </div>

        <div className="reserve-button-container">
            <ReserveButton></ReserveButton>
        </div>
    </div>
)}



export default ReserveModule
