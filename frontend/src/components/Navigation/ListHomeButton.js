import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import CreateSpotFormModal from "../CreateSpotFormModal";

function ListHomeButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
      };

      useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
              setShowMenu(false);
            }
          };

          document.addEventListener('click', closeMenu);

          return () => document.removeEventListener("click", closeMenu);
        }, [showMenu]);

        const closeMenu = () => setShowMenu(false);

const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
console.log(showMenu)
if (showMenu) {
return (
    <>
      <button onClick={openMenu}>addddddddddd
        <i className="listing-option" />
      </button>
      <ul className={ulClassName} ref={ulRef}>


        {showMenu ? (
            <>
        </>
        ) : (
            <>
            <OpenModalMenuItem
            itemText="List Home"
            onItemClick={openMenu}
            modalComponent={<CreateSpotFormModal />}
            />
        </>

        )}
      </ul>
    </>
)

}

}

export default ListHomeButton
