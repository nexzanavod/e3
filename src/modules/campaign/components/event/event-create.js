import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { connect } from 'react-redux';
import { FormGroup, Label} from 'reactstrap'
import QueryBuilder from './query-builder';
import {bindActionCreators} from 'redux';
import { getEventSchema,getCustomerSchema } from '../../../schema/action';
import { useLocation } from 'react-router';
import queryString from 'query-string';
import EventsDropDown from '../../../schema/components/events-dropdown';
import { insertAutomation,getAutomationById,updateAutomation } from '../../../automation/actions';
import SegmentSingleDropdown from '../../../segment/components/segment-single-dropdown';

const EventCreate = forwardRef(({onChange,onEventChange,onEventSegmentSelect,getAutomationById,automation,updateAutomation,getEventSchema,eventSchema,getCustomerSchema,customerSchema},ref) => {
  const [trigger, setTrigger] = useState({});
  const [condition, setCondition] = useState();
  const {search} = useLocation();
  const {automationId} = queryString.parse(search)
  const [options,setOptions] = useState();
  const [eventName,setEventName] = useState();
  const childRef = useRef();
  const childRefEvent = useRef();

  useImperativeHandle(ref,() =>({
    eventClearState
  }));
  const eventClearState = () =>{
    clearValue();
    setCondition("");
    // setOptions("");
    setTrigger({});
  }
  useEffect(() => {
    setCondition();
  }, [trigger]);

  useEffect(() =>{
    getAutomationById(automationId)
  },[automationId,getAutomationById])

  useEffect(() =>{
      getEventSchema();
      getCustomerSchema();
  },[getEventSchema,getCustomerSchema])

  useEffect(() =>{
      let eventsSchemaArr = [];
      eventSchema && Object.keys(eventSchema).forEach(function(key) {
        eventSchema[key].event = eventSchema[key].label;
        delete eventSchema[key].label;
        console.log(eventSchema[key]);
        eventsSchemaArr.push( eventSchema[key]);
      })
      setOptions(eventsSchemaArr)
  },[eventSchema])

  useEffect(() =>{
    console.log(automation);
    if(automationId){
      // setName(automation.name);
      let triggertData = automation.trigger ? JSON.parse(automation.trigger) : "";
      let conditionData = automation.condition ? JSON.parse(automation.condition) : "";
      setTrigger(triggertData);
      setCondition(conditionData)
      // setCampaign(automation.campaign)
      console.log(automation.campaign)
    }
  },[automationId,automation])

  const clearValue = () =>{
    childRef.current.clearSegmentDropDownValue()
    childRefEvent.current.clearValue();
  }
  // const editAutomation = () =>{
  //   let automation = {
  //     name:name, 
  //     trigger:JSON.stringify(trigger), 
  //     condition:condition,
  //     campaign:campaign
  //   }
  //   updateAutomation(automationId,automation)
  //   setName("");
  //   setTrigger({});
  //   setCondition("");
  //   setCampaign("");
  //   history.push('/automations');
  // }

  // const cancel = ()  =>{
  //   setName("");
  //   setTrigger({});
  //   setCondition("");
  //   setCampaign("");
  //   history.push('/automations');
  //   window.location.reload();
  // }

  const handleEvents = (e) =>{
    if(e){
      onEventChange(e.subfields)
      setTrigger(e)
      setEventName(e.event)
      onChange({event:e.event})
    }
  }

  const handleQueryBuilder = (e) =>{
    let automation = {
      trigger:JSON.stringify(trigger), 
      condition:e,
      event:eventName,
    }
    console.log("Automation Test",automation);
    onChange(automation)
  }

  return (
    <div>
      <FormGroup>
        <Label>Select the event<span className="red-asterisk">*</span></Label>
        <EventsDropDown value={trigger} onChange={handleEvents} options={options} ref={childRefEvent}/>
      </FormGroup>
      {/* {trigger.subfields ?
        <div>
          <FormGroup>
            <Label>Set the condition</Label>
            <QueryBuilder value={condition} onChange={handleQueryBuilder} schema={trigger.subfields} />
          </FormGroup>
        </div>
        : ""} */}
         <Label>Select the segmant (optional)</Label>
        <SegmentSingleDropdown onChange={onEventSegmentSelect} ref={childRef} />
      
    </div>
  )
});

const mapStateToProps = (state) =>{
  return {
    automations:state.automations.automations,
    automation:state.automations.automation,
    eventSchema:state.schema.eventSchema,
    customerSchema:state.schema.customerSchema
  }
}

const mapDispatchToProps = (dispatch) =>{
  return bindActionCreators({
    insertAutomation,
    getAutomationById,
    updateAutomation,
    getEventSchema,
    getCustomerSchema
  },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps,null,{forwardRef:true})(EventCreate);

