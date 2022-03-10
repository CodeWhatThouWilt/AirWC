import './SpotBody.css'
import SpotContent from './SpotContent';
import SpotBooking from './SpotBooking';

const SpotBody = ({ spot }) => {

    return (
        <div className='spot-content-container'>
            <SpotContent spot={spot} />
            <SpotBooking />
        </div>
    )
}

export default SpotBody;