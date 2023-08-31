import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import Dummy from "../SampleUserButton/SampleUserButton";
import Person from "../Icons/userIcon";
import Burger from "../Icons/hamburger";
import { useHistory } from "react-router-dom";


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const buttonRef = useRef();
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
    // const closeMenu = (e) => {
    //   if (!ulRef.current.contains(e.target) && !buttonRef.current.contains(e.target)) {
    //     setShowMenu(false);
    //   }
    // };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
  };

  const handleTrips = (e) => {
    e.preventDefault();
    history.push('/trips')
  }

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


            <li id="mouse">Hello, {user.username}</li>
            <li id="mouse">{user.email}</li>
            <hr style={{width: '100%'}}></hr>
            <li onClick={handleTrips}>Trips</li>
            <hr style={{width: '100%'}}></hr>
            <li id="pointer" style={{justifyContent: 'center'}} onClick={logout}>Log Out</li>
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
