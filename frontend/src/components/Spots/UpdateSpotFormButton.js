import React, { useState, useEffect} from "react";
import { useSelector } from 'react-redux';
import { useRef } from "react";
// import * as sessionActions from '../store/session';
import UpdateSpotFormModal from "../UpdateSpotFormModal";
import OpenModalButton from "../OpenModalButton";


function UpdateSpotFormButton({ user }) {
    // const dispatch = useDispatch();
    let currentUser = useSelector(state => state.session.user)
    let stateSpot = useSelector(state => state.spot.spot)
    const ulRef = useRef();

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

      const ulClassName = "update-button" + (currentUser?.id === stateSpot?.ownerId ? "" : " hidden");

      // if (currentUser.id !== stateSpot.ownerId) return null
      return (
        <>
        <div className={ulClassName} ref={ulRef}>

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
