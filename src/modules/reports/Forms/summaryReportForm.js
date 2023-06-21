import { useState } from "react";
import { Label, FormGroup, Input, Button } from "reactstrap";
import { DateRangePicker } from "react-dates";
import { searchSummaryReport } from "../action";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import moment from "moment";
import 'react-dates/initialize';



function SummaryReportForm({ searchSummaryReport }) {
  const [focusedInput, setFocusedInput] = useState();
  const [ReportType, setReportType] = useState("1");
  const [ReportTime, setReportTime] = useState("1");
  const [channelSMS, setchannelSMS] = useState("");
  const [channelViber, setchannelViber] = useState("");
  const [channelWhatssapp, setchannelWhatssapp] = useState("");
  const [PromotionalType, setMPromotionalType] = useState("");
  const [TransactionalType, setTransactionalType] = useState("");
  const [date, setDate] = useState([
    {
      startDate: "",
      endDate: "",
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let obj = {
      ReportType: ReportType,
      ReportTime: ReportTime,
      channelSMS: channelSMS,
      channelViber: channelViber,
      channelWhatssapp: channelWhatssapp,
      PromotionalType: PromotionalType,
      TransactionalType: TransactionalType,
      startDate: date.startDate? moment(date.startDate).format("YYYY-MM-DD"): "",
      endDate: date.endDate ? moment(date.endDate).format("YYYY-MM-DD") : "",
    };
    searchSummaryReport(obj);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div class="p-3">
          <div class="pb-1">
            <b>Report Type</b>
          </div>

          <FormGroup check>
            <Input
              type="radio"
              value="1"
              name="type"
              onChange={(e) => setReportType(e.target.value)}
              defaultChecked
            />
            <Label check>Campaign</Label>
          </FormGroup>
          <FormGroup check>
            <Input
              type="radio"
              value="2"
              name="type"
              onChange={(e) => setReportType(e.target.value)}
            />
            <Label check>Account</Label>
          </FormGroup>
          <FormGroup check>
            <Input
              type="radio"
              value="3"
              name="type"
              onChange={(e) => setReportType(e.target.value)}
            />
            <Label check>Sender</Label>
          </FormGroup>
        </div>

        <div class="p-3">
          <div class="pb-1">
            <b>Report Time</b>
          </div>

          <FormGroup check>
            <Input
              type="radio"
              onChange={(e) => setReportTime(e.target.value)}
              value="1"
              name="time"
              defaultChecked
            />
            <Label check>Daily</Label>
          </FormGroup>
          <FormGroup check>
            <Input
              type="radio"
              onChange={(e) => setReportTime(e.target.value)}
              value="2"
              name="time"
            />
            <Label check>Monthly</Label>
          </FormGroup>
          <FormGroup check>
            <Input
              type="radio"
              onChange={(e) => setReportTime(e.target.value)}
              value="3"
              name="time"
            />
            <Label check>Yearly</Label>
          </FormGroup>
        </div>

        <div class="p-3">
          <div class="pb-1">
            <b>Channel Type</b>
          </div>

          <FormGroup check>
            <Input
              type="checkbox"
              value="SMS"
              onChange={(e) => setchannelSMS(e.target.value)}
            />
            <Label check>SMS</Label>
          </FormGroup>
          <FormGroup check>
            <Input
              type="checkbox"
              value="Viber"
              onChange={(e) => setchannelViber(e.target.value)}
            />
            <Label check>Viber</Label>
          </FormGroup>
          <FormGroup check>
            <Input
              type="checkbox"
              value="Whatssapp"
              onChange={(e) => setchannelWhatssapp(e.target.value)}
            />
            <Label check>Whatssapp</Label>
          </FormGroup>
        </div>

        <div class="p-3">
          <div class="pb-1">
            <b>Message Type</b>
          </div>

          <FormGroup check>
            <Input
              type="checkbox"
              value="Promotional"
              onChange={(e) => setMPromotionalType(e.target.value)}
            />
            <Label check>Promotional</Label>
          </FormGroup>
          <FormGroup check>
            <Input
              type="checkbox"
              value="Transactional"
              onChange={(e) => setTransactionalType(e.target.value)}
            />
            <Label check>Transactional</Label>
          </FormGroup>
        </div>

        <div class="p-3">
          <div class="pb-1">
            <b>Date</b>
          </div>

          <div>
          <DateRangePicker
                startDate={date.startDate} // momentPropTypes.momentObj or null,
                endDate={date.endDate} // momentPropTypes.momentObj or null,
                onDatesChange={({ startDate, endDate }) =>
                  setDate({ startDate, endDate })
                } // PropTypes.func.isRequired,
                focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                onFocusChange={(focusedInput) => setFocusedInput(focusedInput)} // PropTypes.func.isRequired,
                isOutsideRange={() => false}
              />
          </div>
        </div>

        {/* <div class="p-3">
          <div class="pb-1">
            <b>User Account</b>
          </div>

          <div>
            <Select />
          </div>
        </div> */}

        <div class="p-3">
          <div class="pb-1">
            <Button color="primary" onSubmit={handleSubmit}>
              Search
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    logReport: state.report.logReport,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      searchSummaryReport,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SummaryReportForm);
