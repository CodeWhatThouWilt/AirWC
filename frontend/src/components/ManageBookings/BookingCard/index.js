import './BookingCard.css';

const BookingCard = ({ booking, spots }) => {

    const spot = spots[booking.spotId]
    const bookingDateObj = new Date(booking.startDate)
    const date = bookingDateObj.toDateString();
    const startHours = bookingDateObj.getHours();
    const startMinutes = bookingDateObj.getMinutes;
    const timeFrame = (new Date(booking.endDate) - new Date(booking.startDate)) / 60000
    let startTime = 'AM'


    return (
        <div className='booking-card'>
            <h3>Booking Information</h3>
            <div className='address-container'>
                <h4>Address:</h4>
                <span>{`${spot.address}`}</span>
                <span>{`${spot.city}, ${spot.state} `}</span>
            </div>
            <div className='address-container'>
                <h4>Booked for:</h4>
                <span>{date}</span>
                <span>{startTime}</span>
                <span>{timeFrame} min</span>
            </div>

        </div>
    )
}

export default BookingCard;