import './SpotListing.css';
import { Link } from 'react-router-dom';

const SpotListing = ({ details }) => {
    console.log(details);
    return (
        <Link to={`/spots/${details.id}`} >
            <div>
                <div>{details.name}</div>
                <img src={details.Images[0].url} alt='spot pic' />
            </div>
        </Link>
    )
}

export default SpotListing;