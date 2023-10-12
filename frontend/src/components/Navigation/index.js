// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  if (sessionUser) {
    return (
      <div className='nav-wrap'>
        <header>
          <div className='nav'>
            <div className='airBNB'>
              <li>
                <NavLink className='TitleHeader' exact to="/">
                <i class="fa-solid fa-earth-america fa-spin">
                  </i>
                    GlobeHut
                </NavLink>
              </li>
            </div>
            {isLoaded && (
              <ul>
                <div className='top'>
                  <div className="new-spot-link">
                    <NavLink to="/spots/new" style={{ textDecoration: 'none' }}>
                      AirBnB your home
                    </NavLink>
                  </div>

                  <div className='profile'>
                    <li>
                      <ProfileButton user={sessionUser} />
                    </li>
                  </div>
                </div>
              </ul>
            )}
          </div>
        </header>
      </div>
    );
  } else {
    return (
      <div className='nav-wrap'>
        <div className='nav'>
          <div className='airBNB'>
            <li>
              <NavLink className='TitleHeader' exact to="/">
                <i class="fa-solid fa-earth-americas">
                </i>
                  GlobeHut
              </NavLink>
            </li>
          </div>
          {isLoaded && (
            <li>
              <ProfileButton user={sessionUser} />
            </li>
          )}
        </div>
      </div>
    );
  }
}
export default Navigation;
