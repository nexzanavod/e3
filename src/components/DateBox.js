import React from 'react';
import moment from 'moment';

const DateBox = ({ date }) => {
    return <div className='date-box bg-light shadow-sm rounded text-center pb-1 mb-3'>
        <div className='bg-primary'><small><b>{moment(date).format("MMM")}</b></small></div>
        <h2 className='m-0 px-3'>{moment(date).format("DD")}</h2>
        <div className="year">{moment(date).format("YYYY")}</div>
    </div>;
}

export default DateBox;