import { Card } from "reactstrap";
import Page from "../../../components/Page";
import EventsBulkUpload from "./events-bulk-upload";

export default function Events() {
  return (
    <Page title="Manage Events">
      <Card>
        <EventsBulkUpload />
      </Card>
    </Page>
  );
}
