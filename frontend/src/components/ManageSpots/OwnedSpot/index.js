import './OwnedSpot.css';
import SpotListing from '../../Spots/SpotListing';
import { useDispatch } from 'react-redux';
import { deleteSpot } from '../../../store/spots';
import EditListingModal from '../../ManageSpotModal/EditListingModal';
import EditImagesModal from '../../ManageSpotModal/EditImagesModal';

const OwnedSpot = ({ spot }) => {
    const dispatch = useDispatch();

    const deleteHandler = () => {
        dispatch(deleteSpot(spot.id))
    }

    return (
        <div style={{ position: 'relative'}}>
            <div className='buttons' >
                <EditImagesModal spot={spot} />
                <EditListingModal spot={spot} />
                <button onClick={deleteHandler} >Delete</button>
            </div>
            <SpotListing details={spot} />
        </div>
    )
}

export default OwnedSpot