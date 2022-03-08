import './ManageSpots.css';
import * as sessionActions from '../../store/session';
import { useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import OwnedSpotList from './OwnedSpotList';

const ManageSpots = ({ spots }) => {
    const history = useHistory();
    const sessionUser = useSelector(state => state.sessionState.user);

    if (!sessionUser) return <Redirect to='/' />

    const clickHandler = (e) => {
        e.preventDefault();
        return history.push('/new-listing')
    }

    return (
        <div>
            <button onClick={clickHandler} >New Listing</button>
            <OwnedSpotList spots={spots} sessionUser={sessionUser} />
        </div>
    )
}

export default ManageSpots;