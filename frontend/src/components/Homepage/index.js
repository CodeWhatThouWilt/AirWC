import './Homepage.css';
import Banner from './Banner';
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
        <Banner />
    )
}

export default Homepage;