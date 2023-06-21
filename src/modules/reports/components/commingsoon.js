import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Page from "../../../components/Page";
import { searchLogReport } from "../action";


function Commingsoon({logReport }) {




  return (
    <Page>
     <section>
  <div class="commingsoon">
    <h3>COMING SOON...</h3>
    <h3>COMING SOON...</h3>
  </div>
</section>
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

export default connect(mapStateToProps, mapDispatchToProps)(Commingsoon);
