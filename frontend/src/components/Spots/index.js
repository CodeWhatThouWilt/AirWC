import './Spots.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { getSpots } from '../../store/spots';

import SpotsList from './SpotsList';

const Spots = ({ spots }) => {

    return (
        <SpotsList spots={spots} />
    )
}

export default Spots;