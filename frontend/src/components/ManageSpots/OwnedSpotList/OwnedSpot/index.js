import './OwnedSpot.css';
import SpotListing from '../../../Spots/SpotsList/SpotListing';
import { useDispatch } from 'react-redux';
import { deleteSpot } from '../../../../store/spots';
import { Link } from 'react-router-dom';
import EditListingModal from '../../../ManageSpotModal/EditListingModal';

const OwnedSpot = ({ spot }) => {
    const dispatch = useDispatch();
    console.log(spot);
    const deleteHandler = () => {
        dispatch(deleteSpot(spot.id))
    }

    return (
        <div className='spot-card'>
            <div className='buttons' >
                <EditListingModal spot={spot} />
                <button onClick={deleteHandler} >Delete</button>
            </div>
            <SpotListing details={spot} />
        </div>
    )
}

export default OwnedSpot