import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Well from "../../../components/Well";
import Page from "../../../components/Page";
import {
  Col,
  Row,
} from "reactstrap";
// import DropDown from "../../customer/components/dropdown";
// import Select from "react-select";
import SummaryReportForm from "../Forms/summaryReportForm";
import SummaryReportView from "../Table/summaryReportView";
import {getReportData} from '../../../utils/reportData';
function SummaryReport({summaryReport}) {

  const actions = [
    {
        label: "Downlod",
        ...getReportData(summaryReport),
        type:"download"

      
    },   
];

  return (
    <Page title="Summary Reports" actions={actions}>
      <div>
        <Row>
          <Col md="3">
            <div>
              <Well bg={"bg-white"} title={"Filter"}>


            <SummaryReportForm />


                
              </Well>
            </div>
          </Col>
          <Col md="9">
            <div>
              <Well bg={"bg-white"} >


              <SummaryReportView />

                
              </Well>
            </div>
          </Col>
        </Row>
      </div>
    </Page>
  );
}

const mapStateToProps = (state) => {
  return {
    summaryReport: state.report.summaryReportData?.data,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SummaryReport);
