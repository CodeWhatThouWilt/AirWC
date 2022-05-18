import './SpotContent.css';
import SpotReviews from '../SpotReviews';

const SpotContent = ({ spot }) => {

    return (
        <div className='spot-content'>
            <div className='spot-summary'>
                <div>
                    <h2>{spot.shortDescription}</h2>
                </div>
                {spot.checkin &&
                    <div className='self-chk-ctn'>
                        <span><i className="fa-solid fa-door-open" style={{ fontSize: '28px', marginRight: '15px' }}></i>{spot.selfCheckIn ? 'This host allows you to let yourself in' : ''}</span>
                    </div>
                }
                <div>
                    <p>{spot.longDescription}</p>
                </div>
            </div>
            <SpotReviews />
        </div>
    )
}

export default SpotContent;