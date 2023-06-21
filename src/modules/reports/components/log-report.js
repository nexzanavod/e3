import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Well from "../../../components/Well";
import Page from "../../../components/Page";
import {
  Col,
  Row,
} from "reactstrap";
import LogReportForm from "../Forms/logReportForm";
import LogReportView from "../Table/logReportView";
import {getReportData} from '../../../utils/reportData';
import { searchLogReport } from "../action";


function LogReports({logReport }) {




  const actions = [
    {
        label: "Downlod",
        ...getReportData(logReport),
        type:"download"

      
    },   
];

  return (
    <Page title="Log Reports" actions={actions}>
      <div>
        <Row>
          <Col md="3">
            <div>
              <Well bg={"bg-white"} title={"Filter"}>

              <LogReportForm />


                
              </Well>
            </div>
          </Col>
          <Col md="9">
            <div>
              <Well bg={"bg-white"} >

              <LogReportView />

                
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
    logReport: state.report.logReportData?.data?.rows,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    searchLogReport,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LogReports);
