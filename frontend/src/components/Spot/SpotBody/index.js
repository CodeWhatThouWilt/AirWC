import './SpotBody.css'
import SpotContent from './SpotContent';
import SpotBooking from './SpotBooking';

const SpotBody = ({ spot }) => {

    return (
        <div className='spot-content-container'>
            <SpotContent spot={spot} />
            <SpotBooking bookings={spot.Bookings} />
        </div>
    )
}

export default SpotBody;