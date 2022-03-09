import './Spot.css';
import { useParams, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getSpots } from '../../store/spots';

import SpotTitle from './SpotTitle';
import SpotImages from './SpotImages';
import SpotBody from './SpotBody';

const Spot = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();

    const spot = useSelector(state => state.spotsState[spotId]);


    useEffect(() => {
        dispatch(getSpots());
    },[dispatch]);
    
    if (!spot) return <Redirect to='/spots' />

    return (
        <div>
            <SpotTitle spot={spot} />
            <SpotImages images={spot.Images} />
            <SpotBody spot={spot} />
        </div>
    )
}

export default Spot;