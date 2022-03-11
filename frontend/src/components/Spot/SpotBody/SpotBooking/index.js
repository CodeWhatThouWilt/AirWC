import './SpotBooking.css'
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';

import Calendar from 'react-calendar';
import { differenceInCalendarDays, isBefore, } from 'date-fns'

const SpotBooking = () => {
    const [value, setValue] = useState(new Date());
    const [minSelection, setMinSelection] = useState('00');
    const [hourSelection, setHourSelection] = useState(12);
    const [dayTime, setDayTime] = useState('PM')


    function tileDisabled({ date, view }) {
        // Add class to tiles in month view only
        if (view === 'month') {
            const newDate = new Date();
            // Check if a date React-Calendar wants to check is within any of the ranges
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

    console.log(minDisabled(59))

    const hourDisabled = (hour) => {
        return dayTime === 'AM' ?
            hour < rightNow.getHours() && rightNow > value :
            hour + 12 < rightNow.getHours() && rightNow > value
    }


    return (
        <div className='spot-booking-container'>
            <form>
                <Calendar value={value} onChange={onChange} tileDisabled={tileDisabled} /* tileContent={tileContent} */ />
                <label>
                    Time:
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
                        <option disabled={rightNow.getHours() > 11 && rightNow > value } value='AM' >AM</option>
                        <option value='PM' >PM</option>
                    </select>
                </label>
                <button>Check Availability</button>
            </form>
        </div>
    )
}

export default SpotBooking;