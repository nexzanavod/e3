import { useEffect } from 'react'
import { Card, Row, Col, Nav, NavItem, NavLink, Input } from 'reactstrap'
import Page from '../../../components/Page'
import 'react-dates/initialize';
import { connect } from 'react-redux';
import { searchEvents, getCustomerEvent } from '../action';
import { bindActionCreators } from 'redux';
import StickyBox from "react-sticky-box";

function Timeline({ searchEvents, getCustomerEvent, customerEvent }) {

    useEffect(() => {

        getCustomerEvent();

    }, [getCustomerEvent])


    const renderTimeLine = (data) => {
        return data.map((row, index) =>
            <p class={`${row.event === "Sent Message" ? "from-them" : "from-me"} ${data[index + 1]?.event === row.event ? "no-tail" : ""}`}>
                {row.payload.message || row.event}
            </p>
        )
    }

    return (
        <Page title="Messages">
            <Row>
                <Col md="3">
                    <div className='mt-3'>
                        <Nav pills className="flex-column">
                            {["a", "b", "c"].map((a) => <NavItem>
                                <NavLink eventKey="first">Customer {a}</NavLink>
                            </NavItem>)}
                        </Nav>
                    </div>
                </Col>
                <Col md="9">
                    <Card className='p-3 '>
                        <div className='message d-flex flex-column'>
                            {customerEvent.rows ? renderTimeLine(customerEvent.rows) : ""}
                        </div>
                        <StickyBox offsetBottom={0}>
                            <div className='pt-2'>
                                <Input type='textarea'></Input>
                            </div>
                        </StickyBox>
                    </Card>
                </Col>
            </Row>
        </Page>
    )
}
const mapStateToProps = (state) => {
    return {
        customerEvent: state.customers.customerEvent,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        searchEvents,
        getCustomerEvent,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);