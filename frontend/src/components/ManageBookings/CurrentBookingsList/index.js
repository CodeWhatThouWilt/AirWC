import './CurrentBookingsList.css';
import OwnedSpot from '../../ManageSpots/OwnedSpotList/OwnedSpot';
import { getAllBookings } from '../../../store/bookings';



const CurrentBookingsList = ({ spots, sessionUser }) => {

    const spotIds = [];
    // let bookings = []
    const bookings = spots.filter(spot => spot.Bookings.length)
    const userBookings = bookings.filter(booking => booking.userId === sessionUser.id)

    const bookedSpots = [];

    console.log(bookings[0])



        return (
            <div>
                {bookedSpots.map(spot => (
                    <OwnedSpot key={spot.id} spot={spot} />
                ))}
            </div>
        )
}

export default CurrentBookingsList;