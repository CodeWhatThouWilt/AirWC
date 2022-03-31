import './SpotReviewSummary.css'


const SpotReviewSummary = ({ reviews }) => {

    // ratings = reviews.map(review => review.rating)


    return (
        <div className='reviews-overview'>
            <span></span>
            <div className='review-stats'>
                <span>Cleanliness</span>
            </div>
            <div className='review-stats'>
                <span>Communication</span>
            </div>
            <div className='review-stats'>
                <span>Check-in</span>
            </div>
            <div className='review-stats'>
                <span>Accuracy</span>
            </div>
            <div className='review-stats'>
                <span>Location</span>
            </div>
            <div className='review-stats'>
                <span>Value</span>
            </div>

        </div>
    )
}

export default SpotReviewSummary;