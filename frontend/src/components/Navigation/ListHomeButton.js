import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import CreateSpotFormModal from "../CreateSpotFormModal";
import OpenModalButton from "../OpenModalButton";

function ListHomeButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    // const ulRef = useRef();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
      };

      useEffect(() => {
        if (!showMenu) return;

        // const closeMenu = (e) => {
        //     if (!ulRef.current.contains(e.target)) {
        //       setShowMenu(false);
        //     }
        //   };

          document.addEventListener('click', closeMenu);

          return () => document.removeEventListener("click", closeMenu);
        }, [showMenu]);

        const closeMenu = () => setShowMenu(false);

// const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

return (
    <>
      <OpenModalButton
      buttonText="List Your Home"
      onButtonClick={openMenu}
      modalComponent={<CreateSpotFormModal />}
      ></OpenModalButton>
    </>
    )

}
export default ListHomeButton
