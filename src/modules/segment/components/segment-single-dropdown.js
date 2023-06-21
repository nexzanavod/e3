import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { connect } from 'react-redux';
import Select from 'react-select';
import {bindActionCreators} from 'redux'
import { getSegments } from '../actions';
const BASIC_SEGMENT = "BASIC_SEGMENT"

const SegmentSingleDropdown = forwardRef(({segments,getSegments,onChange,type},ref) => {
    const [options,setOptions] = useState([]);
    let segmentRef = null;
    useEffect(() =>{
        getSegments();
    },[getSegments])

    useImperativeHandle(ref,() => ({
        clearSegmentDropDownValue
    }));

    useEffect(() =>{
        const fetchSegmentsData = () =>{
            let segmentArr = segments;
            if(type && type === BASIC_SEGMENT){
                segmentArr = segmentArr?.filter((val) => {return val.type === 'BASIC_SEGMENT'})
            }
            segmentArr = segmentArr?.map((dt) =>{
                let dataObj = {};
                dataObj.value = dt._id;
                dataObj.label = dt.name;
                return dataObj;
            })
            setOptions(segmentArr);
        }
        fetchSegmentsData();
    },[segments])

    const clearSegmentDropDownValue = () =>{
        segmentRef.select.clearValue()
    }
    return (
        <div>
            <Select
                options={options}
                onChange={(e) => onChange(e ? e.value :"")}
                // inputProps={{ id: id }}
                // defaultValue={{ label: "Select Dept", value: 0 }}
                // value={options.filter(function (option) {
                //     return option.value === value;
                // })}
                ref={ref => {
                    segmentRef = ref;
                }}
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
});

const mapStateToProps = (state) =>{
    return {
        segments:state.segments.segments
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        getSegments
    },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps,null,{forwardRef:true})(SegmentSingleDropdown);