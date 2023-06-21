import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import Multiselect from 'multiselect-react-dropdown';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { getSegments } from '../actions';

const SegmentDropdown = forwardRef(({segments,getSegments,onSelect,onRemove},ref) => {
    const [options,setOptions] = useState([]);
    let segmentRef = null;
    useImperativeHandle(ref,() => ({
        clearValue
    }));

    const clearValue = () =>{
        segmentRef.resetSelectedValues();
    }

    useEffect(()=>{
        getSegments();
    },[getSegments])

    useEffect(() =>{
        const fetchSegmentsData = () =>{
            const segmentArr = segments?.map((dt) =>{
                let dataObj = {};
                dataObj = {...dt};
                dataObj.id = dt._id;
                return dataObj;
            })
            setOptions(segmentArr);
        }
        fetchSegmentsData();
    },[segments])

    return (
        <div>
            <label>Choose Segments<span className="red-asterisk">*</span></label>
            <Multiselect 
                options={options}
                displayValue="name"
                onSelect={onSelect}
                onRemove={onRemove}
                ref={ref2 => {
                    segmentRef = ref2;
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

const  mapDispatchToProps = (dispatch) =>{
    return bindActionCreators({
        getSegments
    },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps,null,{forwardRef:true})(SegmentDropdown);