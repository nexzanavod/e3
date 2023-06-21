import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LogReport from "../components/log-report";
import 'react-dates/initialize';



function Reports() {

  return (

     <div>
        <LogReport />
     </div>
    
  );
}

const mapStateToProps = (state) => {
  return {
    
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Reports);
