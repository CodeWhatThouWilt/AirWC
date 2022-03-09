import './OwnedSpotList.css';
import OwnedSpot from './OwnedSpot';

const OwnedSpotList = ({ spots, sessionUser }) => {
    const ownedSpots = spots.filter(spot => spot.userId === sessionUser.id)

    return (
        <div>
            {ownedSpots.map(spot => (
                <OwnedSpot key={spot.id} spot={spot} />
            ))}
        </div>
    )
}

export default OwnedSpotList;