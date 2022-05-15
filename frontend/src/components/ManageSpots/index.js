import './ManageSpots.css';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import OwnedSpotList from './OwnedSpotList';
import { getSpots } from '../../store/spots';
import { useEffect } from 'react';
import ManageSpotModal from '../ManageSpotModal';

const ManageSpots = () => {
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
            <div className='manage-spot-create-btn-ctn'>
                <ManageSpotModal />
            </div>
            <OwnedSpotList spots={spots} sessionUser={sessionUser} />
        </div>
    )
}

export default ManageSpots;