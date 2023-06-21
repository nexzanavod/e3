import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Well from "../../../components/Well";
import Page from "../../../components/Page";
import {
  Col,
  Row,
} from "reactstrap";
import InboxReportForm from "../Forms/inboxReportForm";

function InboxReport() {
  return (
    <Page title="Inbox Reports">
      <div>
        <Row>
          <Col md="3">
            <div>
              <Well bg={"bg-white"} title={"Filter"}>

             <InboxReportForm />


                
              </Well>
            </div>
          </Col>
          <Col md="9">
            <div>
              <Well bg={"bg-white"} >



                
              </Well>
            </div>
          </Col>
        </Row>
      </div>
    </Page>
  );
}

const mapStateToProps = (state) => {
  return {};
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InboxReport);
