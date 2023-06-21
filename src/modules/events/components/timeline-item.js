import React, { useState } from "react"
import { Button } from "reactstrap";
import _ from "lodash";
import moment from "moment";

export default function TimelineItem({ onEventClick, data: { time, event, payload,code } }) {
    const [isPayloadVisible, showPayload] = useState(false);


    return <div className="mb-3 px-3">
        <div className="d-flex justify-content-between">
            <div className="flex-grow-1">
                <small>{moment(time).format("hh:mm:ss")}</small><br />
                <h6 className="mb-0">{code}</h6>
                <b className="event-title" onClick={() => showPayload(!isPayloadVisible)} >{_.startCase(event)}</b>
            </div>
            <div>
                <Button onClick={() => onEventClick(event)} size="sm" color="link">Show More</Button>
            </div>
        </div>

        {isPayloadVisible ?
            <div>
                {Object.keys(payload).map((key) => <p className="mb-0"><span className="text-muted">{_.startCase(key)}</span> {payload[key]}</p>)}
            </div> : ""}
    </div>
}