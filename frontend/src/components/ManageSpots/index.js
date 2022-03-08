import './ManageSpots.css';
import * as sessionActions from '../../store/session';
import { useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';

const ManageSpots = () => {
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
        </div>
    )
}

export default ManageSpots;