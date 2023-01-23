import React, { useState, useEffect} from "react";
// import { useDispatch } from 'react-redux';
// import * as sessionActions from '../store/session';
import UpdateSpotFormModal from "../UpdateSpotFormModal";
import OpenModalButton from "../OpenModalButton";


function UpdateSpotFormButton({ user }) {
    // const dispatch = useDispatch();
    // let stateSpot = useSelector(state => state.spot.spot)

    const [showMenu, setShowMenu] = useState(false);
    // const [address, setAddress] = useState('')
    // setAddress(state.spot.address)

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
      };

      useEffect(() => {
        if (!showMenu) return;

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
      }, [showMenu]);

      const closeMenu = () => setShowMenu(false);




      return (
        <>
        <div className="update-button">

          <OpenModalButton
          buttonText="Update Your Home"
          onButtonClick={openMenu}
          modalComponent={<UpdateSpotFormModal />}
          ></OpenModalButton>
          </div>
        </>
        )
}

export default UpdateSpotFormButton
