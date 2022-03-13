import './Spots.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { getSpots } from '../../store/spots';

import SpotsList from './SpotsList';

const Spots = () => {
    const dispatch = useDispatch()

    const spots = useSelector((state) => Object.values(state.spotsState));

    useEffect(() => {
        dispatch(getSpots())
    }, [dispatch])

    return (
            <SpotsList spots={spots} />
    )
}

export default Spots;