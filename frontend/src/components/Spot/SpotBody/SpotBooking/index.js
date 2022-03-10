import './SpotBooking.css'
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';

import Calendar from 'react-calendar';
import { differenceInCalendarDays } from 'date-fns'

const SpotBooking = () => {
    const [value, setValue] = useState(new Date());


    const datesToAddContentTo = ['tomorrow', 'in3Days', 'in5Days'];

    function isSameDay(a, b) {
        return differenceInCalendarDays(a, b) === 0;
    }

    function tileContent({ date, view }) {
        // Add class to tiles in month view only
        if (view === 'month') {
            // Check if a date React-Calendar wants to check is on the list of dates to add class to
            if (datesToAddContentTo.find(dDate => isSameDay(dDate, date))) {
                return 'My content';
            }
        }
    }

    function onChange(nextValue) {
        setValue(nextValue);
    }



    return (
        <div className='spot-booking-container'>
            <form>
            <Calendar value={value} onChange={onChange} tileContent={tileContent}/>
            <label>
                <select>
                    <option>1</option>
                </select>
            </label>
            <button>Check Avilability</button>
            </form>
        </div>
    )
}

export default SpotBooking;