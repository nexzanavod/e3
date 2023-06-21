import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { searchLogReport } from "../action";
import { Table } from "reactstrap";

function LogReportView({ searchLogReport, logReport }) {

  

  return (
    <div>
     {logReport?.length>0?
     
     <Table hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Campaign</th>
            <th>Mobile Number</th>
            <th>Sender ID</th>
            <th>Message</th>
            <th>Channel</th>
            <th>Message Status</th>
            <th>Delivery Status</th>
            <th>reason</th>
          </tr>
        </thead>
        <tbody>
          {logReport?.map((contact) => (
            <tr>
              <td>{contact.createdDateTime}</td>
              <td>{contact.campaignName}</td>
              <td>{contact.to}</td>
              <td>{contact.from}</td>
              <td>{contact.content}</td>
              <td>{contact.channel}</td>
              <td>{contact.status}</td>
              <td>{contact.deliveryStatus}</td>
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
    logReport: state.report.logReportData?.data?.rows,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      searchLogReport,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(LogReportView);
