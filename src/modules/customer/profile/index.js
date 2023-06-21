import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useParams } from 'react-router'
import Page from '../../../components/Page'
import { getCustomerById, getCustomerEvent } from '../action'
import Avatar from 'react-avatar';
import _ from 'lodash';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import ProfileContent from './components/profile-content';
import MessageList from '../../messages/view/message-list';
import TimeLine from '../../events/components/timeline';
import EventsFilter from '../../events/components/filter';
import EventPanel from './components/event-panel';

function CustomerProfile({ getCustomerById, customerProfile, getCustomerEvent, customerEvent }) {
   const { id } = useParams();
   const [activeTab, setActiveTab] = useState('1');
   const [selectedEvents, selectEvents] = useState([]);

  const customerEventData = {
    rows: customerEvent.data && customerEvent.data.filter((item) => {
      return item.event === "message";
    }),
  };

  useEffect(()=>{
    console.log("COVERSATION",customerEventData.rows);
  },[customerEventData])
  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
 }

   const addToEvents = (e) => {
      if (selectedEvents.indexOf(e) === -1) {
         selectEvents([...selectedEvents, e]);
      }
      setActiveTab(`event_${e}`);
   }
   const removeEventTab = (e) => {
      setActiveTab(`event_${e}`);
      if (selectedEvents.length === 0) {
         setActiveTab('1');
         toggle('1')
      } else {
         setActiveTab(`event_${selectedEvents[selectedEvents.length - 1]}`);
         toggle(`event_${selectedEvents[selectedEvents.length - 1]}`)
      }
      selectedEvents.splice(selectedEvents.indexOf(e), 1);
      selectEvents([...selectedEvents]);
      if (selectedEvents.length === 0) {
         setActiveTab('1');
         toggle('1')
      } else {
         setActiveTab(`event_${selectedEvents[selectedEvents.length - 1]}`);
         toggle(`event_${selectedEvents[selectedEvents.length - 1]}`)
      }
   }

   useEffect(() => {
      if (id) {
         getCustomerById(id)
         getCustomerEvent(id);
      }
   }, [id, getCustomerById, getCustomerEvent])

   return (
      <Page title="Customers">
         <Row>
            <Col md="3">
               <div className='d-flex align-items-center'>
                  <Avatar color='#207fff' round maxInitials={2} textSizeRatio={2} name={customerProfile ? _.find(customerProfile.name) : ""} size="100" />
                  <div className='ml-2'>
                     <h5>0 Points</h5>
                  </div>
               </div>
               <ProfileContent customerProfile={customerProfile} />
            </Col>
            <Col md="9">
               <EventPanel customerId={id} customerFilteredEvents={customerEventData} />
            </Col>
         </Row>
      </Page>
   )
}

const mapStateToProps = (state) => {
   return {
      customerProfile: state.customers.customerProfile,
      customerEvent: state.customers.customerEvent,
   }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getCustomerById,
      getCustomerEvent,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerProfile);
