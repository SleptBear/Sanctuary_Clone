import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import ListHomeButton from './ListHomeButton';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <section className='nav-container'>

    <ul>
      <div className='logo'>
        <NavLink exact to="/">Home</NavLink>
      </div>
      {isLoaded && (
        <div className='prof-button'>
          <ProfileButton user={sessionUser} />
        </div>
      )}
      <div className='listing-option'>
        <ListHomeButton user={sessionUser} />
      </div>
    </ul>
      </section>
  );
}

export default Navigation;
