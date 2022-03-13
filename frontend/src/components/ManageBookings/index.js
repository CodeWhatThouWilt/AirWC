import './ManageBookings.css';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import CurrentBookings from './CurrentBookingsList';
import { getSpots } from '../../store/spots';
import { getAllBookings } from '../../store/bookings';
import { useEffect } from 'react';
// import ManageSpotModal from '../ManageSpotModal';

const ManageBookings = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.sessionState.user);
    const spots = useSelector((state) => state.spotsState);
    const userBookings = useSelector(state => state.bookingsState.userBookings)

    useEffect(() => {
        dispatch(getAllBookings())
        dispatch(getSpots())
    }, [dispatch])
    
    if (!sessionUser) return <Redirect to='/' />

    return (
        <div>
            <CurrentBookings spots={spots} userBookings={userBookings} sessionUser={sessionUser} />
        </div>
    )
}

export default ManageBookings;