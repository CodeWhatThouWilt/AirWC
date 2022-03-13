import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../../store/session';
import './ProfileButton.css';
import { NavLink } from "react-router-dom";

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    return (
        <>
            <button onClick={openMenu} className='login-button' >
                <div className='user-dropdown-icons'>
                    <i className="fa-solid fa-restroom"></i>
                    <i className="fa-solid fa-poop"></i>
                </div>
            </button>
            {showMenu && (
                <div className="dropdown-menu">
                    <ul className="dropdown-content">
                        <li style={{ textDecoration: 'underline' }}>Hey {user.firstName}!</li>
                        {/* <li>{user.email}</li> */}
                        <li><NavLink to='/spots'>View listings</NavLink></li>
                        <li><NavLink to='/manage-spots'>My spots</NavLink></li>
                        <li><NavLink to='/manage-bookings'>Bookings</NavLink></li>
                        <li>
                            <button className='home-list-button logout-button' onClick={logout}>Log Out</button>
                        </li>
                    </ul>
                </div>
            )}
        </>
    );
}

export default ProfileButton;