import './Homepage.css';
import Banner from './Banner';
import SpotSlideShow from './SpotSlideShow';
import { useSelector, useDispatch } from 'react-redux';
import { getSpots } from '../../store/spots';
import { useEffect } from 'react';

const Homepage = () => {
    const dispatch = useDispatch();
    const spots = useSelector((state) => state.spotsState);

    useEffect(() => {
        dispatch(getSpots())
    }, [dispatch])

    return (
        <div className='homepage-container'>
            <Banner />
            {/* <SpotSlideShow spots={spots} /> */}
        </div>
        
    )
}

export default Homepage;