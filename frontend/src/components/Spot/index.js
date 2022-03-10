import './Spot.css';
import { useParams, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getSpots } from '../../store/spots';

import SpotTitle from './SpotTitle';
import SpotImages from './SpotImages';
import SpotBody from './SpotBody';

const Spot = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();
    const { spotId } = useParams();

    const spot = useSelector(state => state.spotsState[spotId]);
    console.log('SPOT', spot);


    useEffect(() => {
        dispatch(getSpots()).then(res => setIsLoaded(true));
    }, [dispatch]);

    if (!spot && isLoaded) return <Redirect to='/spots' />

    return (
        isLoaded && (
            <div className='spot-container'>
                <div className='spot-card' >
                    <div className='spot-background'>
                        <SpotTitle spot={spot} />
                        <SpotImages images={spot.Images} />
                        <SpotBody spot={spot} />
                    </div>
                </div>
            </div >
        )
    )
}

export default Spot;