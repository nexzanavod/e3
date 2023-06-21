import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {CardBody, CardHeader, Col, Row } from 'reactstrap'
import {bindActionCreators} from 'redux';
import { getCustomersBySegment } from '../../segment/actions';
const template = require("string-placeholder");

function MessagePreview({value,segments,getCustomersBySegment,customersBySegment}) {
  const [potential,setPotential] = useState(0);
  const [customerData,setCustomerData] = useState();
  const [message,setMessage] = useState("");
  useEffect(() => {
    if (segments) {
      let count = 0;
      segments.forEach((dt) => {
        getCustomersBySegment(dt, (data) => {
          setCustomerData(data);
          console.log(data);
          count += data.length;
          setPotential(count);
        });
      });
    } else {
      setPotential(0);
    }
  }, [getCustomersBySegment, segments]);
  

  useEffect(() =>{
    // if(customerData){
      let message = template(value,
        // customerData[0]
        )
      setMessage(message);
    // }
  },[value,customerData])
  return (
    <CardBody>
          <CardHeader>Message Preview</CardHeader>
          <Row>
            <Col md="12">
              <div className='m-2 h-auto bg-white p-2'>
                <span className='text '>{message ? <pre className='wrapped-pre overflow-x-scroll'>{message}</pre> : "Content not available"}</span>
              </div>
            </Col>
          </Row>
          <Row>
            {/* <Col md="8">
              <div className='m-2 p-2 rounded text-right'>
                <strong className='text-muted small '>Potential Reach</strong>
                <h3 className='font-weight-normal'>{potential}</h3>
              </div>
            </Col> */}
            <Col md="4">
              <div className='m-2 p-2 rounded text-right'>
                <strong className='text-muted small '>Characters</strong>
                <h3 className='font-weight-normal'>{message ? message.length : "0"}</h3>
              </div>
            </Col>
          </Row>
    </CardBody>
  )
}

const mapStateToProps = (state) =>{ 
  return {
    customersBySegment:state.segments.customersBySegment
  }
}

const mapDispatchToProps = (dispatch) =>{
  return bindActionCreators({
    getCustomersBySegment
  },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(MessagePreview)