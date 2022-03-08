import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../../store/session';
import './ProfileButton.css';

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
            <button onClick={openMenu} className='profile-button' >
                User settings
            </button>
            {showMenu && (
                <div className="dropdown-menu">
                    <ul className="dropdown-content">
                        <li>{user.firstName}</li>
                        <li>{user.email}</li>
                        <li>
                            <button onClick={logout}>Log Out</button>
                        </li>
                    </ul>
                </div>
            )}
        </>
    );
}

export default ProfileButton;