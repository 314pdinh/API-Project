import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory();

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
    history.push('/')

  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>

      <button onClick={openMenu} id='profile-button'>
        <i className="fa-solid fa-bars"></i>
        <i className="fas fa-user-circle" />
      </button>

      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <p>Hello, {user.firstName}</p>
            <p>{user.email}</p>

            <div style={{ borderTop: "2px solid #000000", marginTop: 10, marginBottom: 3, marginLeft: 6, marginRight: 6 }}></div>
            <li>

              <NavLink to='/spots/current' style={{ textDecoration: 'none' }}>
                Manage Spot
              </NavLink>
            </li>

            <div style={{ borderTop: "2px solid #000000", marginTop: 10, marginBottom: 3, marginLeft: 6, marginRight: 6 }}></div>

            <li>

              <NavLink to='/reviews/current' style={{ textDecoration: 'none' }}>
                Manage Reviews
              </NavLink>
            </li>

            <div style={{ borderTop: "2px solid #000000", marginTop: 10, marginBottom: 3, marginLeft: 6, marginRight: 6 }}></div>

            <li>

              <NavLink to='/bookings/current' style={{ textDecoration: 'none' }}>
                Manage Bookings
              </NavLink>
            </li>

            <div style={{ borderTop: "2px solid #000000", marginTop: 10, marginBottom: 3, marginLeft: 6, marginRight: 6 }}></div>

            <p>

            </p>
            <button onClick={logout}>Log Out</button>
          </>
        ) : (
          <>
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;