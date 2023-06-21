import 'react-dates/initialize';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Timeline from '../../../events/components/timeline';
import CustomerProductsTimeline from '../../../customer_sub/components/timeline';
import { Card, TabContent, TabPane, Nav, NavItem, NavLink, Button } from 'reactstrap';
import EventsFilter from '../../../events/components/filter';
import EventTab from '../../../events/components/tab';
import { useState } from 'react';
import classnames from 'classnames';
import MessageList from '../../../messages/view/message-list';
import CustomerProductsFilter from '../../../customer_sub/components/filter';

function Events({ customerId,customerFilteredEvents }) {
  const history = useHistory();
  const [filters, setFilters] = useState({ id: customerId });
  const [selectedEvents, selectEvents] = useState([]);
  const [activeTab, setActiveTab] = useState('all_events');

  const addToEvents = (e) => {
    if (selectedEvents.indexOf(e) === -1) {
      selectEvents([...selectedEvents, e]);
    }
    setActiveTab(`event_${e}`);
  }

  const removeEventTab = (e, tab) => {
    e.stopPropagation();
    setActiveTab('all_events');
    selectedEvents.splice(selectedEvents.indexOf(tab), 1);
    selectEvents([...selectedEvents]);
  }

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  }

  return (
    <div>
      <Nav className='bg-white shadow-sm' tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === 'all_events' })}
            style={{ cursor: 'pointer' }}
            onClick={() => { toggle('all_events'); }}
          >
            All Events
          </NavLink>

        </NavItem>
        {/* <NavItem>
          <NavLink
            className={classnames({ active: activeTab === 'conversations' })}
            style={{ cursor: 'pointer' }}
            onClick={() => { toggle('conversations'); }}
          >
            Conversations
          </NavLink>
        </NavItem> */}
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === 'policies' })}
            style={{ cursor: 'pointer' }}
            onClick={() => { toggle('policies'); }}
          >
            Policies
          </NavLink>
        </NavItem>
        {
          selectedEvents.map((event) => <NavItem>
            <NavLink
              className={classnames({ active: activeTab === `event_${event}` })}
              style={{ cursor: 'pointer' }}
              onClick={() => { toggle(`event_${event}`); }}
            >
              {event}
              <button color='outline-primary' className="ms-1 close" onClick={(e) => { removeEventTab(e, event) }}>
                <span aria-hidden="true">&times;</span>
              </button>
            </NavLink>
          </NavItem>)}
      </Nav>
      <div>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="all_events">
            <div className='bg-light p-3 pb-0 mb-3 rounded'>
              <EventsFilter inputClass={"mb-0"} className="d-flex gap-3 align-items-start" onChange={(e) => { setFilters({ ...e, id: customerId }) }} />
            </div>
            <Timeline filters={filters} onEventSelected={(e) => { addToEvents(e) }} onPageEnd={(e) => { console.log("onPageEnd", e) }} />
          </TabPane>
          {/* <TabPane tabId="conversations">
            <MessageList customerFilteredEvents={customerFilteredEvents}/>
          </TabPane> */}
          <TabPane tabId="policies">
            <div className='bg-light p-3 pb-0 mb-3 rounded'>
              <CustomerProductsFilter inputClass={"mb-0"} className="d-flex gap-3 align-items-start" onChange={(e) => { setFilters({ ...e, id: customerId }) }} />
            </div>
            <CustomerProductsTimeline filters={filters} onEventSelected={(e) => { addToEvents(e) }} onPageEnd={(e) => { console.log("onPageEnd", e) }} />
          </TabPane>
          {
            selectedEvents.map((event) =>
              <TabPane key={`event_${event}`} tabId={`event_${event}`}>
                <EventTab event={event} />
              </TabPane>)
          }
        </TabContent>
      </div>
    </div>
  )
}

const mapStateToProps = ({ events }) => {
  return {
    events
  }
}


export default connect(mapStateToProps, null)(Events);
