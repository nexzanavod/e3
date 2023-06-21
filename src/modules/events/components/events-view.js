import { useEffect, useState } from 'react'
import { Card, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'
import TimelineItem from '../view/timeline-item';
import 'react-dates/initialize';
import moment from "moment";
import { connect } from 'react-redux';
import { searchEvents, getAllEvents } from '../action';
import { getCustomerEvent } from '../../customer/action';
import { bindActionCreators } from 'redux';
import { useParams } from 'react-router';
import _ from "lodash";
import StickyBox from "react-sticky-box";
import EventTab from '../view/event-tab';
import DateBox from '../../../components/DateBox';
import classnames from 'classnames';
import EventsFilter from './events-filter';
import InfiniteScroll from 'react-infinite-scroll-component';
const LIMIT = 15;

function EventsView({searchEvents,getCustomerEvent,getAllEvents,searchEventsData,customerEvent,events,removeFilterTab,onChange,tab,onChangeAddToEvent}) {
    const { id } = useParams();
    const [data,setData] = useState([]);
    const [selectedEvents, selectEvents] = useState([]);
    const [activeTab, setActiveTab] = useState('1');
    const [offSet,setOffSet] = useState(0);
    const [hasMore,setHasMore] = useState(true);
    const [eventsParams,setEventsParams] = useState({});
    const [showFilter,setShowFilter] = useState(false);
    const [customerId,setCustomerId] =useState();
    const addToEvents = (e) => {
        if (selectedEvents.indexOf(e) === -1) {
            selectEvents([...selectedEvents, e]);
        }
        setActiveTab(`event_${e}`);
        if(typeof onChangeAddToEvent === 'function')
            onChangeAddToEvent(e)
    }

    const removeEventTab = (e) => {
        setActiveTab(`event_${e}`);
        if(selectedEvents.length === 0){
           setActiveTab('1');
           toggle('1')
        }else{
           setActiveTab(`event_${selectedEvents[selectedEvents.length - 1]}`);
           toggle(`event_${selectedEvents[selectedEvents.length - 1]}`)
        }
        selectedEvents.splice(selectedEvents.indexOf(e),1);
        selectEvents([...selectedEvents]);
        if(selectedEvents.length === 0){
           setActiveTab('1');
           toggle('1')
        }else{
           setActiveTab(`event_${selectedEvents[selectedEvents.length - 1]}`);
           toggle(`event_${selectedEvents[selectedEvents.length - 1]}`)
        }
    }

    useEffect(() =>{
        if(!selectedEvents){
            setActiveTab('1');
            alert("gkgkg");
        }
    },[selectedEvents])

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    useEffect(() =>{
        if(typeof onChange === 'function'){
            onChange(selectedEvents)
        }
    },[onChange,selectedEvents])

    useEffect(() => {
        if(tab){
            toggle(tab);
        }
    },[tab,toggle])

    useEffect(() => {
        let eventsParams = {
            id: id ? id : "",
            searchTerm: '',
            startDate: '',
            endDate: ''
        }
        if(id){
            searchEvents(eventsParams);
        }else{
            searchEvents(eventsParams);
        }
    }, [searchEvents,id])

    useEffect(() =>{
        if(id){
            setCustomerId(id)
            setData(searchEventsData.data)
        }else{
            setData(searchEventsData.data)
        }
    },[id,searchEventsData])

    const refresh = () =>{}
    const scrolled = () =>{}

    const loadMore = () => {
        // without filter
        if(!showFilter){
            var hasMore;
            if (searchEventsData.page.total > LIMIT) {
                if (offSet < searchEventsData.page.total) {
                    hasMore = true
                } else {
                    hasMore = false
                }
            } else {
                hasMore = false
            }
            setHasMore(hasMore)
            if (hasMore) {
                setOffSet(offSet + LIMIT);
                let eventsParams = {
                    id: customerId ? customerId :"",
                    searchTerm:'',
                    startDate:'',
                    endDate:'',
                }
                console.log("KG KG KG ",eventsParams)
                searchEvents(eventsParams,offSet,searchEventsData)
            }
        }else{
            // with filters
            if (searchEventsData.page.total > LIMIT) {
                if (offSet < searchEventsData.page.total) {
                    hasMore = true
                } else {
                    hasMore = false
                }
            } else {
                hasMore = false
            }
            setHasMore(hasMore)
            if (hasMore) {
                setOffSet(offSet + LIMIT);
                eventsParams.id = id;
                console.log("KG KG KG ",eventsParams)
                searchEvents(eventsParams,offSet,searchEventsData)
            }
        }
    }

    const renderTimeLine = (data) => {
        console.log("renderTimeLine",data)
        const sorted = data.sort((a, b) => (new Date(b.time) - new Date(a.time)));
        const grouped = _.groupBy(sorted, (item) => moment(item.time).format("YYYY-MM-DD"));
        return Object.keys(grouped).map((date) =>
            <div style={{ display: "flex", alignItems: "flex-start" }}>
                <StickyBox
                    offsetTop={0} offsetBottom={0}
                >
                    <div style={{ width: 80 }}>
                        <DateBox date={date} />
                    </div>
                </StickyBox>
                <div className='flex-grow-1'>
                    {
                        grouped[date].map((item) =>
                            <TimelineItem onEventClick={addToEvents} data={item} />
                        )
                    }
                </div>
            </div>
        )
    }

    return (
        <div>
            <Row>
                {!removeFilterTab ? (<Col md="3">
                    <EventsFilter onChange={(e) => {setEventsParams(e)}} onShowFilter={(e) => {setShowFilter(e)}}/>
                    <div className='mt-3'>
                        <Nav vertical pills>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: activeTab === '1' })}
                                    style={{cursor:'pointer'}}
                                    onClick={() => { toggle('1'); }}
                                >
                                    All Events
                                </NavLink>
                            </NavItem>
                            {
                                selectedEvents.map((event) => <NavItem>
                                    <NavLink
                                        className={classnames({ active: activeTab === `event_${event}` })}
                                        style={{cursor:'pointer'}}
                                        onClick={() => { toggle(`event_${event}`); }}
                                    >
                                        {event}
                                        <button type="button" class="close" aria-label="Close" onClick={() => {removeEventTab(event)}}>
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </NavLink>
                                </NavItem>)}
                        </Nav>
                    </div>
                </Col>) : ""}
                <Col md="9">
                    <Card>
                        <TabContent activeTab={activeTab}>
                            <TabPane tabId="1">
                                <div className='timeline-container' id="scrollableDiv"> 
                                {data ?
                                    <InfiniteScroll
                                        dataLength={data.length} //This is important field to render the next data
                                        hasMore={hasMore}
                                        loader={<h4>Loading...</h4>}
                                        onScroll={scrolled}
                                        next={loadMore}
                                        endMessage={
                                            <p style={{ textAlign: 'center' }}>
                                            <b>Yay! You have seen it all</b>
                                            </p>
                                        }
                                        // below props only if you need pull down functionality
                                        refreshFunction={refresh}
                                        scrollableTarget="scrollableDiv"
                                        pullDownToRefresh
                                        pullDownToRefreshContent={
                                            <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
                                        }
                                        releaseToRefreshContent={
                                            <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
                                        }
                                    >
                                        {renderTimeLine(data)}
                                    </InfiniteScroll> : ""}
                                </div>
                            </TabPane>
                            {
                                selectedEvents.map((event) =>
                                    <TabPane tabId={`event_${event}`}>
                                        <EventTab customerId={id} event={event} />
                                    </TabPane>)}
                        </TabContent>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        searchEventsData: state.customers.searchEvents,
        customerEvent: state.customers.customerEvent,
        events:state.events.events
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        searchEvents,
        getCustomerEvent,
        getAllEvents
    }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(EventsView);