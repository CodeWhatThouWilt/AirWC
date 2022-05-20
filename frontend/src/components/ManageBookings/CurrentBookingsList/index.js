import './CurrentBookingsList.css';
import BookingCard from '../BookingCard';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';


const CurrentBookings = ({ spots, userBookings, sessionUser }) => {
    const dispatch = useDispatch();
    const userBookingsArr = Object.values(userBookings);
    // const currentBookings = userBookingsArr.filter(booking => new Date() < new Date(booking.startDate))

    // const bookedSpots = userBookingsArr.filter(booking => spots[booking.spotId] && !bookedSpots.includes)

        return (
            <div className='booking-list'>
                {userBookingsArr.map(booking => (
                    <BookingCard key={booking.id} booking={booking} spots={spots} />
                ))}
            </div>
        )
}

export default CurrentBookings;