import './SpotBooking.css'
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';

import Calendar from 'react-calendar';
import { differenceInCalendarDays, isBefore,} from 'date-fns'

const SpotBooking = () => {
    const [value, setValue] = useState(new Date());
    const [ minSelection, setMinSelection ] = useState('00');
    const [ hourSelection, setHourSelection] = useState(12);
    const [ dayTime, setDayTime ] = useState('PM')


    // const datesToAddContentTo = [new Date(), ];

    // function isSameDay(a, b) {
    //     return differenceInCalendarDays(a, b) === 0;
    // }

    // function tileContent({ date, view }) {
    //     // Add class to tiles in month view only
    //     if (view === 'month') {
    //         // Check if a date React-Calendar wants to check is on the list of dates to add class to
    //         if (datesToAddContentTo.find(dDate => isSameDay(dDate, date))) {
    //             return <div>•</div>;
    //         }
    //     }
    // }


    function tileDisabled({ date, view }) {
        // Add class to tiles in month view only
        if (view === 'month') {
            // Check if a date React-Calendar wants to check is within any of the ranges
            const newDate = new Date();
            return isBefore(date, new Date());
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

    console.log(minutes)

    return (
        <div className='spot-booking-container'>
            <form>
                <Calendar value={value} onChange={onChange} tileDisabled={tileDisabled} /* tileContent={tileContent} */ />
                <label>
                    Time:
                    <select>
                        {hours.map(hour => (
                            <option>{hour}</option>
                        ))}
                    </select>
                    <select>
                        {minutes.map(min => (
                            <option>{min}</option>
                        ))}
                    </select>
                    <select>
                        <option>AM</option>
                        <option>PM</option>
                    </select>
                </label>
                <button>Check Avilability</button>
            </form>
        </div>
    )
}

export default SpotBooking;