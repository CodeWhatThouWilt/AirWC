import './Spot.css';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getSpots } from '../../store/spots';

const Spot = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spotDetails = useSelector(state => state.spotsState[spotId]);

    useEffect(() => {
        dispatch(getSpots());
    },[dispatch]);

    return (
        <div>
            {spotDetails.name}
            <img src={spotDetails.Images[0].url} alt={spotDetails.Images.length} />
        </div>
    )
}

export default Spot;