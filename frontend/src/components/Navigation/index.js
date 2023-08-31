import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import ListHomeButton from './ListHomeButton';
import Logo from '../Icons/logo';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
          <div className='navStart'>
    <nav className='navbar'>

      <div className='logo'>
        <NavLink exact to="/">
          <Logo/>
        </NavLink>
      </div>

    <div className='nav-modals'>
      <div>
        <div><ListHomeButton user={sessionUser} /></div>
      </div>
      <div>
        {isLoaded && (
          <div><ProfileButton user={sessionUser} /></div>
          )}
      </div>
    </div>
          </nav>

      </div>
  );
}

export default Navigation;
