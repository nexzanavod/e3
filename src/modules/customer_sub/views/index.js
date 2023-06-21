import { useEffect } from 'react'
import { Card, Row, Col, Nav, NavItem, NavLink, Input, TabContent, TabPane } from 'reactstrap'
import Page from '../../../components/Page'
import 'react-dates/initialize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Well from '../../../components/Well';
import CustomerProductsFilter from '../components/filter';
import Timeline from "../components/timeline";
import { getAllCustomerProducts, searchCustomerProducts } from '../action';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { getUser } from '../../user/actions';

function CustomerProduct({ searchEvents, getAllCustomerProducts, customerProducts, user, getUser, }) {
    const [filters, setFilters] = useState();
    const [activeTab, setActiveTab] = useState('all_events');
    const [selectedEvents, selectEvents] = useState([]);
    const history = useHistory();
    const object = JSON.parse(localStorage.getItem('auth'));
    const userId = object.id;

    useEffect(() => {
        getUser(userId);
    }, [getUser]);




    const actions = [
        {
            label: "Upload Customer Products",
            action: () => {
                history.push({
                    pathname: '/customer_products/bulkupload',
                })
            },
        }
    ];

    const renderTimeLine = (data) => {
        return data.map((row, index) =>
            <p class={`${row.event === "Sent Message" ? "from-them" : "from-me"} ${data[index + 1]?.event === row.event ? "no-tail" : ""}`}>
                {row.payload.message || row.event}
            </p>
        )
    }

    const addToEvents = (e) => {
        if (selectedEvents.indexOf(e) === -1) {
            selectEvents([...selectedEvents, e]);
        }
        setActiveTab(`event_${e}`);
    }

    const customersProducts = user?.permissions?.[0]?.customers_products?.view;

  



    return (
        <Page title="Customer Products"
        // actions={actions}
        >
            {customersProducts ? (
                <div>
                    <Row>
                        <Col md="4">
                            <Well bg={"bg-white"} title={"Search"} >
                                <CustomerProductsFilter className={"d-grid gap-3"} onChange={(e) => { setFilters(e) }} />
                            </Well>
                        </Col>
                        <Col md="8">
                            <Card className='p-3 h-auto' style={{ height: '30vh' }}>
                                <TabContent activeTab={activeTab}>
                                    <TabPane tabId="all_events">
                                        <Timeline filters={filters} onEventSelected={(e) => { addToEvents(e) }} onPageEnd={(e) => { console.log("onPageEnd", e) }} />
                                    </TabPane>
                                    {/* {
                                selectedEvents.map((event) =>
                                    <TabPane key={`event_${event}`} tabId={`event_${event}`}>
                                        <EventTab event={event} />
                                    </TabPane>)
                            } */}
                                </TabContent>
                            </Card>
                        </Col>
                    </Row>
                </div>
            ) : (
                <p>Access to this page is not granted</p>
            )}


        </Page>
    )
}
const mapStateToProps = (state) => {
    return {
        customerProducts: state.customerProducts,
        user: state.users.user,

    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getAllCustomerProducts,
        searchCustomerProducts,
        getUser,

    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerProduct);