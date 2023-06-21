import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import EventProgressBar from "./eventsProgressBar";
import { Card, CardBody, CardHeader, ListGroup } from "reactstrap";
import { getDashboardEvents } from "../action";

function EventsBar({ getDashboardEvents, dashboardEvents }) {
  const [maxCount, setMaxCount] = useState(0);

  useEffect(() => {
    getDashboardEvents();
  }, [getDashboardEvents]);

  useEffect(() => {
    calculateMaxCount();
  }, [dashboardEvents]);

  const calculateMaxCount = () => {
    let max = 0;
    dashboardEvents?.forEach((events) => {
      if (events.count > max) {
        max = events.count;
      }
    });
    setMaxCount(max);
  };

  return (
    <Card>
      <CardHeader>Trending Events</CardHeader>
      <CardBody>
        <ListGroup flush>
          {dashboardEvents?.map((events) => (
            <EventProgressBar events={events} maxCount={maxCount} key={events._id} />
          ))}
        </ListGroup>
      </CardBody>
    </Card>
  );
}

const mapStateToProps = (state) => {
  return {
    dashboardEvents: state.dashboard.dashboardEvents,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getDashboardEvents,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsBar);