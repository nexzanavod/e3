import React, { useEffect, useState } from 'react'
import Well from '../../../components/Well';
import { FaViber, FaSms, FaWhatsapp } from 'react-icons/fa';
import  Select from 'react-select';
import { FormGroup, Input, Label } from 'reactstrap';
import { getMhngSmsSenderIds,getMhngViberSenderIds,getMhngWhatsAppSenderIds } from '../actions';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import Swal from 'sweetalert2';
import { assign } from 'lodash';

function CampaignChannels({onChange,onChangeAllSelectedChannel,accountId,getMhngSmsSenderIds,getMhngViberSenderIds,getMhngWhatsAppSenderIds,sms_sender_id,viber_sender_id,whatsapp_sender_id}) {
    const [selectedChannels, selectChannels] = useState([]);
    const [radioBtnCheck, setRadioBtnCheck] = useState(false);
    const [channelValues, setChannelValues] = useState([])
    const [smsChannelIds,setSmsCheannelId] = useState([]);
    const [viberChannelIds,setViberCheannelId] = useState([]);
    const [whatsappChannelIds,setWhatsappCheannelId] = useState([]);
    const [smsOrder,setSmsOrder] = useState(0);
    const [viberOrder,setviberOrder] = useState(0);
    const [whatsAppOrder,setWhatsAppOrder] = useState(0);
    const handleCheckbox = (value) => {
        if(accountId != undefined){
            let objParams = {
                accountId:accountId
            }
            if(value === "sms"){
                getMhngSmsSenderIds(objParams);
            }else if(value === "viber"){
                getMhngViberSenderIds(objParams);
            }else if(value === "whatsapp"){
                getMhngWhatsAppSenderIds(objParams);
            }
            if (selectedChannels.indexOf(value) === -1) {
                selectChannels([...selectedChannels, value])
            } else {
                selectChannels([...selectedChannels.filter((e) => e !== value)])
                setChannelValues([...channelValues.filter((dt) => dt.channel !== value)])

            }
        }else{
            Swal.fire({
                icon: 'info',
                title: 'Account Not Choosen',
                text: 'Please choose the account'
            })
        }
    }

    useEffect(() =>{
        let arrOptions = []
        sms_sender_id?.map((dt) =>{
            let obj = {
                value:dt,
                label:dt
            }
            arrOptions.push(obj)
        })
        setSmsCheannelId(arrOptions)
    },[sms_sender_id])

    useEffect(() =>{
        let arrOptions = []
        viber_sender_id?.map((dt) =>{
            let obj = {
                value:dt,
                label:dt
            }
            arrOptions.push(obj)
        })
        setViberCheannelId(arrOptions)
    },[viber_sender_id])

    useEffect(() =>{
        let arrOptions = []
        whatsapp_sender_id?.map((dt) =>{
            let obj = {
                value:dt,
                label:dt
            }
            arrOptions.push(obj)
        })
        setWhatsappCheannelId(arrOptions)
    },[whatsapp_sender_id])
    
    // useEffect(() =>{
    //     let objParams = {
    //         accountId:accountId
    //     }
    //     getMhngSmsSenderIds(objParams);
    //     getMhngViberSenderIds(objParams);
    //     getMhngWhatsAppSenderIds(objParams);
    // },[getMhngSmsSenderIds,getMhngViberSenderIds,getMhngWhatsAppSenderIds,accountId])
    // const customStyles = {
    //     menu: (provided, state) => ({
    //         ...provided,
    //         width: state.selectProps.width,
    //         borderBottom: '1px dotted pink',
    //         padding: '10px',
    //     })
    // }

    const channels = {
        sms: { icon: <FaSms />, action: "", color: "#207fff" },
        whatsapp: { icon: <FaWhatsapp />, action: "", color: "#28D146" },
        viber: { icon: <FaViber />, action: "", color: "#7360F2" }
    };

    const orders = [
        {value:"0",label:"order"},
        {value:"1",label:"1"},
        {value:"2",label:"2"},
        {value:"3",label:"3"}
    ]

    const handleChannels = (type,data) =>{
        if(data){
            let channelObj = {
                channel:type,
                id:data,
                order:0
            }
            setChannelValues([...channelValues,channelObj])
        }   
    }

    const handleOrders = (value,type) =>{
        if(type === 'sms'){
            if(viberOrder === value){
                channelValues && channelValues.map((dt) =>{
                    if(dt.channel === type){
                        dt.order = value
                    }
                })
                setSmsOrder(value)
                setviberOrder(0)
            }else if(whatsAppOrder === value){
                channelValues && channelValues.map((dt) =>{
                    if(dt.channel === type){
                        dt.order = value
                    }
                })
                setSmsOrder(value)
                setWhatsAppOrder(0)
            }else{
                setSmsOrder(value)
            }
        }else if(type === 'viber'){
            if(smsOrder === value){
                channelValues && channelValues.map((dt) =>{
                    if(dt.channel === type){
                        dt.order = value
                    }
                })
                setviberOrder(value)
                setSmsOrder(0)
            }else if(whatsAppOrder === value){
                channelValues && channelValues.map((dt) =>{
                    if(dt.channel === type){
                        dt.order = value
                    }
                })
                setviberOrder(value)
                setWhatsAppOrder(0)
            }else{
                setviberOrder(value)
            }
        }else{
            if(smsOrder === value){
                channelValues && channelValues.map((dt) =>{
                    if(dt.channel === type){
                        dt.order = value
                    }
                })
                setWhatsAppOrder(value)
                setSmsOrder(0)
            }else if(viberOrder === value){
                channelValues && channelValues.map((dt) =>{
                    if(dt.channel === type){
                        dt.order = value
                    }
                })
                setWhatsAppOrder(value)
                setviberOrder(0)
            }else{
                setWhatsAppOrder(value)
            }
        }
    }

    const handleAllChannelSelected = (value,status) =>{
        if(value === 'priority'){
            onChangeAllSelectedChannel(false)
        }else{
            onChangeAllSelectedChannel(true)
        }
        setRadioBtnCheck(status)
    }

    useEffect(() =>{
        onChange(channelValues);
    },[channelValues])

    return (
        <Well title={"Channels"}>
            {/* <Nav vertical pills>
                    <NavItem className='d-flex gap-0' >
                        {Object.keys(channels).map((a) =>
                            <NavLink
                                // className={classnames({ active: activeTab === '1' })}
                                style={{cursor:'pointer'}}
                                // onClick={() => { toggle('1'); }}
                            >
                                <div onClick={() => handleCheckbox(a)} style={{ backgroundColor: selectedChannels.indexOf(a) === -1 ? "#c6c8ca" : channels[a].color }} className="rounded p-1 cursor">
                                    <h5 className='m-0 pb-1' style={{ color: "#fff" }}>{channels[a].icon}</h5>
                                </div>
                            </NavLink>
                        )} 
                    </NavItem>
            </Nav> */}
            <div className='d-flex gap-4 align-items-center justify-content-between'>
                <div className='d-flex gap-2 flex-column  w-100'>
                    {Object.keys(channels).map((a) =>
                        <div className='d-flex gap-2'>
                            <div onClick={() => handleCheckbox(a)} style={{ backgroundColor: selectedChannels.indexOf(a) === -1 ? "#c6c8ca" : channels[a].color }} className="rounded p-1 cursor">
                                <h5 className='m-0 px-1 pb-1 w-50' style={{ color: "#fff" }}>{channels[a].icon}</h5>
                            </div>
                            <div className="w-50">
                                <Select  
                                    options={a === "sms" && smsChannelIds?smsChannelIds:a === "viber" && viberChannelIds ?viberChannelIds:a === "whatsapp" && whatsappChannelIds ?whatsappChannelIds:""}
                                    isDisabled={(smsChannelIds || viberChannelIds || whatsappChannelIds) ? selectedChannels.indexOf(a) === -1 ? true : false: false}
                                    onChange={(e) => {handleChannels(a,e.value)}}
                                    // value={a === "sms"?smsChannelIds:""}
                                /> 
                            </div>  
                            <div className={`w-50 ${radioBtnCheck ? 'd-block' :'d-none'}`}>
                                <Select 
                                    options={selectedChannels.length > 1 ? orders:""}
                                    isDisabled={selectedChannels.indexOf(a) === -1 ? true : false}
                                    onChange={(e) => {handleOrders(e.value,a)}}
                                    value={orders.filter(function (option) {
                                        return option.value === (a === "sms"?smsOrder:a === "viber"?viberOrder:a === "whatsapp"?whatsAppOrder:"");
                                    })}
                                    getOptionValue={option => option['value']}
                                    getOptionLabel={option => option['label']}
                                /> 
                            </div>
                        </div>
                    )}
                </div>
                <div className='d-flex flex-column w-50'>
                    <FormGroup check inline>
                        <Label check>
                            <Input type='radio' checked={!radioBtnCheck} id='all_channel' name="t" value="all" onClick={(e) => {handleAllChannelSelected(e.target.value,false)}} /> Send to all select channel
                        </Label>
                    </FormGroup>
                    <FormGroup check inline>
                        <Label check>
                            <Input type='radio' checked={radioBtnCheck} id='priority_channel' name="t" value="priority" onClick={(e) => {handleAllChannelSelected(e.target.value,true)}} /> Send to next channel if one channel got failed
                        </Label>
                    </FormGroup>
                </div>
            </div>
        </Well >
    )
}

const mapStateToProps = (state) =>{
    return {
        sms_sender_id:state.campaigns.sms_sender_id,
        viber_sender_id:state.campaigns.viber_sender_id,
        whatsapp_sender_id:state.campaigns.whatsapp_sender_id
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getMhngSmsSenderIds,
        getMhngViberSenderIds,
        getMhngWhatsAppSenderIds
    },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(CampaignChannels);