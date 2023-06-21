import React, { useRef } from 'react'
import { useState } from 'react';
import { TabContent, TabPane } from 'reactstrap';
import SegmentCampaign from './segment/segment-campaign';
import SheduleCampaign from './shedule/shedule-campaign';
import NumberCampaign from './contacts/number-campaign';
import UploadContactsCampaign from './contacts/upload-contacts-campaign';
import Well from '../../../components/Well';
import EventCreate from './event/event-create';
const SEGMENT_BASED_CAMPAIGN = "SEGMENT_BASED_CAMPAIGN";
const EVENT_BASED_CAMPAIGN = "EVENT_BASED_CAMPAIGN";
const SCHEDULE_BASED_CAMPAIGN = "SCHEDULE_BASED_CAMPAIGN";

function CampaignTabs({onSelect,onRemove,onChange,onEventChange,onEventSegmentSelect, setSchedulePayload,setHandleCampaignType}){
    const [activeTab, setActiveTab] = useState();
    const [showTypes, setShowTypes] = useState(true);
    const childRef = useRef();
    const childRefEvent = useRef();
    const childRefSegment = useRef();
    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
        setShowTypes(false)
        console.log(typeof tab);
        if(tab === "1"){
            setHandleCampaignType(SEGMENT_BASED_CAMPAIGN)
            childRefEvent.current.eventClearState()
            childRef.current.scheduleClearState()
        }else if(tab === "2"){
            setHandleCampaignType(EVENT_BASED_CAMPAIGN)
            childRefSegment.current.segmentClearState()
            childRef.current.scheduleClearState()
        }else{
            setHandleCampaignType(SCHEDULE_BASED_CAMPAIGN)
            childRefEvent.current.eventClearState()
            childRefSegment.current.segmentClearState()
        }
    }
    const tabs = {
        "1": {
            label: "Bulk Campaign",
            desciption: "Send the message to one or multiple customers segments.",
            icon: "fa-group"
        },
        "2": {
            label: "Event Based",
            desciption: "Automatically send the message when the customers performing an event. Ex: Payment Confirmation.",
            icon: "fa-check"
        },
        "3": {
            label: "Schedule Based",
            desciption: "Automatically send the message based on a customer specific schedule. Ex: Birthday Wish or Payment Reminders.",
            icon: "fa-clock-o"
        },
        // "4": {
        //     label: "Upload Contacts",
        //     desciption: "Send the message to customers by uploading a number list in CSV or Text file.",
        //     icon: "fa-upload"
        // },
        // "5": {
        //     label: "Simple Campaign",
        //     desciption: "Send the message to customers by manually adding the contact details.",
        //     icon: "fa-keyboard-o"
        // }
    }

    const tabsClickHandle = (tab) =>{
        setShowTypes(true)
        if(tab === "1"){
            setHandleCampaignType("")
        }else if(tab === "2"){
            setHandleCampaignType("")
        }else{
            setHandleCampaignType("")
        }
    }
    const renderType = (key, onClick) => (
        <div onClick={onClick} className={`p-2 rounded d-flex cursor ${key === activeTab ? "bg-white" : ""}`}>
            <h1 style={{ width: 60 }} className='pe-3'>
                <i className={`fa ${tabs[key].icon}`}></i>
            </h1>
            <div>
                <b>{tabs[key].label}</b><br />
                <small>{tabs[key].desciption}</small>
            </div>
        </div>
    )

    return (
        <div>
            <Well title={"Campaign Type"}>
                {!showTypes ? renderType(activeTab, () => {tabsClickHandle(activeTab)}) : ""}
                {showTypes ?
                    Object.keys(tabs).map((key) => (
                        renderType(key, () => { toggle(key) })
                    ))
                    : ""}
            </Well>
            <TabContent activeTab={activeTab}>
                <TabPane className='p-0' tabId="1">
                    <SegmentCampaign  onSelect={onSelect} onRemove={onRemove} type={SEGMENT_BASED_CAMPAIGN} ref={childRefSegment} />
                </TabPane>
                <TabPane className='p-0' tabId="2">
                    <EventCreate ref={childRefEvent} onChange={onChange} onEventChange={onEventChange} onEventSegmentSelect={onEventSegmentSelect} type={EVENT_BASED_CAMPAIGN}  />
                </TabPane>
                <TabPane tabId="3">
                    <SheduleCampaign ref={childRef} setSchedulePayload={setSchedulePayload} type={SCHEDULE_BASED_CAMPAIGN} />
                </TabPane>
                {/* <TabPane tabId="4">
                    <UploadContactsCampaign />
                </TabPane>
                <TabPane tabId="5">
                    <NumberCampaign />
                </TabPane> */}
            </TabContent>
        </div>
    )
}

export default CampaignTabs