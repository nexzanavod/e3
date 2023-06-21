import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Button, Card, CardBody, CardHeader, CardText } from 'reactstrap'
import { getCampaignsById, pauseCampaign, resumeCampaign, startCampaign, stopCampaign } from '../actions';
import { bindActionCreators } from 'redux';
import { useHistory, useLocation } from 'react-router';
import queryString from 'query-string';
import _ from 'lodash';
import cronstrue from 'cronstrue';
import { getSegments } from '../../segment/actions';
import Swal from 'sweetalert2'
const { Utils, BasicConfig } = require("react-awesome-query-builder");

function CampaignsPreview({ getCampaignsById, campaignDetail, startCampaign, segments, getSegments, pauseCampaign, resumeCampaign, stopCampaign }) {
    const [campaignName, setCamapignName] = useState("");
    const [message, setMessage] = useState("");
    const [automation, setAutomation] = useState();
    const history = useHistory();
    const { search } = useLocation();
    const { campaignId } = queryString.parse(search);
    const [campaignType, setCampaignType] = useState("");

    useEffect(() => {
        if (campaignId) {
            getCampaignsById(campaignId)
        }
    }, [campaignId, getCampaignsById]);

    useEffect(() => {
        getSegments();
    }, [getSegments])

    useEffect(() => {
        console.log("CAMPAIGN DETAIL", campaignDetail);
        if (campaignDetail) {
            setCamapignName(campaignDetail.campaign_name)
            setMessage(campaignDetail.content ? campaignDetail.content.message : "")
            setAutomation(campaignDetail.automation ? campaignDetail.automation : "")
            setCampaignType(campaignDetail.type)
            delete campaignDetail.automation?.trigger
        }
    }, [campaignDetail])

    const handleStartCampaign = () => {
        let typeObj = {
            type: campaignType
        }
        resumeCampaign(campaignId)
        startCampaign(campaignId, typeObj, (err) => {
            if (err) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Message sending failed'
                })
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Campaign Started Successfully'
                }).then(() => {
                    history.push('/campaigns', { forceRefresh: true });
                })
            }
        })
    }

    const queryBuilderHumanRead = (obj) =>{
        console.log("BASIC CONFIG CAMPAIGN PRE",BasicConfig)
        let immutable = Utils.loadTree(obj);
        console.log("Immutable222",immutable);
        let humanRead = Utils.queryString(immutable, {...BasicConfig});
        return humanRead;
    }

    const   objToTbl = (obj) => {
        return <table>
            {Object.keys(obj).map(key => (
                <tr>
                    <td className='text-capitalize pe-3'>{key}</td>
                    <th className='text-uppercase'>{key === "time" ? cronstrue.toString(obj[key]) : key === "segment" ? _.find(segments, { _id: obj[key] })?.name :key === "condition" ? queryBuilderHumanRead(obj[key]) ? queryBuilderHumanRead(obj[key]) :"No Condition" : obj[key]}</th>
                </tr>
            ))}
        </table>
    }

    const pause = (id) =>{
        Swal.fire({
            title: '',
            text: "Are you want to pause the campaign?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, pause it!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Hold',
                'Campaign Hold Successful',
                'success'
              ).then((result2) => {
                if(result2){
                    pauseCampaign(id)
                    history.push('/campaigns')
                }
              })
            }
        })
    }

    const stop = (id) =>{
        Swal.fire({
            title: '',
            text: "Are you want to stop the campaign?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, stop it!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Stopped',
                'Campaign Stopped Successful',
                'success'
              ).then((result2) => {
                if(result2){
                    stopCampaign(id)
                    history.push('/campaigns')
                }
              })
            }
        })
    }

    return (
        <Card className='m-4'>
            <CardHeader>Campaign Preview</CardHeader>
            <CardBody>
                <div className='d-flex align-items justify-content-between'>
                    <div className='d-flex align-items-center gap-2'>
                        <h3 className='badge badge-success p-2' style={{fontSize:'15px'}}>{campaignDetail.status}</h3>
                        <h3>{campaignName}</h3>
                    </div>
                    {campaignDetail.status != "STOPPED" ? (
                        <div className='d-flex align-items-center gap-2 pb-2'>
                            {campaignDetail.status === "RUNNING" ? (
                                <>
                                    <Button  size='m' className='btn-light' onClick={() => {pause(campaignId)}}><i className='fa fa-pause'></i> Pause</Button>
                                    <Button color='danger' size='m' onClick={() => {stop(campaignId)}} ><i className='fa fa-stop'></i> Stop</Button>
                                </>
                            ): (
                                <>
                                    <Button color='primary' size='m' onClick={handleStartCampaign}><i className='fa fa-check'></i> Start</Button>
                                    <Button color='danger' size='m'  ><i className='fa fa-stop'></i> Stop</Button>
                                </>
                            )}
                        </div>
                    ): ""}
                </div>
                <CardText className='bg-light w-100 p-3'>
                    <pre>{message}</pre>
                </CardText>
                <h5>{_.startCase(campaignDetail?.type?.toLowerCase())}</h5>
                {
                    _.isEmpty(campaignDetail.schedule) || campaignDetail.type !== "SCHEDULE_BASED_CAMPAIGN" ? "" : objToTbl(campaignDetail.schedule)
                }
                {
                    _.isEmpty(campaignDetail.segments) || campaignDetail.type !== "SEGMENT_BASED_CAMPAIGN" ? "" : campaignDetail.segments.map((_id => (<div className='py-1 px-3 bg-light rounded mb-1'>{_.find(segments, { _id })?.name}</div>)))
                }
                {
                    _.isEmpty(campaignDetail.automation) || campaignDetail.type !== "EVENT_BASED_CAMPAIGN" ? "" : objToTbl(campaignDetail.automation)
                }
            </CardBody>
            {campaignDetail.active ?
                automation && !Object.keys(automation).length > 0 ?
                (
                    // <CardBody className='text-right'>
                    //     <Button color='primary' size='sm' onClick={handleStartCampaign}>Start Campaign</Button>
                    ""
                    // </CardBody>
                ) : ""
                : (<CardBody className='text-center bg-danger p-0'>
                        <p color='black' size='sm' className='h5 p-1' ><b>Campaign Inactived</b></p>
                    </CardBody>)
            }

        </Card>
    )
}

const mapStateToProps = (state) => {
    return {
        campaignDetail: state.campaigns.campaign,
        segments: state.segments.segments
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getCampaignsById,
        startCampaign,
        getSegments,
        pauseCampaign,
        resumeCampaign,
        stopCampaign
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CampaignsPreview);