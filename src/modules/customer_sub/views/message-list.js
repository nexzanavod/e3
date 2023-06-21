import { useEffect, useState } from 'react'
import { Button, Input } from 'reactstrap'
import 'react-dates/initialize';
import { connect } from 'react-redux';
import { searchEvents, sendReply, getCustomerEvent } from '../action';
import { bindActionCreators } from 'redux';
import StickyBox from "react-sticky-box";
import _ from "lodash";
import Swal from 'sweetalert2'

function MessageList({ searchEvents, getCustomerEvent, customerEvent, customerFilteredEvents=[], customerProfile, sendReply, onClick }) {
    const [replyMessage, setReplyMessage] = useState("");
    const [chatInputDisable, setChatInputDisable] = useState();

    // useEffect(() => {
    //     searchEvents({});
    // }, [searchEvents])

    const handleInput = (e) => {
        setReplyMessage(e.target.value);
    }

    const clearInput = () => {
        setReplyMessage("");
    }

    const sendReplyMessage = () => {
        const payload = {
            to: customerProfile.mobile,
            message: replyMessage,
        };
        sendReply(payload);
        clearInput();
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Message sent'
        });
        onClick();
    }

    const sortEventsByDate = (a,b) => {
        var dateA = new Date(a.date);
        var dateB = new Date(b.date);
        return dateB - dateA;
    }

    const renderTimeLine = (data) => {
        const sortedArray = _.sortBy(data, function(dateObj) {
            return new Date(dateObj.time);
          });

        return sortedArray.map((row, index) =>
        <p className={`${row.payload.messageType === "received" ? "from-them" : "from-me"} ${data[index + 1]?.event === row.event ? "" : "no-tail"}`}>
            {row.payload.message || row.event}
        </p>
        )
    }

    return (
        <div>
            <div className='message d-flex flex-column'>
                {customerFilteredEvents?.rows ? renderTimeLine(customerFilteredEvents?.rows) : customerFilteredEvents.data ? renderTimeLine(customerFilteredEvents.data) : ""}
            </div>
            <StickyBox offsetBottom={0}>
                <div className='pt-2 d-flex align-items-end'>
                    <Input rows="1" type='textarea' onChange={(e) => handleInput(e)} value={replyMessage}></Input>
                    <div className='ms-3'>
                        <Button onClick={sendReplyMessage}>Send</Button>
                    </div>
                </div>
            </StickyBox>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        searchEventsData: state.customers.searchEvents,
        customerEvent: state.customers.customerEvent,
        customerProfile: state.customers.customerProfile,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        searchEvents,
        sendReply,
        // getCustomerEvent,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);