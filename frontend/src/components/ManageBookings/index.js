import './ManageBookings.css';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import CurrentBookingsList from './CurrentBookingsList';
import { getSpots } from '../../store/spots';
import { useEffect } from 'react';
// import ManageSpotModal from '../ManageSpotModal';

const ManageBookings = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.sessionState.user);
    const spots = useSelector((state) => Object.values(state.spotsState));

    useEffect(() => {
        dispatch(getSpots())
    }, [dispatch])
    
    if (!sessionUser) return <Redirect to='/' />

    return (
        <div>
            {/* <Link to='new-listing' ><button>New Listing</button></Link> */}
            {/* <ManageSpotModal /> */}
            <CurrentBookingsList spots={spots} sessionUser={sessionUser} />
        </div>
    )
}

export default ManageBookings;