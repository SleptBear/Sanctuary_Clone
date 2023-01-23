import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import ListHomeButton from './ListHomeButton';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
          <body>
    <nav className='navbar'>

      <div className='logo'>
      <NavLink exact to="/">Home</NavLink>
      </div>
      {/* <div> */}
      {/* <img src={spot.previewImage} alt='NOT FOUND'></img> */}
      {/* </div> */}

    <div className='nav-modals'>
      <div>
        {/* <li className='logo'>
          <NavLink exact to="/">Home</NavLink></li> */}
        {isLoaded && (
          <div><ProfileButton user={sessionUser} /></div>
          )}
        <div><ListHomeButton user={sessionUser} /></div>
      </div>
    </div>
          </nav>
      </body>
  );
}

export default Navigation;
