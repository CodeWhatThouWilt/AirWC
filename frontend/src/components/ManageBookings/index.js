import './ManageBookings.css';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import CurrentBookings from './CurrentBookingsList';
import { getSpots } from '../../store/spots'
import { getAllBookings } from '../../store/bookings';
import { useEffect, useState } from 'react';
// import ManageSpotModal from '../ManageSpotModal';

const ManageBookings = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.sessionState.user);
    const spots = useSelector((state) => state.spotsState);
    const userBookings = useSelector(state => state.bookingsState.userBookings)
    const allBookings = useSelector(state => state.bookingsState)

    const [isLoaded, setIsLoaded] = useState(false)

    // useEffect(() => {
    //     dispatch(getAllBookings())
    //         .then(() => dispatch(getSpots()))
    //         .then(() => setIsLoaded(true))
    // }, [dispatch]);
    useEffect(() => {
        dispatch(getAllBookings());
        dispatch(getSpots());
    },[dispatch])
    
    if (!sessionUser) return <Redirect to='/' />

    return (
        <div>
            {/* {isLoaded && <CurrentBookings spots={spots} userBookings={userBookings} sessionUser={sessionUser} />} */}
            <CurrentBookings spots={spots} userBookings={userBookings} sessionUser={sessionUser} />
        </div>
    )
}

export default ManageBookings;