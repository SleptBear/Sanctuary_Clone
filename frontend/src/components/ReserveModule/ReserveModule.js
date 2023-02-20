import ReserveButton from "../Reservations/ReserveButton"


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
        <div className="reserve-info">
            <div className="reserve-price" style={{width:'50%'}}>${checkPrice()} night</div>
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
