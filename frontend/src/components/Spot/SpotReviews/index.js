import './SpotReviews.css'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react'
import { getSpotReviews } from '../../../store/reviews';
import SpotReviewSummary from './SpotReviewSummary'
import ReviewCard from './ReviewCard'

const SpotReviews = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();

    const reviews = useSelector((state) => state.reviewsState);
    const reviewsArr = Object.values(reviews)

    useEffect(() => {
        dispatch(getSpotReviews(spotId))
    },[dispatch])
    return (
        <div className='review-list'>
            <SpotReviewSummary reviews={reviewsArr} />
            {reviewsArr.map(review => (
                <ReviewCard review={review} />
            ))}
        </div>
    )
}

export default SpotReviews;