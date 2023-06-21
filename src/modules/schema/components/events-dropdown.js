import React, { forwardRef, useImperativeHandle } from 'react'
import Select from 'react-select';

const EventsDropDown = forwardRef(({ value, onChange,options },ref) =>{
    let eventRef = null;

    useImperativeHandle(ref,() => ({
        clearValue
    }));

    const clearValue = () =>{
        eventRef.select.clearValue();
    }
    return (
        <Select
            options={options}
            onChange={(e) => onChange(e)}
            getOptionValue={option => option['event']}
            getOptionLabel={option => option['event']}
            ref={ref => {
                eventRef = ref;
            }}
        />
    )
});

export default EventsDropDown;