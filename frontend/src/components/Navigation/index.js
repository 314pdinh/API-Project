// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='nav-wrap'>
      <header>
        <div className='nav'>
          <div className='airBNB'>
            <li>
              <NavLink className='TitleHeader' exact to="/">
                <i className="fa-solid"></i> 
                GlobeHut
              </NavLink>
            </li>
          </div>
          {isLoaded && sessionUser && (
            <ul>
              <div className='top'>
                <div className='profile'>
                  <li>
                    <ProfileButton user={sessionUser} />
                  </li>
                </div>
              </div>
            </ul>
          )}
          {isLoaded && !sessionUser && (
            <ul className='nav'>
              <li>
                <ProfileButton user={sessionUser} />
              </li>
            </ul>
          )}
        </div>
      </header>
    </div>
  );
}

export default Navigation;
