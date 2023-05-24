import './reservation.css'
import { useState } from 'react';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';

const ReserveButton = () => {
    const [showMenu, setShowMenu] = useState(false);
    const closeMenu = () => setShowMenu(false);

    const placeHolder = async (e) => {
        e.preventDefault();
        window.alert("Feature Coming Soon...")

    }

    return (
        <div
        // style={{display: 'flex', alignContent: 'center'}}
        className="reserve-button">
            <button>

        <OpenModalMenuItem
              itemText="Log In to Reserve"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
              />
              </button>
        </div>
    )
}



export default ReserveButton;
