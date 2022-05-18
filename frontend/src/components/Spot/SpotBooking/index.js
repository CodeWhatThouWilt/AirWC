import './SpotBooking.css'
import 'react-calendar/dist/Calendar.css';
import { useState, useEffect } from 'react';
// import { createBooking } from '../../../../store/spots';
import { getAllBookings, createBooking } from '../../../store/bookings';
import { useDispatch, useSelector } from 'react-redux';

import Calendar from 'react-calendar';
import { isBefore } from 'date-fns'


const SpotBooking = ({ spot }) => {
    const dispatch = useDispatch();
    const bookings = useSelector(state => state.bookingsState.spotBookings)

    const [value, setValue] = useState(new Date());
    const [minSelection, setMinSelection] = useState('00');
    const [hourSelection, setHourSelection] = useState(12);
    const [dayTime, setDayTime] = useState('PM');
    const [minBooked, setMinBooked] = useState(5);
    const [errors, setErrors] = useState([])
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        dispatch(getAllBookings())
    }, [dispatch]);

    function tileDisabled({ date, view }) {
        if (view === 'month') {
            const newDate = new Date();
            return isBefore(date, newDate.setDate(newDate.getDate() - 1));
        }
    }

    function onChange(nextValue) {
        setValue(nextValue);
    }

    const minutes = [];
    const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    (() => {
        for (let i = 0; i < 60; i += 5) {
            i < 10 ? minutes.push(`0` + i) : minutes.push(i)
        }
    })();

    const rightNow = new Date();

    const minDisabled = (minute) => {
        if (dayTime === 'AM') {
            return hourSelection !== rightNow.getHours() && minute < rightNow.getMinutes() && rightNow > value
        } else {
            return hourSelection + 12 !== rightNow.getHours() && minute < rightNow.getMinutes() && rightNow > value
        }
    }


    const hourDisabled = (hour) => {
        return dayTime === 'AM' ?
            hour < rightNow.getHours() && rightNow > value :
            hour + 12 < rightNow.getHours() && rightNow > value
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setErrors([])

        let startHour;

        if (dayTime === 'AM' && hourSelection === 12) {
            startHour = 0;
        } else if (dayTime === 'AM') {
            startHour = hourSelection
        } else if (dayTime === 'PM' && hourSelection === 12) {
            startHour = 12;
        } else if (dayTime === 'PM') {
            startHour = hourSelection + 12
        }

        const startDate = new Date(value.getFullYear(), value.getMonth(), value.getDate(), startHour, minSelection);
        const endDate = new Date(startDate.getTime() + parseInt(minBooked, 10) * 1000 * 60);

        const booking = {
            spotId: spot.id,
            startDate,
            endDate
        }

        await dispatch(createBooking(booking))
            .then(res => setSubmitted(true))
            .catch(res => setErrors([1]))

    }

    return (
        <div className='spot-booking-container'>
            <div style={{ display: 'inline', color: 'white', height: '35px' }}>{errors.length ? 'Whoops! That slot is taken' : submitted ? 'Booking successful!' : ''}</div>
            <form onSubmit={e => submitHandler(e)}>
                <Calendar value={value} onChange={onChange} tileDisabled={tileDisabled} />
                <div className='booking-time-select'>
                    <label>
                        Time:
                    </label>
                    <div>
                        <select value={hourSelection} onChange={e => setHourSelection(e.target.value)} >
                            {hours.map(hour => (
                                <option key={hour} disabled={hourDisabled(hour)} value={hour} >{hour}</option>
                            ))}
                        </select>
                        <select value={minSelection} onChange={e => setMinSelection(e.target.value)}>
                            {minutes.map(min => (
                                <option key={min} disabled={minDisabled(min)} value={min} >{min}</option>
                            ))}
                        </select>
                        <select value={dayTime} onChange={e => setDayTime(e.target.value)}>
                            <option disabled={rightNow.getHours() > 11 && rightNow > value} value='AM' >AM</option>
                            <option value='PM' >PM</option>
                        </select>
                    </div>
                </div>
                <label>
                    Book for:
                    <div className='min-selector'>
                        <input type='number' max={60} step={5} value={minBooked} onChange={e => setMinBooked(e.target.value)} ></input>
                    </div>
                    <div>Total cost: ${spot.price * (minBooked / 5)}</div>
                </label>
                <button className='check-availability-button'>Check Availability</button>
            </form>
        </div>
    )
}

export default SpotBooking;