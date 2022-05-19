import './SpotTitle.css';
import FavoriteButton from '../../FavoriteButton';

const SpotTitle = ({ spot }) => {

    return (
        <div className='spot-title-area'>
            <div>
                <div className='spot-name'>{spot.name}</div>
                <div className='spot-location'>{spot.city}, {spot.state}, {spot.country}</div>
            </div>
            <FavoriteButton type={'page'} spot={spot} />
        </div>
    );
};

export default SpotTitle;