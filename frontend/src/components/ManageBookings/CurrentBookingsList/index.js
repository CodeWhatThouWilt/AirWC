import './CurrentBookingsList.css';
import OwnedSpot from '../../ManageSpots/OwnedSpot';
import { getAllBookings } from '../../../store/bookings';
import BookingCard from '../BookingCard';


const CurrentBookings = ({ spots, userBookings, sessionUser }) => {

    const userBookingsArr = Object.values(userBookings);
    const currentBookings = userBookingsArr.filter(booking => new Date() < new Date(booking.startDate))

    // const bookedSpots = userBookingsArr.filter(booking => spots[booking.spotId] && !bookedSpots.includes)

        return (
            <div>
                {userBookingsArr.map(booking => (
                    <BookingCard key={booking.id} booking={currentBookings} spots={spots} />
                ))}
            </div>
        )
}

export default CurrentBookings;