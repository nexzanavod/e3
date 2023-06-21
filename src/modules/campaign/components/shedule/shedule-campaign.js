import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react'
import { FormGroup, Input, Label, Row, Col } from 'reactstrap';
import Cron from 'react-cron-generator';
import { HEADER } from 'react-cron-generator';
import Select from 'react-select';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getCustomerSchema } from "../../../schema/action";
import SegmentSingleDropdown from '../../../segment/components/segment-single-dropdown';

const  SheduleCampaign = forwardRef(({getCustomerSchema, customerSchema, onChange, setSchedulePayload,clearScheduleState},ref) => {
  const [options, setOptions] = useState();
  const [attribute, setAttribute] = useState();
  const [time, setTime] = useState();
  const [frequency, setFrequency] = useState();
  const [interval, setInterval] = useState(0);
  const [segment,setSegment] = useState("");
  const childRef = useRef();
  let frequencyRef = null;
  let attributesRef = null;
  
  useImperativeHandle(ref,() =>({
    scheduleClearState
  }));
  const scheduleClearState = () =>{
    setInterval(0);
    clearValue()
  }
  useEffect(() => {
    getCustomerSchema();
  }, [getCustomerSchema]);

  useEffect(() => {
    if (Object.keys(customerSchema).length > 0) {
      const filterSchemaData = () => {
        const schemaArray = [];
        for (let item in customerSchema) {
          let dataObj = {};
          if(item === "dob" || item === "due_date"){
            dataObj.value = item;
            dataObj.label = item;
            schemaArray.push(dataObj);
          }
        }
        setOptions(schemaArray);
      };
      filterSchemaData();
    }
  }, [customerSchema]);

  useEffect(() => {
    const payload = {
      attribute: attribute,
      time: time,
      frequency: frequency,
      interval: interval,
      segment:segment
    };

    const payloadHandler = () => {
      setSchedulePayload(payload);
    };

    payloadHandler();
     // eslint-disable-next-line 
  }, [attribute, time, frequency, interval, segment]);

  const cronOptions = {
    headers: [HEADER.DAILY, HEADER.WEEKLY, HEADER.MONTHLY]
  };

  const clearValue = () => {
    frequencyRef.select.clearValue();
    attributesRef.select.clearValue();
    childRef.current.clearSegmentDropDownValue();
  };

  const frequencies = [
    { value: "yearly", label: "Yearly" },
    { value: "monthly", label: "Monthly" },
    { value: "weekly", label: "Weekly" },
    { value: "daily", label: "Daily" },
  ];

  function handleAttribute(e) {
    if(e){
      setAttribute(e.value);
    }
  }

  // function handleTime(e) {
  //   setTime(e.target.value);
  // }

  function handleFrequency(e) {
    if(e){
      setFrequency(e.value);
    }
  }

  function handleInterval(e) {
    setInterval(e.target.value);
  }

  const onSheduleSegmentSelect = (e) =>{
    setSegment(e)
  }

  return (
    <div>
      <Row>
        <Col>
          <FormGroup>
            <Label className='mb-0'>Attribute</Label>
            <Select
              className="multi-select"
              options={options}
              onChange={(e) => {
                handleAttribute(e);
              }}
              ref={ref => {
                attributesRef = ref;
              }}
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label className='mb-0'>Interval in Days</Label>
            <Input 
            type="number" 
            className='mb-3'
            onChange={(e) => {
              handleInterval(e);
            }}
            value={interval}
            defaultValue={interval}
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label className='mb-0'>Frequency</Label>
            <Select
              className="multi-select"
              options={frequencies}
              onChange={(e) => {
                handleFrequency(e);
              }}      
              ref={ref => {
                frequencyRef = ref;
              }}
            />
          </FormGroup>
        </Col>
      </Row>
      {/* <Row>
        <Col>
        <Label className='mb-0'>Custom Recurrence</Label>
          <Cron
            onChange={(e) => { setTime(e) }}
            value={time}
            showResultText={true}
            options={cronOptions}
          />
        </Col>
      </Row> */}
      <Row>
        <Col>
          <Label className='mt-2 mr-2'>Select Segement<span className="red-asterisk">*</span></Label>
          <SegmentSingleDropdown onChange={onSheduleSegmentSelect} ref={childRef}/>
        </Col>
      </Row>
    </div>
  )
});

const mapStateToProps = (state) => {
  return {
    customerSchema: state.schema.customerSchema,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getCustomerSchema,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps,null,{forwardRef:true})(SheduleCampaign);
