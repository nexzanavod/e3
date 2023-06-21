import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCampaigns } from '../actions';

function CampaignsDropDown({ campaigns, getCampaigns, onChange, value }) {
    const [options, setOptions] = useState();

    useEffect(() => {
        getCampaigns();
    }, [getCampaigns])

    useEffect(() => {
        const fetchEvents = () => {
            const campaignArr = campaigns?.map((dt) => {
                console.log(dt)
                let dataObj = {};
                dataObj.value = dt._id;
                dataObj.label = dt.campaign_name;
                return dataObj;
            })
            setOptions(campaignArr);
        }
        fetchEvents();
    }, [campaigns])

    return (
        <Select
            options={options}
            onChange={(e) => {onChange(e)}}
        />
    )
}

const mapStateToProps = (state) => {
    return {
        campaigns: state.campaigns.campaigns,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getCampaigns
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CampaignsDropDown);