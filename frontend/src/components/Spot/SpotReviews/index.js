import './SpotReviews.css'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getSpotReviews } from '../../../store/spots';
import SpotReviewSummary from './SpotReviewSummary';
import ReviewCard from './ReviewCard';
import UserReview from './UserReview';

const SpotReviews = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const spot = useSelector((state) => state.spotsState);

    let reviewsArr;
    if (isLoaded) {
        reviewsArr = Object.values(spot[spotId].Reviews);
    };

    const hasBooked = spot[spotId].hasBooked;

    useEffect(() => {
        dispatch(getSpotReviews(spotId))
            .then(() => setIsLoaded(true));
    }, [dispatch, spotId]);

    return (
        <div className='review-ctn'>
            {isLoaded &&
                <>
                    {reviewsArr.length > 0 &&
                        <>
                            <SpotReviewSummary reviews={reviewsArr} />
                            {hasBooked &&
                                <UserReview reviews={reviewsArr}/>
                            }
                            <div className='review-list'>
                                {reviewsArr.map(review => (
                                    <ReviewCard key={review.id} review={review} />
                                ))}
                            </div>
                        </>
                    }
                    {reviewsArr.length < 1 &&
                        <>
                            {hasBooked &&
                                <UserReview reviews={reviewsArr}/>
                            }
                            <div className='reviews-empty'>
                                This spot hasn't received any reviews
                            </div>
                        </>
                    }
                </>
            }
        </div>
    )
}

export default SpotReviews;