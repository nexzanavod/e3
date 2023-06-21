import React, { useEffect } from 'react'
import { useState } from 'react'
import { DateRangePicker } from 'react-dates'
import { Button, FormGroup, Input } from 'reactstrap'
import Well from '../../../components/Well';
import moment from "moment";
import { useParams } from 'react-router';

function CustomerProductsFilter({ searchEvents, className, btnClass, inputClass, onChange, onShowFilter }) {
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
    useEffect(() => {
        setCustomerId(id);
    }, [id])

    const search = () => {
        let cutomerProductParams = {
            id: customerId ? customerId : "",
            searchTerm: searchTerms ? searchTerms : '',
            startDate: date.startDate ? moment(date.startDate).format('YYYY-MM-DD') : '',
            endDate: date.endDate ? moment(date.endDate).format('YYYY-MM-DD') : ''
        }
        if (typeof onChange === 'function') {
            onChange(cutomerProductParams);
        }
    }
    return (
        <div className={className}>
            <div className='ps-0' >
                <Input onChange={(e) => { setSearchTerms(e.target.value) }} placeholder='Search' />
            </div>
            {/* <div>
                <DateRangePicker
                    startDate={date.startDate} // momentPropTypes.momentObj or null,
                    endDate={date.endDate} // momentPropTypes.momentObj or null,
                    onDatesChange={({ startDate, endDate }) => setDate({ startDate, endDate })} // PropTypes.func.isRequired,
                    focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={focusedInput => setFocusedInput(focusedInput)} // PropTypes.func.isRequired,
                    isOutsideRange={() => false}
                />
            </div> */}
            <Button color='primary' className={btnClass} onClick={search}>Search</Button>
        </div>
    )
}

export default CustomerProductsFilter;