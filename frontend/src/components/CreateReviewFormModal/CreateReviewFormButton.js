import React, { useState, useEffect, useRef} from "react";
import { useSelector } from 'react-redux'
// import { useDispatch } from 'react-redux';
// import * as sessionActions from '../store/session';
import CreateReviewFormModal from ".";
import OpenModalButton from "../OpenModalButton"

function CreateReviewFormButton({ user }) {
    // const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user)
    const stateSpot = useSelector(state => state.spot.spot)
    const reviewsState = useSelector(state => state.reviews)
    const ulRef = useRef();
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

      // console.log("review state", reviewsState)
      let spotArray = Object.keys(reviewsState?.spot)
      let userArray = Object.keys(reviewsState?.user)
      // console.log(spotArray)
      // console.log(userArray)

      let compareArrays = (a, b) => {
        let boolean = false;
        a.forEach(index => {
          // console.log(index)
          if (b.includes(index)) {
            // console.log('yes')
            boolean = true
          }
          })
          return boolean
      }

      // console.log("truthy?", compareArrays(spotArray, userArray))


      let ulClassName = "create-review-button" + (currentUser?.id !== stateSpot?.ownerId ? "" : " hidden");
      ulClassName = "create-review-button" + (!compareArrays(spotArray, userArray) && currentUser?.id ? "" : " hidden");
      // console.log(reviewsState.hasOwn('spot'))
      // console.log(Object.entries(reviewsState))
      // let test = (Object.entries(reviewsState))
      // console.log("TES", test)

      return (
        <div className={ulClassName} ref={ulRef}>
          <OpenModalButton
          buttonText="Leave a Review"
          onButtonClick={openMenu}
          modalComponent={<CreateReviewFormModal />}
          ></OpenModalButton>
        </div>
        )
}

export default CreateReviewFormButton
