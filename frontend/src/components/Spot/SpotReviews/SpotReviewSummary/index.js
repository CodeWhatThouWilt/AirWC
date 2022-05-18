import './SpotReviewSummary.css'


const SpotReviewSummary = ({ reviews }) => {
    let cleanSum = 0;
    let commSum = 0;
    let checkSum = 0;
    let accuracySum = 0;
    let locationSum = 0;
    let valueSum = 0;

    reviews.forEach(review => {
        cleanSum += review.cleanliness;
        commSum += review.communication;
        checkSum += review.checkin;
        accuracySum += review.accuracy;
        locationSum += review.location;
        valueSum += review.value;
    });

    const cleanAvg = cleanSum / reviews.length;
    const commAvg = commSum / reviews.length;
    const checkAvg = checkSum / reviews.length;
    const accuracyAvg = accuracySum / reviews.length;
    const locationAvg = locationSum / reviews.length;
    const valueAvg = valueSum / reviews.length;

    const barStyling = (sectionAvg) => {
        if (sectionAvg === 5) {
            return { borderRadius: '500px', width: '100%' }
        } else {
            return { width: `${sectionAvg.toFixed(1) * 20}px` }
        };
    };

    return (
        <div className='reviews-overview'>
            <span></span>
            <div className='review-avg-section'>
                <div className='review-stats'>
                    <span>Cleanliness</span>
                    <div className='review-stats-sub-ctn'>
                        <div className='review-bar-ctn'>
                            <div className='review-bar' style={barStyling(cleanAvg)}></div>
                        </div>
                        <span>{cleanAvg.toFixed(1)}</span>
                    </div>
                </div>
                <div className='review-stats'>
                    <span>Communication</span>
                    <div className='review-stats-sub-ctn'>
                        <div className='review-bar-ctn'>
                            <div className='review-bar' style={barStyling(commAvg)}></div>
                        </div>
                        <span>{commAvg.toFixed(1)}</span>
                    </div>
                </div>
                <div className='review-stats'>
                    <span>Check-in</span>
                    <div className='review-stats-sub-ctn'>
                        <div className='review-bar-ctn'>
                            <div className='review-bar' style={barStyling(checkAvg)}></div>
                        </div>
                        <span>{checkAvg.toFixed(1)}</span>
                    </div>
                </div>
            </div>
            <div className='review-avg-section'>
                <div className='review-stats'>
                    <span>Accuracy</span>
                    <div className='review-stats-sub-ctn'>
                        <div className='review-bar-ctn'>
                            <div className='review-bar' style={barStyling(accuracyAvg)}></div>
                        </div>
                        <span>{accuracyAvg.toFixed(1)}</span>
                    </div>
                </div>
                <div className='review-stats'>
                    <span>Location</span>
                    <div className='review-stats-sub-ctn'>
                        <div className='review-bar-ctn'>
                            <div className='review-bar' style={barStyling(locationAvg)}></div>
                        </div>
                        <span>{locationAvg.toFixed(1)}</span>
                    </div>
                </div>
                <div className='review-stats'>
                    <span>Value</span>
                    <div className='review-stats-sub-ctn'>
                        <div className='review-bar-ctn'>
                            <div className='review-bar' style={barStyling(valueAvg)}></div>
                        </div>
                        <span>{valueAvg.toFixed(1)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SpotReviewSummary;