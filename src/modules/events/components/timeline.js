import TimelineItem from './timeline-item';
import 'react-dates/initialize';
import moment from "moment";
import { connect } from 'react-redux';
import { searchEvents } from '../action';
import { bindActionCreators } from 'redux';
import _ from "lodash";
import StickyBox from "react-sticky-box";
import DateBox from '../../../components/DateBox';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState } from 'react';

const limit = 15;

function TimeLine({ searchEvents, events, onEventSelected, filters }) {
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        searchEvents({ offset, limit, ...filters });
    }, [offset, filters]);

    useEffect(() => {
        setOffset(0);
    }, [filters]);


    const nextPage = (e) => {
        setOffset(events.rows.length);
    }

    const renderTimeLine = (data) => {
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
                            <TimelineItem onEventClick={onEventSelected} data={item} />
                        )
                    }
                </div>
            </div>
        )
    }

    return (
        <div className='timeline-container' id="scrollableDiv">
            {
                events.rows && events.rows.length ?
                    <InfiniteScroll
                        dataLength={events.rows.length} //This is important field to render the next data
                        next={(e) => nextPage(e)}
                        hasMore={events.hasMore}
                        loader={<h4>Loading...</h4>}
                        scrollableTarget="scrollableDiv"
                        endMessage={
                            <p style={{ textAlign: 'center' }}>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }
                    >
                        {renderTimeLine(events.rows)}
                    </InfiniteScroll> : "No data found"
            }
        </div>
    )
}

const mapStateToProps = ({ events }) => {
    return {
        events
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        searchEvents
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeLine);