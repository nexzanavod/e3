import React from 'react'
import Select from 'react-select'

function DropDown({ onChange, data={listValues:[]}, id, value }) {
    
    return (
        <div className='mb-3'>
            <Select
                options={data.listValues}
                onChange={(e) => onChange(id, e.value)}
                inputProps={{ id: id }}
                defaultValue={{ label: "Select Dept", value: 0 }}
                value={data.listValues.filter(function (option) {
                    return option.value === value;
                })}
                getOptionValue={option => option['value']}
                getOptionLabel={option => option['title']}
                styles={{
                    control: base => ({
                        ...base,
                        height: 35,
                        minHeight: 35,
                        padding: 0
                    })
                }}
            />
        </div>
    )
}

export default DropDown