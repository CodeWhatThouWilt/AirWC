import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import UserModal from '../UserModal';
import logo from '../../assets/airwc-logo.svg';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.sessionState.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <div className='user-dropdown'>
                <ProfileButton user={sessionUser} />
            </div>
        );
    } else {
        sessionLinks = (
            <>
                <UserModal />
            </>
        );
    }

    return (
        <nav>
            <Link to="/" className='logo-link' ><img src={logo} className='logo' alt='logo' /></Link>
            {isLoaded && sessionLinks}
        </nav>
    );
}

export default Navigation;