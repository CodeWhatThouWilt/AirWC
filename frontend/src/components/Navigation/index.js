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
        <div className='navbar-container' >
            <nav>
                <Link to="/" className='logo-link' ><img src={logo} className='logo' alt='logo' /></Link>
                <div className='search-bar-div'>
                    <div className='search-bar-icon'>
                        <i class="fa-solid fa-magnifying-glass-location"></i>
                    </div>
                        <input type="text" className='search-bar-input' ></input>
                </div>
                {isLoaded && sessionLinks}
            </nav>
        </div>
    );
}

export default Navigation;