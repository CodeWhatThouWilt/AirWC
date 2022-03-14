import './BookingCard.css';
import { deleteBooking } from '../../../store/bookings';
import { useDispatch, useSelector } from 'react-redux';
import {useEffect} from 'react'
import { getAllBookings } from '../../../store/bookings';
import { getSpots } from '../../../store/spots';
import EditBookingModal from '../../EditBookingModal';

const BookingCard = ({ booking, spots }) => {
    const dispatch = useDispatch();

    const spot = spots[booking.spotId]
    const bookingDateObj = new Date(booking.startDate)
    const date = bookingDateObj.toDateString();
    const startHours = bookingDateObj.getHours();
    const startMinutes = bookingDateObj.getMinutes();
    const timeFrame = (new Date(booking.endDate) - new Date(booking.startDate)) / 60000
    let timeOfDay = startHours > 11 ? 'PM' : 'AM'

    let startTime = `${startHours >= 13 ? startHours - 12 : startHours}:${startMinutes < 10 ? '0' + startMinutes : startMinutes} ${timeOfDay}`

    const deleteHandler = () => {
        dispatch(deleteBooking(booking.id));
    }


    return (
        <div className='booking-card-background'>
            <div className='booking-card'>
                <h3 style={{ textAlign: 'center' }}>Booking Information</h3>
                <div className='address-container'>
                    <h4>Address:</h4>
                    <span>{`${spot.address}`}</span>
                    <span>{`${spot.city}, ${spot.state} `}</span>
                </div>
                <div className='time-container'>
                    <h4>Booked for:</h4>
                    <span>{date}</span>
                    <span>{startTime} for {timeFrame} min</span>
                </div>
                <div className='self-checkin-container'>
                    <h4>Self check in:</h4>
                    <span>This location {spot.selfCheckIn ? 'has self check in' : 'does not have self check in'}</span>
                </div>
                <div className='booking-buttons'>
                    <EditBookingModal booking={booking} spot={spot} />
                    <button onClick={deleteHandler}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BookingCard;