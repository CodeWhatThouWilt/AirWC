import './EditBookingForm.css';
import 'react-calendar/dist/Calendar.css';
import { useState, useEffect } from 'react';
// import { createBooking } from '../../../../store/spots';
import { getAllBookings, createBooking } from '../../../store/bookings';
import { useDispatch, useSelector } from 'react-redux';

import Calendar from 'react-calendar';
import { isBefore } from 'date-fns'


const EditBookingForm = ({ booking, spot }) => {
    const dispatch = useDispatch();

    const bookingTimeObj = new Date(booking.startDate);
    console.log(bookingTimeObj);

    const bookingDateObj = new Date(booking.startDate)
    const date = bookingDateObj.toDateString();
    let startHours = bookingDateObj.getHours();
    let startMinutes = bookingDateObj.getMinutes();
    let amPm = startHours >= 11 ? 'PM' : 'AM'
    const timeFrame = (new Date(booking.endDate) - new Date(booking.startDate)) / 60000
    startHours = startHours >= 13 ? startHours - 12 : startHours
    startMinutes = startMinutes < 10 ? '0' + startMinutes : startMinutes
    console.log(amPm)
    const [value, setValue] = useState(new Date());
    const [minSelection, setMinSelection] = useState(startMinutes);
    const [hourSelection, setHourSelection] = useState(startHours);
    const [dayTime, setDayTime] = useState(amPm);
    const [minBooked, setMinBooked] = useState(timeFrame);

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

    // const rightNow = new Date();

    // const minDisabled = (minute) => {
    //     if (dayTime === 'AM') {
    //         return hourSelection !== rightNow.getHours() && minute < rightNow.getMinutes() && rightNow > value
    //     } else {
    //         return hourSelection + 12 !== rightNow.getHours() && minute < rightNow.getMinutes() && rightNow > value
    //     }
    // }


    // const hourDisabled = (hour) => {
    //     return dayTime === 'AM' ?
    //         hour < rightNow.getHours() && rightNow > value :
    //         hour + 12 < rightNow.getHours() && rightNow > value
    // }

    const submitHandler = async (e) => {
        e.preventDefault();

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

    }

    return (
        <div className='edit-booking-container'>
            <form onSubmit={e => submitHandler(e)}>
                <Calendar value={value} onChange={onChange} tileDisabled={tileDisabled} />
                <label>
                    Time:
                    <select value={hourSelection} onChange={e => setHourSelection(e.target.value)} >
                        {hours.map(hour => (
                            <option key={hour}  value={hour} >{hour}</option>
                        ))}
                    </select>
                    <select value={minSelection} onChange={e => setMinSelection(e.target.value)}>
                        {minutes.map(min => (
                            <option key={min} value={min} >{min}</option>
                        ))}
                    </select>
                    <select value={dayTime} onChange={e => setDayTime(e.target.value)}>
                        <option value='AM' >AM</option>
                        <option value='PM' >PM</option>
                    </select>
                </label>
                <label>
                    Book for:
                    <div className='min-selector'>
                        <input type='number' max={60} step={5} value={minBooked} onChange={e => setMinBooked(e.target.value)} ></input>
                    </div>
                </label>
                <button>Check Availability</button>
            </form>
        </div>
    )
}

export default EditBookingForm;