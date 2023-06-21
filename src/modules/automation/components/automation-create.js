import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { FormGroup, Label, Input } from 'reactstrap'
import CampaignsDropdown from '../../campaign/components/campaigns-dropdown';
import QueryBuilder from './query-builder';
import {bindActionCreators} from 'redux';
import {insertAutomation,getAutomationById,updateAutomation } from '../actions';
import { getSchema } from '../../schema/action';
import { useHistory, useLocation } from 'react-router';
import queryString from 'query-string';
import EventsDropDown from '../../schema/components/events-dropdown';

function AutomationCreate({insertAutomation,getAutomationById,automation,updateAutomation,schema,getSchema}) {
  const [name, setName] = useState("");
  const [trigger, setTrigger] = useState({});
  const [condition, setCondition] = useState();
  const [campaign, setCampaign] = useState();
  const {search} = useLocation();
  const {automationId} = queryString.parse(search)
  const history = useHistory();
  const [options,setOptions] = useState();


  useEffect(() => {
    console.log("TRIGGER",trigger);
    setCondition();
  }, [trigger]);

  useEffect(() =>{
    getAutomationById(automationId)
  },[automationId,getAutomationById])

  useEffect(() =>{
      getSchema();
  },[getSchema])

  useEffect(() =>{
      let eventsSchema = [];
      let events = schema.events;
      events && Object.keys(events).filter(key => !['attributes'].includes(key)).forEach(function(key) {
        events[key].event = events[key].label;
        delete events[key].label;
        console.log(events[key]);
        eventsSchema.push( events[key]);
      })
      setOptions(eventsSchema)
  },[schema])

  useEffect(() =>{
    console.log(automation);
    if(automationId){
      setName(automation.name);
      let triggertData = automation.trigger ? JSON.parse(automation.trigger) : "";
      let conditionData = automation.condition ? JSON.parse(automation.condition) : "";
      setTrigger(triggertData);
      setCondition(conditionData)
      setCampaign(automation.campaign)
      console.log(automation.campaign)
    }
  },[automationId,automation])

  const createAutomation = () => {
    let automation = {
      name:name, 
      trigger:JSON.stringify(trigger), 
      condition:condition,
      campaign:campaign
    }
    console.log(automation);
    insertAutomation(automation)
    setName("");
    setTrigger({});
    setCondition("");
    setCampaign("");
  }

  const editAutomation = () =>{
    let automation = {
      name:name, 
      trigger:JSON.stringify(trigger), 
      condition:condition,
      campaign:campaign
    }
    updateAutomation(automationId,automation)
    setName("");
    setTrigger({});
    setCondition("");
    setCampaign("");
    history.push('/automations');
  }

  const cancel = ()  =>{
    setName("");
    setTrigger({});
    setCondition("");
    setCampaign("");
    history.push('/automations');
    window.location.reload();
  }

  return (
    <div>
      <FormGroup>
        <Label>Automation Name</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Label>Select the trigger</Label>
        <EventsDropDown value={trigger} onChange={(e) => setTrigger(e)} options={options}/>
      </FormGroup>
      {trigger.event ?
        <div>
          <FormGroup>
            <Label>Set the condition</Label>
            <QueryBuilder value={condition} onChange={(e) => setCondition(e)} schema={trigger.subfields} />
          </FormGroup>
          <FormGroup>
            <Label>Select the campaign to execute</Label>
            <CampaignsDropdown value={campaign} onChange={(e) => setCampaign(e)} />
          </FormGroup>
          <FormGroup>
            {!automationId?(
              <button className='btn btn-primary' onClick={createAutomation} >Submit</button>
              ):(
                <div>
                  <button className='btn btn-primary me-2' onClick={cancel} >Cancel</button>
                  <button className='btn btn-primary' onClick={editAutomation} >Update</button>
                </div>
            )}
          </FormGroup>
        </div>
        : ""}
    </div>
  )
}

const mapStateToProps = (state) =>{
  return {
    automations:state.automations.automations,
    automation:state.automations.automation,
    schema:state.schema.schema
  }
}

const mapDispatchToProps = (dispatch) =>{
  return bindActionCreators({
    insertAutomation,
    getAutomationById,
    updateAutomation,
    getSchema
  },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(AutomationCreate);