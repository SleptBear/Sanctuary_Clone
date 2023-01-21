import React, { useState, useEffect} from "react";
// import { useDispatch } from 'react-redux';
// import * as sessionActions from '../store/session';
import CreateReviewFormModal from ".";
import OpenModalButton from "../OpenModalButton"

function CreateReviewFormButton({ user }) {
    // const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

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
          <OpenModalButton
          buttonText="Create a Review"
          onButtonClick={openMenu}
          modalComponent={<CreateReviewFormModal />}
          ></OpenModalButton>
        </>
        )
}

export default CreateReviewFormButton
