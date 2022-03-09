import './SpotBody.css'
import SpotContent from './SpotContent';
import SpotBooking from './SpotBooking';

const SpotBody = ({ spot }) => {

    return (
        <div>
            <SpotContent spot={spot} />
            <SpotBooking />
        </div>
    )
}

export default SpotBody;