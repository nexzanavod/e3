import { useState} from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  Label,
  FormGroup,
  Input,
  Button,
} from "reactstrap";
import Select from "react-select";
import { DateRangePicker } from "react-dates";
import { searchLogReport } from "../action";
import moment from "moment";


function LogReportForm({ searchLogReport, logReport }) {
  const [focusedInput, setFocusedInput] = useState();

  const [date, setDate] = useState([
    {
      startDate: "",
      endDate: "",
    },
  ]);
  const [channelSMS, setchannelSMS] = useState("");
  const [channelViber, setchannelViber] = useState("");
  const [channelWhatssapp, setchannelWhatssapp] = useState("");
  const [PromotionalType, setMPromotionalType] = useState("");
  const [TransactionalType, setTransactionalType] = useState("");
  const [userAccount] = useState("");
  const [messageStatus, setMessageStatus] = useState("All");



  const handleSubmit = (e) => {
    e.preventDefault();

    let obj = {
      channelSMS: channelSMS,
      channelViber: channelViber,
      channelWhatssapp: channelWhatssapp,
      PromotionalType: PromotionalType,
      TransactionalType: TransactionalType,
      userAccount: userAccount.value,
      messageStatus: messageStatus.value,
      startDate: date.startDate ? moment(date.startDate).format('YYYY-MM-DD') : '',
      endDate: date.endDate ? moment(date.endDate).format('YYYY-MM-DD') : ''
    };
    searchLogReport(obj);

  };


  const MessageStatusOption = [
    { value: "all", label: "All" },
    { value: "sent", label: "Sent" },
    { value: "failed", label: "Failed" },
    { value: "delevierd", label: "Delevierd" },
    { value: "undelevierd", label: "Undelevierd" },
  ];

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
            <FormGroup>
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
            </FormGroup>
          </div>
        </div>

        <div class="p-3">
          <div class="pb-1">
            <b>Message Status</b>
          </div>

          <div>
            <Select options={MessageStatusOption} onChange={setMessageStatus} />
          </div>
        </div>

        <div class="p-3">
          <div class="pb-1">
            <Button color="primary" type="submit" onSubmit={handleSubmit}>
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
      searchLogReport,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(LogReportForm);
