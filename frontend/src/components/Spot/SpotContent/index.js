import './SpotContent.css';
import SpotReviews from '../SpotReviews';

const SpotContent = ({ spot }) => {

    return (
        <div className='spot-content'>
            <div>
                <h2>{spot.shortDescription}</h2>
            </div>
            <div>
                <span>{`${spot.selfCheckIn}`}</span>
            </div>
            <div>
                <p>{spot.longDescription}</p>
            </div>
            <SpotReviews />
        </div>
    )
}

export default SpotContent;