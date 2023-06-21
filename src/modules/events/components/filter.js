import React, { useEffect } from 'react'
import { useState } from 'react'
// import { DateRangePicker } from 'react-dates'
import { Button, FormGroup, Input } from 'reactstrap'
import Well from '../../../components/Well';
import moment from "moment";
import { useParams } from 'react-router';
import DateRangePicker from 'rsuite/DateRangePicker';

function EventsFilter({ searchEvents, className, btnClass, inputClass, onChange, onShowFilter }) {
    const { id } = useParams();
    const [searchTerms, setSearchTerms] = useState("");
    const [focusedInput, setFocusedInput] = useState();
    const [customerId, setCustomerId] = useState();
    const [date, setDate] = useState([
        {
            startDate: '',
            endDate: ''
        }
    ])
    const [dateRange, setDateRange] = useState(['', '']);
    useEffect(() => {
        setCustomerId(id);
    }, [id])

    const search = () => {
        let eventsParams = {
            id: customerId ? customerId : "",
            searchTerm: searchTerms ? searchTerms : '',
            startDate: dateRange && dateRange[0] ? moment(dateRange[0]).format('YYYY-MM-DD') : '',
            endDate: dateRange && dateRange[1] ? moment(dateRange[1]).format('YYYY-MM-DD') : ''
        }
        if (typeof onChange === 'function') {
            onChange(eventsParams);
        }
    }
    const handleDateChange = (value) => {
        setDateRange(value);
    };
    return (
        <div className={className}>
            <div >
                <Input onChange={(e) => { setSearchTerms(e.target.value) }} placeholder='Search By Customer Code' />
            </div>
            <div>
                {/* <DateRangePicker
                    startDate={date.startDate} // momentPropTypes.momentObj or null,
                    endDate={date.endDate} // momentPropTypes.momentObj or null,
                    onDatesChange={({ startDate, endDate }) => setDate({ startDate, endDate })} // PropTypes.func.isRequired,
                    focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={focusedInput => setFocusedInput(focusedInput)} // PropTypes.func.isRequired,
                    isOutsideRange={() => false}
                /> */}
                <DateRangePicker 
                    className='w-100'
                    placeholder="Select Date Range"
                    value={dateRange}
                    onChange={handleDateChange}
                />
            </div>
            <Button color='primary' className={btnClass} onClick={search}>Search</Button>
        </div>
    )
}

export default EventsFilter;