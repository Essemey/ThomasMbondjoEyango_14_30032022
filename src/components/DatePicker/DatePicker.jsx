import { useState, useRef, useEffect } from 'react';
import '../../styles/components/DatePicker.css'


export function DatePicker({ id, inputName }) {

    const oneDay = 60 * 60 * 24 * 1000;
    const todayTimestamp = Date.now() - (Date.now() % oneDay) + (new Date().getTimezoneOffset() * 1000 * 60);

    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()

    const daysMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthMap = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const dateInput = useRef()

    const getDayDetails = args => {
        let date = args.index - args.firstDay;
        const day = args.index % 7;
        let prevMonth = args.month - 1;
        let prevYear = args.year;
        if (prevMonth < 0) {
            prevMonth = 11;
            prevYear--;
        }
        const prevMonthNumberOfDays = getNumberOfDays(prevYear, prevMonth);
        const _date = (date < 0 ? prevMonthNumberOfDays + date : date % args.numberOfDays) + 1;
        const month = date < 0 ? -1 : date >= args.numberOfDays ? 1 : 0;
        const timestamp = new Date(args.year, args.month, _date).getTime();
        return {
            date: _date,
            day,
            month,
            timestamp,
            dayString: daysMap[day]
        }
    }

    const getNumberOfDays = (year, month) => {
        return 40 - new Date(year, month, 40).getDate();
    }

    const getMonthDetails = (year, month) => {
        const firstDay = (new Date(year, month)).getDay();
        const numberOfDays = getNumberOfDays(year, month);
        const monthArray = [];
        const rows = 6;
        let currentDay = null;
        let index = 0;
        const cols = 7;

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                currentDay = getDayDetails({
                    index,
                    numberOfDays,
                    firstDay,
                    year,
                    month
                });
                monthArray.push(currentDay);
                index++;
            }
        }
        return monthArray;
    }

    const isCurrentDay = day => {
        return day.timestamp === todayTimestamp;
    }

    const isSelectedDay = day => {
        return day.timestamp === datePicker.selectedDay;
    }

    const getDateFromDateString = dateValue => {
        const dateData = dateValue.split('-').map(d => parseInt(d, 10));
        if (dateData.length < 3)
            return null;

        const year = dateData[0];
        const month = dateData[1];
        const date = dateData[2];
        return { year, month, date };
    }

    const getMonthStr = month => monthMap[Math.max(Math.min(11, month), 0)] || 'Month';

    const getDateStringFromTimestamp = timestamp => {
        const dateObject = new Date(timestamp);
        const month = dateObject.getMonth() + 1;
        const date = dateObject.getDate();
        return dateObject.getFullYear() + '-' + (month < 10 ? '0' + month : month) + '-' + (date < 10 ? '0' + date : date);
    }

    const setDate = dateData => {
        const selectedDay = new Date(dateData.year, dateData.month - 1, dateData.date).getTime();
        setDatePicker(s => ({ ...s, selectedDay: selectedDay }))
    }

    const updateDateFromInput = () => {
        const dateValue = dateInput.current.value;
        const dateData = getDateFromDateString(dateValue);
        if (dateData !== null) {
            setDate(dateData);
            setDatePicker(s => ({
                ...s,
                year: dateData.year,
                month: dateData.month - 1,
                monthDetails: getMonthDetails(dateData.year, dateData.month - 1)
            }))
        }
    }

    const setDateToInput = timestamp => {
        const dateString = getDateStringFromTimestamp(timestamp);
        dateInput.current.value = dateString;
    }

    const onDateClick = day => {
        setDatePicker(s => ({ ...s, selectedDay: day.timestamp }))
        setDateToInput(day.timestamp)
    }

    const setYear = offset => {
        const year = datePicker.year + offset;
        const month = datePicker.month;
        setDatePicker(s => ({ ...s, year: year, monthDetails: getMonthDetails(year, month) }))
    }

    const setMonth = offset => {
        let year = datePicker.year;
        let month = datePicker.month + offset;
        if (month === -1) {
            month = 11;
            year--;
        } else if (month === 12) {
            month = 0;
            year++;
        }
        setDatePicker(s => ({ ...s, year: year, month: month, monthDetails: getMonthDetails(year, month) }))
    }

    const renderCalendar = () => {
        const days = datePicker.monthDetails.map((day, index) => {
            return (
                <div className={'c-day-container ' + (day.month !== 0 ? ' disabled' : '') +
                    (isCurrentDay(day) ? ' highlight' : '') + (isSelectedDay(day) ? ' highlight-green' : '')} key={index}>
                    <div className='cdc-day'>
                        <span onClick={() => onDateClick(day)}>
                            {day.date}
                        </span>
                    </div>
                </div>
            )
        })



        return (
            <div className='c-container'>
                <div className='cc-head'>
                    {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((d, i) => <div key={i} className='cch-name'>{d}</div>)}
                </div>
                <div className='cc-body'>
                    {days}
                </div>
            </div>
        )
    }

    const [datePicker, setDatePicker] = useState({
        year,
        month,
        selectedDay: todayTimestamp,
        monthDetails: getMonthDetails(year, month),
        isOpen: false
    });



    return <div className='MyDatePicker'>
        <div className='mdp-input' onClick={() => setDatePicker(s => ({ ...s, isOpen: !s.isOpen }))}>
            <input type='date' id={id} name={inputName} onChange={updateDateFromInput} ref={dateInput} />
        </div>
        {datePicker.isOpen ? (
            <div className='mdp-container'>
                <div className='mdpc-head'>
                    <div className='mdpch-button'>
                        <div className='mdpchb-inner' onClick={() => setYear(-1)}>
                            <span className='mdpchbi-left-arrows'></span>
                        </div>
                    </div>
                    <div className='mdpch-button'>
                        <div className='mdpchb-inner' onClick={() => setMonth(-1)}>
                            <span className='mdpchbi-left-arrow'></span>
                        </div>
                    </div>
                    <div className='mdpch-container'>
                        <div className='mdpchc-year'>{datePicker.year}</div>
                        <div className='mdpchc-month'>{getMonthStr(datePicker.month)}</div>
                    </div>
                    <div className='mdpch-button'>
                        <div className='mdpchb-inner' onClick={() => setMonth(1)}>
                            <span className='mdpchbi-right-arrow'></span>
                        </div>
                    </div>
                    <div className='mdpch-button' onClick={() => setYear(1)}>
                        <div className='mdpchb-inner'>
                            <span className='mdpchbi-right-arrows'></span>
                        </div>
                    </div>
                </div>
                <div className='mdpc-body'>
                    {renderCalendar()}
                </div>
            </div>
        ) : ''}
    </div>
}