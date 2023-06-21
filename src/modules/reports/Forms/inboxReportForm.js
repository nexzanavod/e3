import {
  Label,
  FormGroup,
  Input,
  Button,
} from "reactstrap";
import Select from "react-select";
// import { DateRangePicker } from "react-dates";

export default function InboxReportForm() {
  // const [focusedInput, setFocusedInput] = useState();
  // const [date, setDate] = useState([
  //   {
  //     startDate: "",
  //     endDate: "",
  //   },
  // ]);
  return (
    <div>
      <div class="p-3">
        <div class="pb-1">
          <b>Channel Type</b>
        </div>

        <FormGroup check>
          <Input type="checkbox" />
          <Label check>SMS</Label>
        </FormGroup>
        <FormGroup check>
          <Input type="checkbox" />
          <Label check>Viber</Label>
        </FormGroup>
        <FormGroup check>
          <Input type="checkbox" />
          <Label check>Whatssapp</Label>
        </FormGroup>
      </div>

      <div class="p-3">
        <div class="pb-1">
          <b>Date</b>
        </div>

        <div>
          {/* <DateRangePicker
                            startDate={0} // momentPropTypes.momentObj or null,
                            endDate={0} // momentPropTypes.momentObj or null,
                            onDatesChange={({ startDate, endDate }) => setDate({ startDate, endDate })} // PropTypes.func.isRequired,
                            focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                            onFocusChange={focusedInput => setFocusedInput(focusedInput)} // PropTypes.func.isRequired,
                            isOutsideRange={() => false}
                        /> */}
        </div>
      </div>

      <div class="p-3">
        <div class="pb-1">
          <b>User Account</b>
        </div>

        <div>
          <Select />
        </div>
      </div>
      <div class="p-3">
        <div class="pb-1">
          <b>Campaign</b>
        </div>

        <div>
          <Select />
        </div>
      </div>

      <div class="p-3">
        <div class="pb-1">
          <b>From</b>
        </div>

        <div>
          <Input />
        </div>
      </div>

      <div class="p-3">
        <div class="pb-1">
          <b>To</b>
        </div>

        <div>
          <Input />
        </div>
      </div>

      <div class="p-3">
        <div class="pb-1">
          <Button color="primary">Search</Button>
        </div>
      </div>
    </div>
  );
}
