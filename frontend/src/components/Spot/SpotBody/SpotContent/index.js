import './SpotContent.css';
import SpotReviews from './SpotReviews';

const SpotContent = ({ spot }) => {

    return (
        <div>
            <div>
                <h2>{spot.shortDescription}</h2>
            </div>
            <div>
                <span>SELF CHECK IN{spot.selfCheckIn}</span>
            </div>
            <div>
                <p>{spot.longDescription}</p>
            </div>
            <SpotReviews />
        </div>
    )
}

export default SpotContent;