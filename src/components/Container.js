import React, { useRef } from 'react';
import { Card, CardHeader, CardBody, Button } from 'reactstrap';
import ReactToPrint from 'react-to-print';

class ComponentToPrint extends React.PureComponent {
  render() {
    return (
      <CardBody>
        {this.props.children}
      </CardBody>
    );
  }
}

const Container = (props) => {
  const {
    children, title = "", print
  } = props;

  const componentRef = useRef();

  return (
    <Card>
      <CardHeader className="py-2">
        <div className="d-flex justify-content-between align-items-center">
          <div>{title}</div>
          <div>
            {
              print ? <ReactToPrint
                trigger={() => <Button outline size="sm"><i className="fa fa-print"></i></Button>}
                content={() => componentRef.current}
              /> : ""
            }
          </div>
        </div>
      </CardHeader>
      <ComponentToPrint color="dark" ref={componentRef}>
        {children}
      </ComponentToPrint>
    </Card>
  );
}

export default Container;