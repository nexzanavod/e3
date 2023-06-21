import { Progress, Badge, ListGroupItem } from "reactstrap";

export default function ongoingCampainProgressBar({ Campaigns }) {

  console.log(Campaigns);

  let progressValue = 0;
  let progressColor = "";

  if (Campaigns.status === "STOPPED") {
    progressValue = 100;
    progressColor = "danger";
  } else if (Campaigns.status === "ONHOLD") {
    progressValue = 100;
    progressColor = "warning";
  } else if (Campaigns.status === "RUNNING") {
    progressValue = 100;
    progressColor = "success";
  }

  return (
    <ListGroupItem>
      <div className="d-flex justify-content-between align-items-start">
        <h6>{Campaigns.campaign_name}</h6>
        <Badge color="primary">
        <div className="message-text">
          
     
          
          {Campaigns.status}
          </div>
          
          </Badge>
      </div>
      <p><small>{Campaigns.content.message}</small></p>
      <div className="d-flex justify-content-between align-items-start">
        <Badge color="primary">
        <div className="message-text">
          SMS
          </div>
          </Badge>
        <div className="flex-grow-1 ms-1">
          <Progress multi>
            <Progress bar color={progressColor} value={progressValue} />
          </Progress>
        </div>
      </div>
    </ListGroupItem>
  );
}