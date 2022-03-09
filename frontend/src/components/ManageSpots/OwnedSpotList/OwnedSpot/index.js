import './OwnedSpot.css';
import SpotListing from '../../../Spots/SpotsList/SpotListing';
import { useDispatch } from 'react-redux';
import { deleteSpot } from '../../../../store/spots';
import { Link } from 'react-router-dom';

const OwnedSpot = ({ spot }) => {
    const dispatch = useDispatch();

    const deleteHandler = () => {
        dispatch(deleteSpot(spot.id))
    }

    return (
        <div className='spot-card'>
            <div className='buttons' >
                <Link to='/edit-listing' state={ spot } ><button>Edit</button></Link>
                <button onClick={deleteHandler} >Delete</button>
            </div>
            <SpotListing details={spot} />
        </div>
    )
}

export default OwnedSpot