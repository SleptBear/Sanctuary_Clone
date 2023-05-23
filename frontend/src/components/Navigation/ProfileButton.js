import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import Dummy from "../SampleUserButton/SampleUserButton";
import Person from "../Icons/mainIcon";
import Burger from "../Icons/hamburger";
// import Logo from "../Icon.js/logo";
// import { useModal } from "../../context/Modal";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  // const { closeModal } = useModal();

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

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
    <div className="user-menu">

      <button onClick={openMenu}>
        <Burger/>
        <Person/>
      </button>

      <ul className={ulClassName} ref={ulRef} style={{width: '100%'}}>
        {user ? (
          <>


            <li>Hello, {user.username}</li>
            <li>{user.email}</li>
            <hr style={{width: '100%'}}></hr>
            <li id="pointer" style={{justifyContent: 'center'}} onClick={logout}>Log Out

            </li>
          </>
        ) : (
          <>
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
              />
              <br></br>
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
              />


          </>

)}
      </ul>


        </div>
    </>
  );
}

export default ProfileButton;
