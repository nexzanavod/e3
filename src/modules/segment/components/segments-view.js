import React, { useEffect, useState } from 'react'
import { getSegments, deleteSegment,getCustomersCountBySegment } from '../actions';
import { campaignActiveInactive, getCampaignsCountBySegment } from '../../campaign/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, ListGroup, ListGroupItem } from 'reactstrap';
import { useHistory, useLocation } from 'react-router';
import queryString from 'query-string';
import Swal from 'sweetalert2';
const BASIC_SEGMENT = "BASIC_SEGMENT";
const RULED_SEGMENT = "RULED_SEGMENT";

function SegmentView({ getSegments, segments=[], onSelect, deleteSegment,getCustomersCountBySegment,customersCountBySegment,getCampaignsCountBySegment,campaignsCountBySegment,campaignActiveInactive,user}) {
    const history = useHistory();
    const [selected, select] = useState();
    const {search} = useLocation();
    const {segment,segmentId} = queryString.parse(search)

    useEffect(() => {
        getSegments();
        if(segment || segmentId){
            select(segment || segmentId);
        }
    }, [getSegments,segment,segmentId])

    useEffect(() => {
        segments.forEach((dt) => {
            if(dt.count === undefined){
                getCustomersCountBySegment(dt._id)
                getCampaignsCountBySegment(dt._id)
            }
        })
    }, [segments,getCustomersCountBySegment,getCampaignsCountBySegment])

    const getCustomersBySegment = (id,type) => {
        history.push({
            pathname: '/segments/customers',
            search: `?segment=${id}&type=${type}`
        })
    }

    const removeSegment = (id,campaignCount) => {
        if(campaignCount > 0 ){
            Swal.fire({
                    title: 'Are you sure delete & inactive?',
                    text: `Segment will be delete and Assigned ${campaignCount > 1 ? 'campaigns' : 'campaign'} will be inactive`,
                    icon: 'info',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, Do it!'
            }).then((result2) => {
                if(result2.isConfirmed){
                    Swal.fire(
                        'Deleted & Inactived!',
                        `Segment Deleted & ${campaignCount > 1 ? 'campaigns' : 'campaign'} Inactived Successfully`,
                        'success'
                    ).then((result2) => {
                        if(result2){
                        campaignActiveInactive({segmentId:id})
                        // deleteSegment(id)
                        history.push('/segments')
                        }
                    })
                }
            })
        }else{
            Swal.fire({
                title: 'Are you sure?',
                text: "Do you want to delete this segment?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes'
            }).then((result) => {
                if(result.isConfirmed){
                    Swal.fire(
                        'Deleted!',
                        'Segment Deleted Successful',
                        'success'
                    ).then((result2) => {
                        if(result2){
                        deleteSegment(id)
                        history.push('/segments')
                        }
                    })
                }
            })
        }
    }

    const editSegment = (id,type) =>{
        history.push({
            pathname:'/segments',
            search:`?segmentId=${id}&type=${type}`
        })
    }

    const uploadCustomers = (id,type) =>{
        history.push({
            pathname:'/customer/bulkupload',
            search:`?segmentId=${id}&type=${type}`
        })
    }

    const segmentsEdit = user?.permissions?.[0]?.segments?.edit;
    const segmentsDelete = user?.permissions?.[0]?.segments?.delete;

    // const getCustomerCount = (id) =>{
    //     getCustomersCountBySegment(id)
    //     return 
    // }

    return (
        <ListGroup flush className='menu-list-group' >
            {segments.map((row) => <ListGroupItem active={selected === row._id} key={row._id} onClick={() =>{select(row._id)} }  className='d-flex align-items-center justify-content-between'>
                <div className='segment-list-view'  onClick={() => getCustomersBySegment(row._id,row.type)} >
                    <p className={`mb-0 ${selected === row._id ? "" : "event-title"}`} >{row.name}</p>
                    <div className='d-flex'>
                        {customersCountBySegment[row._id] ? <div className='h5 mb-0 me-2'>{customersCountBySegment[row._id]} <span className={`h6  ${selected === row._id ? "" : "text-muted"}`} size="sm">customers</span></div>: ""}
                        {campaignsCountBySegment[row._id] ? <div className='h5 mb-0'>{campaignsCountBySegment[row._id]} <span className={`h6  ${selected === row._id ? "" : "text-muted"}`} size="sm">campaigns</span></div>: ""}
                    </div>
                </div>
                <span className='list-item-buttons ms-2 p-1 capsule bg-white gap-1' >
                    <Button outline color='primary' size='xs' onClick={() => getCustomersBySegment(row._id,row.type)} ><i className='fa fa-eye'></i></Button>
                    {segmentsEdit && (<Button outline color='primary' size='xs' onClick={() => editSegment(row._id, row.type)}><i className='fa fa-pencil'></i></Button>)}

                    {row.type === BASIC_SEGMENT ? <Button outline color='primary' size='xs' onClick={() => uploadCustomers(row._id,row.type)} ><i className='fa fa-upload'></i></Button> : ""}
                    {segmentsDelete && (<Button outline color='danger' size='xs' onClick={() => removeSegment(row._id,campaignsCountBySegment[row._id])}><i className='fa fa-trash'></i></Button>)}
                </span>
            </ListGroupItem>)}
        </ListGroup>
    )
}


const mapStateToProps = (state) => {
    return {
        segments: state.segments.segments,
        customersCountBySegment:state.segments.customersCountBySegment,
        campaignsCountBySegment:state.campaigns.campaignsCountBySegment,
        user: state.users.user,

    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getSegments,
        deleteSegment,
        getCustomersCountBySegment,
        getCampaignsCountBySegment,
        campaignActiveInactive
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SegmentView);