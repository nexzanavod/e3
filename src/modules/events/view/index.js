import React, { useEffect } from 'react';
import Page from '../../../components/Page'
import 'react-dates/initialize';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Timeline from '../components/timeline';
import { Card, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import EventsFilter from '../components/filter';
import EventTab from '../components/tab';
import { useState } from 'react';
import classnames from 'classnames';
import Well from '../../../components/Well';
import { getUser } from '../../user/actions';
import { bindActionCreators } from 'redux';



function Events({  getUser,user}) {
    const history = useHistory();
    const [filters, setFilters] = useState();
    const [selectedEvents, selectEvents] = useState([]);
    const [activeTab, setActiveTab] = useState('all_events');

    const object = JSON.parse(localStorage.getItem('auth'));
    const userId = object.id;

    console.log(userId)

    useEffect(() => {
        getUser(userId);
      }, [getUser]);

      console.log("user",user)


    const eventAdd = user?.permissions?.[0]?.event?.add;
    const eventView = user?.permissions?.[0]?.event?.view;



    const actions = eventAdd ?
        [
            {
                label: "Upload Events",
                action: () => {
                    history.push({
                        pathname: '/event/bulkupload',
                    })
                },
            }]
        : [];

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

        <Page title="Events" 
     
            // actions={actions}
         
   
        
        >
            {eventView ? (
        <Row>
        <Col md="3">
            <Well bg={"bg-white"} title={"Search"} >
                <EventsFilter className={"d-grid gap-3"} onChange={(e) => { setFilters(e) }} />
            </Well>
            <Nav className='bg-white shadow-sm' vertical pills>
                {selectedEvents.length > 0 ?
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === 'all_events' })}
                            style={{ cursor: 'pointer' }}
                            onClick={() => { toggle('all_events'); }}
                        >
                            All Events
                        </NavLink>
                    </NavItem> : ""}
                {
                    selectedEvents.map((event) => <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === `event_${event}` })}
                            style={{ cursor: 'pointer' }}
                            onClick={() => { toggle(`event_${event}`); }}
                        >
                            {event}
                            <button type="button" class="close" aria-label="Close" onClick={(e) => { removeEventTab(e, event) }}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </NavLink>
                    </NavItem>)}
            </Nav>
        </Col>
        <Col md="9">
            <Card>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="all_events">
                        <Timeline filters={filters} onEventSelected={(e) => { addToEvents(e) }} onPageEnd={(e) => { console.log("onPageEnd", e) }} />
                    </TabPane>
                    {
                        selectedEvents.map((event) =>
                            <TabPane key={`event_${event}`} tabId={`event_${event}`}>
                                <EventTab event={event} />
                            </TabPane>)
                    }
                </TabContent>
            </Card>
        </Col>
    </Row>
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
       getUser 
      },
      dispatch,
    );
  }


export default connect(mapStateToProps, mapDispatchToProps)(Events);
