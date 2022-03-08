import './Spots.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { getSpots } from '../../store/spots';

import SpotsList from './SpotsList';

const Spots = () => {
    // const dispatch = useDispatch();
    // const spots = useSelector((state) => state.spotsState);
    // console.log(spots);

    // useEffect(() => {
    //     dispatch(getSpots())
    // },[dispatch])

    return (
        <SpotsList />
    )
}

export default Spots;