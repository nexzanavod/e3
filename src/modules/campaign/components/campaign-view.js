import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
import BootstrapTable from 'react-bootstrap-table-next';
import { getCampaigns,deleteCampaign,pauseCampaign,stopCampaign,resumeCampaign,startCampaign} from '../actions';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { Button } from 'reactstrap';
import _ from 'lodash';
import Loader from '../../../components/Loader';
import Swal from 'sweetalert2'
import { stringify } from 'query-string';

function CampaignView({ getCampaigns, campaigns, deleteCampaign, stopCampaign, pauseCampaign, resumeCampaign, startCampaign,user }) {
    const history = useHistory();
    const { SearchBar } = Search;
    const [data, setData] = useState([]);

    useEffect(() => {
        getCampaigns();
    }, [getCampaigns])

    useEffect(() => {
        const fetchCampaigns = (campaigns) => {
            let dataObj = {};
            const dataArr = campaigns?.map((camp) => {
                dataObj = camp;
                dataObj.message = camp.content.message;
                dataObj.id = camp._id;
                return dataObj;
            });
            setData(dataArr);
            console.log(dataArr);
        }
        fetchCampaigns(campaigns);
    }, [campaigns])

    const getStatusBadgeColor = (status) => {
        switch (status) {
          case 'ONHOLD':
            return 'badge badge-warning';
          case 'STOPPED':
            return 'badge badge-danger';
          case 'RUNNING':
            return 'badge badge-success';
          default:
            return '';
        }
      };

    console.log("Campagn",campaigns)
    const campaignsDelete = user?.permissions?.[0]?.campaigns?.delete;
    console.log("@@@@@@@@@@@@@@@@@",user?.permissions)
    const columns = [{
        dataField: 'campaign_name',
        text: 'Campaign Name',
        sort: true,
    }, {
        dataField: 'type',
        text: 'Type',
        formatter: (cellContent, row) => (
            _.startCase(cellContent.toLowerCase())
        )
    },
    {
        dataField: 'status',
        text: 'Status',
        formatter: (cellContent, row) => (
            <pre className='wrapped-pre text-center'>
            {cellContent ? <span className={getStatusBadgeColor(cellContent)} style={{ fontSize: '12px' }}>{cellContent}</span> : ''}
          </pre>
        )
    },
    {
        dataField: "id",
        text: "Action",
        classes: "text-right",
        formatter: (cell,row) => (
            <div className='d-flex gap-1 justify-content-center'>
                <Button outline color="primary" size='sm' onClick={() => { rowEvents(cell) }}  title="View Campaign" ><i className='fa fa-eye'></i></Button>
                <Button className={`${row.status === "STOPPED" ? "disabled" :''}`} outline color="success" size='sm' onClick={() => { rowCampaignStop(cell) }} title="Stop Campaign"><i className='fa fa-stop'></i></Button>
                {/* <Button className={`${row.status === "STOPPED" ? "disabled" :''}`} outline color="primary" size='sm' onClick={() => { rowCampaignPause(cell) }} title="Pause Campaign" ><i className='fa fa-pause'></i></Button> */}
                <Button className={`${(row.status === "STOPPED" || row.status === "ONHOLD") ? "disabled" :''}`} outline color="primary" size='sm'    onClick={() => { rowCampaignPause(cell)}} title="Pause Campaign" ><i className='fa fa-pause'></i></Button>
                <Button className={`${(row.status === "STOPPED" || row.status === "RUNNING") ? "disabled" :''}`} outline color="info" size='sm'    onClick={() => { rowCampaignResume(cell,row.type,row.status) }} title="Immediate Start" ><i className='fa fa-play'></i></Button>
                {campaignsDelete && <Button className={`${row.status === "STOPPED" ? "disabled" :''}`} outline color="danger" size='sm' onClick={() => { rowCampaignDelete(cell) }}  title="Delete Campaign"><i className='fa fa-trash'></i></Button>}
            </div>
        ),
        sort: true,
    }];
    const rowCampaignResume = (id,campaignType,campaignStatus) =>{
        let typeObj = {
            type: campaignType
        }

        if(campaignStatus === "STOPPED"){
            Swal.fire({
                title: '',
                text: "Your campaign has been stopped",
                icon: 'error',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Okay'
            });
        }else{
            Swal.fire({
                title: '',
                text: "Do you want to start the campaign?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, resume it!'
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire(
                    'Started',
                    'Campaign Started Successfully',
                    'success'
                  ).then((result2) => {
                    if(result2){
                        resumeCampaign(id);
                        startCampaign(id,typeObj)
                        window.location.reload('/campaigns')
                    }
                  })
                }
            })
        }
    }
    const rowCampaignPause = (id) =>{
        Swal.fire({
            title: '',
            text: "Do you want to pause the campaign?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, pause it!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Hold',
                'Campaign Hold Successfully',
                'success'
              ).then((result2) => {
                if(result2){
                    pauseCampaign(id)
                    window.location.reload('/campaigns')
                }
              })
            }
        })
    }
    const rowCampaignStop = (id) =>{
        Swal.fire({
            title: '',
            text: "Do you want to stop the campaign?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, stop it!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Stopped',
                'Campaign Stopped Successfully',
                'success'
              ).then((result2) => {
                if(result2){
                    stopCampaign(id)
                    window.location.reload('/campaigns')
                }
              })
            }
        })
    }
    const rowEvents = (id) => {
        history.push({
            pathname: `/campaigns/view`,
            search: `?campaignId=${id}`
        })
    };
    const rowCampaignDelete = (id) =>{
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to delete a campaign?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Deleted!',
                'Campaign Deleted Successfully',
                'success'
              ).then((result2) => {
                if(result2){
                    deleteCampaign(id)
                    history.push('/campaigns')
                }
              })
            }
        })
    }
    if(!data){
        return <Loader />;
    }
    return (
        <div className='card'>
            <ToolkitProvider
                keyField="id"
                columns={columns}
                data={data}
                search={{
                    searchFormatted: true
                }}
            >
                {
                    props => (
                        <div className='m-4'>
                            <div className='d-flex justify-content-between'>
                                <SearchBar {...props.searchProps} />

                            </div>
                            <BootstrapTable
                                classes={"tbl-striped table table-bordered table-hover"}
                                bordered={false}
                                {...props.baseProps}
                            />
                        </div>
                    )
                }
            </ToolkitProvider>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        campaigns: state.campaigns.campaigns
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getCampaigns,
        deleteCampaign,
        pauseCampaign,
        stopCampaign,
        resumeCampaign,
        startCampaign
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CampaignView);