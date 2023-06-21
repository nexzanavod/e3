
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Table } from "reactstrap";

function SummaryReportView({  summaryReport }) {



  return (
    <div>

{summaryReport?.length>0?
    
     
     <Table hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Name/Sender</th>
            <th>Channel</th>
            <th>Msg Type</th>
            <th>Sent</th>
            <th>Failed</th>
            <th>Delivered</th>
            <th>Delivery failed</th>
            <th>Pending for delivery</th>
          </tr>
        </thead>
        <tbody>
          {summaryReport?.map((contact) => (
            <tr>
              <td>{contact.datass.sortDate}</td>
              <td>{contact.datass.campaignName}</td>
              <td>{contact.datass.channel}</td>
              <td>{contact.datass.messageType}</td>
              <td>{contact.send}</td>
              <td>{contact.failed}</td>
              <td>{contact.delivered}</td>
              <td>{contact.deliveryFailed}</td>
              <td>{contact.reason}</td>
            </tr>
          ))}
        </tbody>
      </Table>  
       :<b>no data</b>
     
    }
     
     
      
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    summaryReport: state.report.summaryReportData?.data,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
     
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SummaryReportView);
