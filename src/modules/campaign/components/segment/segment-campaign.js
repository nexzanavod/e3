import React, { forwardRef, useImperativeHandle } from 'react'
import { useRef } from 'react';
import SegmentDropdown from '../../../segment/components/segment-multiple-dropdown'

const SegmentCampaign = forwardRef(({onSelect,onRemove},ref) =>{
  const childRef = useRef();
  useImperativeHandle(ref,() => ({
    segmentClearState
  }));

  const segmentClearState = () =>{
    childRef.current.clearValue();
  }

  return (
    <div>
          <SegmentDropdown onSelect={onSelect} onRemove={onRemove} ref={childRef} />
    </div>
  )
});

export default SegmentCampaign