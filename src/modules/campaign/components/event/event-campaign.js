import React from 'react'
import Select from 'react-select'
import { Label } from 'reactstrap'

function EventCampaign({onChange}) {
    const options = [
        {}
    ]
    return (
        <div className='md-5 col-md-5'>
            <Label>Choose Rule</Label>
            <Select
                options={options}
                onChange={(e) => {onChange(e)}}
            />
        </div>
  )
}

export default EventCampaign