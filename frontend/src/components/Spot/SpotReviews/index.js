import './SpotReviews.css'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getSpotReviews } from '../../../store/spots';
import SpotReviewSummary from './SpotReviewSummary';
import ReviewCard from './ReviewCard';

const SpotReviews = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const spot = useSelector((state) => state.spotsState);
    
    let reviewsArr;
    if (isLoaded) {
        reviewsArr = Object.values(spot[spotId].Reviews);
    };

    useEffect(() => {
        dispatch(getSpotReviews(spotId))
            .then(() => setIsLoaded(true));
    }, [dispatch, isLoaded, spotId]);

    return (
        <div className='review-list'>
            {isLoaded &&
                <>
                    <SpotReviewSummary reviews={reviewsArr} />
                    {reviewsArr.map(review => (
                        <ReviewCard review={review} />
                    ))}
                </>
            }
        </div>
    )
}

export default SpotReviews;