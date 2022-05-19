import './FavoritesPage.css';
import SpotListing from '../Spots/SpotListing';
import { useSelector, useDispatch } from 'react-redux';
import { getSpots } from '../../store/spots';
import { useEffect, useState } from 'react';

const FavoritesPage = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.favoritesState);
    const spots = useSelector(state => state.spotsState);
    const spotsArr = Object.values(favorites).map(fav => spots[fav.spotId]);
    
    useEffect(() => {
        dispatch(getSpots())
        .then(() => setIsLoaded(true))
    },[dispatch]);

    return (
        <div className='fav-pg-ctn'>
            {isLoaded && spotsArr.map(spot => (
                <SpotListing details={spot} />
            ))}
        </div>
    );
};

export default FavoritesPage;