import { ListGroupItem, Progress } from "reactstrap";

export default function EventProgressBar({ events: { _id, count }, maxCount }) {
  const percentage = (count / maxCount) * 100;

  return (
    <ListGroupItem>
      <div className="d-flex justify-content-between">
        <p className="mb-0">{_id}</p>
        <h6>{count}</h6>
      </div>
      <div className="mb-3">
        <Progress value={percentage} />
      </div>
    </ListGroupItem>
  );
}