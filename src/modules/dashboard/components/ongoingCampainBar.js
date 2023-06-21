import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Card, CardHeader, ListGroup, CardBody } from "reactstrap";
import OngoingCampainProgressBar from "./ongoingCampainProgressBar";
import { getDashboardCampaigns } from "../action";
import { getCampaigns,deleteCampaign,pauseCampaign,stopCampaign,resumeCampaign,startCampaign} from '../../campaign/actions';



function OngoingCampainBar({ getCampaigns, campaigns }) {

  useEffect(() => {
    getCampaigns();
}, [getCampaigns])


  return (
    <Card>
      <CardHeader>Recent Campaigns</CardHeader>
      <CardBody className="widget-h-100">
        <ListGroup flush>
          {campaigns?.map((Campaigns) => (
            <OngoingCampainProgressBar Campaigns={Campaigns} />
          ))}
        </ListGroup>
      </CardBody>
    </Card>
  );
}

const mapStateToProps = (state) => {
  return {
    campaigns: state.campaigns.campaigns

  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getCampaigns,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(OngoingCampainBar);
