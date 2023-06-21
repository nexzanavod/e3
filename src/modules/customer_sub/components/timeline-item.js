import React, { useState } from "react";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import _ from "lodash";
import moment from "moment";

export default function TimelineItem({ onEventClick, data: { time, product, payload, nic } }) {
  const [isPayloadVisible, showPayload] = useState(false);

  return (
    <div className="mb-3 px-3 d-flex">
      <div className="card-container">
        <Card>
          <CardBody className="bg-light">
            <CardTitle className="mb-0">{product}</CardTitle>
            <CardText>{nic}</CardText>
            <Button onClick={() => showPayload(!isPayloadVisible)} size="sm" color="link">
              {isPayloadVisible ? "Hide Details" : "Show Details"}
            </Button>
          </CardBody>
        </Card>
      </div>

      {isPayloadVisible && (
        <div className="card-container">
          <Card>
            <CardBody className="bg-light">
              {Object.keys(payload).map((key) => (
                <p className="mb-0" key={key}>
                  <span className="text-muted">{_.startCase(key)}</span> : {payload[key]}
                </p>
              ))}
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
}