import './BookingCard.css';
import { deleteBooking } from '../../../store/bookings';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react'
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
                <div className='header-div'>
                    <h3 className='booking-card-header' >Booking Information</h3>
                </div>
                <div className='booking-card-content'>
                    <div className='address-container'>
                        <div className='booking-section-title'>Address:</div>
                        <span>{`${spot.address}`}</span>
                        <span>{`${spot.city}, ${spot.state} `}</span>
                    </div>
                    <div className='time-container'>
                        <div className='booking-section-title'>Booked for:</div>
                        <span>{date}</span>
                        <span>{startTime} for {timeFrame} min</span>
                    </div>
                    <div className='self-checkin-container'>
                        <div className='booking-section-title'>Self check in:</div>
                        <span>This location {spot.selfCheckIn ? 'has self check in' : 'does not have self check in'}</span>
                    </div>
                    <div className='booking-buttons'>
                        <EditBookingModal booking={booking} spot={spot} />
                        <button onClick={deleteHandler} className='booking-delete-button' >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookingCard;