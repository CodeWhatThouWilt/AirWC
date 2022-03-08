import './SpotsList.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { getSpots } from '../../../store/spots';

import SpotListing from './SpotListing';

const SpotsList = () => {
    const dispatch = useDispatch();
    const spots = useSelector((state) => Object.values(state.spotsState));
    console.log(spots);

    useEffect(() => {
        dispatch(getSpots())
    }, [dispatch])

    return (
        <div>
            {spots.map(spot => (
                <SpotListing key={spot.id} details={spot} />
            ))}
        </div>
    )
}

export default SpotsList;