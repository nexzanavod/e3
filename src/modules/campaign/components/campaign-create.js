import React, { useEffect, useState } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addCustomerCampaign,getMhngAccountList } from '../actions';
import { useHistory } from 'react-router';
import CampaignTabs from './campaign-tabs';
import { CardBody, Form, Input, Label, FormGroup, Button, Card, Row, Col } from 'reactstrap';
import CampaginMessage from './campaign-message';
import { getCustomerSchema,getScheduleSchema } from '../../schema/action';
import { omit } from 'lodash';
import CampaignChannels from './campaign-channels';
import Select from 'react-select';
import ReactSwitch from 'react-switch';
import Swal from 'sweetalert2';

function CampaignCreate({ addCustomerCampaign,customerSchema,getCustomerSchema,onChange,getMhngAccountList,mhngAccountList,getScheduleSchema,scheduleSchema}) {
    const [name, setCampaignName] = useState("");
    const [message, setMessage] = useState("");
    const [segArr, setSegArr] = useState([]);
    const [eventSegId, setEventSegId] = useState();
    const [channelinfo, setChannelInfo] = useState([]);
    const [automation,setAutomation] = useState({});
    const [scheduleData, setScheduleData] = useState();
    const [placeholderData,setPlaceholderData] = useState("");
    const [campaignType,setCampaignType] = useState("");
    const [segmentIdMessagePreview,setSegmentIdMessagePreview] = useState();
    const [mhngAccountId,setMhngAccountId] = useState();
    const [isAllChannelSelected,setIsAllChannelSelected] = useState(true);
    const [accountSelected,setAccountSelected] = useState(false);
    const [checked,setChecked] = useState(false)
    const [campaingStartDate,setCampaignStartDate] = useState("");
    const [campaingEndDate,setCampaignEndDate] = useState("");
    const [eventFields,setEventFields] = useState();
    const [scheduleFields, setScheduleFields] = useState([]);
    const history = useHistory();
    useEffect(() =>{
        getCustomerSchema();
        getMhngAccountList();
        getScheduleSchema()
        setScheduleFields([])
    },[getCustomerSchema,getMhngAccountList,getScheduleSchema])

    useEffect(() =>{
        onChange({message:message,segments:segmentIdMessagePreview})
    },[message,segmentIdMessagePreview])

    const createCampaign = (e) => {
        e.preventDefault();
        if(eventSegId){
            automation.segment = eventSegId;
        }
        let objData = {
            campaign_name: name,
            content: {
                message: message
            },
            channels: channelinfo,
            isAllChannelSelected:isAllChannelSelected,
            segments: segArr,
            automation: automation,
            schedule: scheduleData,
            type:campaignType,
            startDate:campaingStartDate,
            endDate:campaingEndDate
        }
        if(campaignType == ""){
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please Select the Campaign Type'
            });
        }else if(campaignType === "SEGMENT_BASED_CAMPAIGN" && segArr == ""){
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Please Select the Segment'
                });
        }else if(campaignType === "EVENT_BASED_CAMPAIGN" && !automation.segment){
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Please Select the Segment'
                });
        }else if(campaignType === "SCHEDULE_BASED_CAMPAIGN" && !scheduleData.segment){
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please Select the Segment'
            });
        }else{
            addCustomerCampaign(objData);
            console.log("CAMPAIGN DATA",objData);
            setCampaignName("");
            setMessage("");
            setSegArr([]);
            setChannelInfo([]);
            history.push('/campaigns')
        }
    }

    const onSelect = (selectedList, selectedItem) => {
        console.log(selectedList)
        setPlaceholderData(customerSchema)
        let segmentArr = [];
        selectedList.map((dt) => {
            segmentArr.push(dt._id);
            return segmentArr;
        })
        setSegArr(segmentArr);
        setSegmentIdMessagePreview(segmentArr)
    }

    const onRemove = (selectedList, removedItem) =>{
        console.log(selectedList)
        let segmentArr = [];
        selectedList.map((dt) => {
            segmentArr.push(dt._id);
            return segmentArr;
        })
        if(Object.keys(selectedList).length !== 0){
            setSegArr(segmentArr);
            setSegmentIdMessagePreview(segmentArr)
        }else{
            setSegArr("");
            setMessage("");
            setSegmentIdMessagePreview("")
        }
    }

    const onEventSegmentSelect  = (e) => {
        setEventSegId(e);
        setSegmentIdMessagePreview([e]);
    }

    const handleEventChange = (e) =>{
        let eventPayload =  e;
        let attributes = [];
        customerSchema && Object.keys(customerSchema).forEach((dt) =>{
            attributes.push(dt);
        })
        let omitedData = omit(eventPayload,attributes);
        omitedData && Object.keys(omitedData).forEach((dt) =>{
           if(dt.split('payload.')[1]){
            omitedData[dt.split('payload.')[1]] =  omitedData[dt];
            delete omitedData[dt];
           }
        })
        setEventFields(eventPayload)
        setPlaceholderData(omitedData);
    }

    const handleMessage = (value) =>{
        setMessage(value)
    }

    const handleChannels = (data) =>{
        setChannelInfo(data);
    }

    const handleAllSelectedChannel = (value) =>{
        setIsAllChannelSelected(value)
    }

    const setHandleCampaignType = (e) =>{
        setCampaignType(e);
        if(e === "SEGMENT_BASED_CAMPAIGN"){
            onChange({message:"",segments:null})
            setMessage("")
            setEventFields([])
            setScheduleFields([])
        }
        if(e === "EVENT_BASED_CAMPAIGN"){
            onChange({message:"",segments:null})
            setMessage("")
            setScheduleFields([])
        }
        if(e === "SCHEDULE_BASED_CAMPAIGN"){
            onChange({message:"",segments:null})
            setMessage("")
            setEventFields([])
        }
    }
    const checkSchedule = () =>{
        setChecked((prev) => !prev)
    }

    const handleAccount = (value) =>{
        setMhngAccountId(value)
        setAccountSelected(true)
    }

    const handleScheduleChange = (e) =>{
        setScheduleFields(scheduleSchema[Object.keys(scheduleSchema)[0]])
        setScheduleData(e)
    }
    return (
        <Card>
            <CardBody>
                <Form onSubmit={(e) => createCampaign(e)}>
                    <Row className='mb-3 align-items-center'>
                        <Col>
                            <Label>
                                Campaign Name<span className="red-asterisk">*</span>
                            </Label>
                            <Input type="text"
                                className="form-control w-100"
                                placeholder="Campaign Name"
                                required
                                value={name}
                                onChange={(e) => { setCampaignName(e.target.value) }} />
                        </Col>
                        {/* <Col>
                            <Label>Account</Label>
                            <Select
                                options={mhngAccountList}
                                getOptionValue={option => option['_id']}
                                getOptionLabel={option => option['name']}
                                onChange={(e) =>{handleAccount(e._id)}}
                            />
                        </Col> */}
                    </Row>
                    {/* <div className="mb-3">
                        <FormGroup check inline>
                            <Label check>
                                <Input type='radio' id='promotional' name="t" value="Promotional" /> Promotional
                            </Label>
                        </FormGroup>
                        <FormGroup check inline>
                            <Label check>
                                <Input type='radio' id='transactional' name="t" value="Transactional" /> Transactional
                            </Label>
                        </FormGroup>
                    </div> */}
                    {accountSelected ? (
                        <CampaignChannels accountId={mhngAccountId} onChange={(e) => {handleChannels(e)}} onChangeAllSelectedChannel={(e) =>{handleAllSelectedChannel(e)}} />
                    ):""}
                    <CampaignTabs 
                        onSelect={onSelect} 
                        onRemove={onRemove}
                        onChange={(e) => {setAutomation(e)}} 
                        onEventChange={(e) => {handleEventChange(e)}} 
                        onEventSegmentSelect={onEventSegmentSelect}
                        setSchedulePayload={(e) => {handleScheduleChange(e)}}   
                        setHandleCampaignType={setHandleCampaignType}
                    />
                    <br/>
                    <CampaginMessage onChange={(e) => {handleMessage(e.target.value)}} value={message} placeholderData={placeholderData ? placeholderData : ""} eventFields={eventFields}  scheduleFields={scheduleFields}/>
                    <div className='row mt-3'>
                        {campaignType === "SEGMENT_BASED_CAMPAIGN" ? (
                            <div className="col md-3">
                                <div className='d-flex align-items-center mb-2'>
                                    <ReactSwitch onChange={checkSchedule} checked={checked} className='me-2 text-primary bg-primary' onColor="#207fff" />
                                    <span>Schedule</span>
                                </div>
                                {checked ? (
                                    <div className='d-flex'>
                                        <div className='me-3'>
                                            <Label className='mb-0'>Start Date</Label>
                                            <Input type="date" onChange={(e) => {setCampaignStartDate(e.target.value)}} value={campaingStartDate} required />
                                        </div>
                                        <div>
                                            <Label className='mb-0'>End Date</Label>
                                            <Input type="date" onChange={(e) => {setCampaignEndDate(e.target.value)}} value={campaingEndDate} required/>
                                        </div>
                                    </div>
                                ): ""}
                            </div>
                        ) : ""}
                        <div className='col text-right md-3 mt-auto'>
                            <Button color='primary' size='sm'>Create</Button>
                        </div>
                    </div>
                </Form>
            </CardBody>
        </Card>
    )
}

const mapStateToProps = (state) => {
    console.log("CMAPIGN_STATE",state)
    return {
        customerSchema:state.schema.customerSchema,
        mhngAccountList:state.campaigns.mhngAccountList?.rows,
        scheduleSchema:state.schema.scheduleSchema
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        addCustomerCampaign,
        getCustomerSchema,
        getMhngAccountList,
        getScheduleSchema
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CampaignCreate);