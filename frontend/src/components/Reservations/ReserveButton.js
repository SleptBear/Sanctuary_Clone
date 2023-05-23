import './reservation.css'

const ReserveButton = () => {

    const placeHolder = async (e) => {
        e.preventDefault();
        window.alert("Feature Coming Soon...")

    }

    return (
        <div
        // style={{display: 'flex', alignContent: 'center'}}
        className="reserve-button" id='not-allowed'>
        <button
        // style={{width: '80%',height: '80%', display: 'flex', justifyContent: 'center',}}

        onClick={placeHolder}>
            Reserve</button>
        </div>
    )
}



export default ReserveButton;
