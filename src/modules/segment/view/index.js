import React, { useState,useEffect } from 'react'
import { Card, CardBody } from 'reactstrap'
import Page from '../../../components/Page'
import CustomerView from '../../customer/components/customer-view';
import SegmentCreate from '../components/segment-create';
import SegmentView from '../components/segments-view'
import { useLocation } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { getUser } from '../../user/actions';



function Segment({user,getUser}) {
  const [selected, select] = useState();
  const {search} = useLocation();
  const {segment} = queryString.parse(search)

  const object = JSON.parse(localStorage.getItem('auth'));
  const userId = object.id;
  useEffect(() => {
    getUser(userId);
  }, [getUser]);



  const segmentsView = user?.permissions?.[0]?.segments?.view;
  const segmentsAdd = user?.permissions?.[0]?.segments?.add;
  

  return (
    <Page title="Segments">
    {segmentsView ? (
      <div className='d-flex'>
        <div className="me-3">
          <Card>
            <CardBody className='p-0'>
              <SegmentView selected={selected} onSelect={(e) => { select(e) }} />
            </CardBody>
          </Card>
        </div>
        {segmentsAdd ? (
          segment ? (
            <Card>
            <CardBody className='p-0'>
            <CustomerView />
            </CardBody>
          </Card>
          ) : (
            <div className='w-100'><SegmentCreate selected={selected} /></div>
          )
        ) : (
          <p>Access to this Segment view is not granted</p>
        )}
      </div>
    ) : (
      <p>Access to this page is not granted</p>
    )}
  </Page>
  )
}

const mapStateToProps = (state) => {
  return {
   user: state.users.user,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getUser,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Segment);