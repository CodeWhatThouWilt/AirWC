import './Spot.css';
import { useParams, Redirect } from 'react-router-dom';
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
    
    if (!spotDetails) return <Redirect to='/spots' />

    return (
        <div>
            {spotDetails.name}
            <img src={spotDetails.Images[0] ? spotDetails.Images[0].url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7pqzMM1bTqxAEkWQ3YHT4pdXByPaZQRYzmA&usqp=CAU'} alt='spot pic' />
        </div>
    )
}

export default Spot;