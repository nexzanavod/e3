import 'react-dates/initialize';
import moment from "moment";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from "lodash";
import StickyBox from "react-sticky-box";
import DateBox from '../../../components/DateBox';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState } from 'react';
import { searchCustomerProducts } from '../action';
import { Card, CardBody, CardTitle, CardText, Button, Row, Col } from "reactstrap";

const limit = 20;

function TimeLine({ customerProducts, filters, searchCustomerProducts }) {
    const [offset, setOffset] = useState(0);
    const [showPayload, setShowPayload] = useState(null);

    useEffect(() => {
        searchCustomerProducts({ offset, limit, ...filters });
    }, [offset, filters]);

    useEffect(() => {
        setOffset(0);
    }, [filters]);

    const nextPage = (e) => {
        setOffset(customerProducts.rows.length);
    };

    const renderTimeLine = (data) => {
        const sorted = data.sort((a, b) => new Date(b.time) - new Date(a.time));
        const grouped = _.groupBy(sorted, (item) => moment(item.time).format("YYYY-MM-DD"));

        return Object.keys(grouped).map((date) => (
            <div style={{ display: "flex", alignItems: "flex-start" }} key={date}>
                <div style={{ padding: "13px" }}>
                    <StickyBox offsetTop={0} offsetBottom={0}>
                        <div style={{ width: 80 }}>
                            <DateBox date={date} />
                        </div>
                    </StickyBox>
                </div>

                <div className="">
                    <Row>
                        {grouped[date].slice(4).map((item, itemIndex) => (
                            <Col md={4} className="mb-3 px-3" key={itemIndex}>
                                <div className="card-container">
                                    <Card>
                                        <CardBody className="bg-light">
                                            <CardTitle className="mb-0">{item.product}</CardTitle>
                                            <CardText>{item.nic}</CardText>
                                            <Button onClick={() => setShowPayload(showPayload === itemIndex ? null : itemIndex)} size="sm" color="link">
                                                {showPayload === itemIndex ? "Hide Details" : "Show Details"}
                                            </Button>
                                        </CardBody>
                                    </Card>
                                </div>

                                {showPayload === itemIndex && (
                                    <div className="card-container">
                                        <Card>
                                            <CardBody className="bg-light">
                                                {Object.keys(item.payload).map((key) => (
                                                    <p className="mb-0" key={key}>
                                                        <span className="text-muted">{_.startCase(key)}</span> : {item.payload[key]}
                                                    </p>
                                                ))}
                                            </CardBody>
                                        </Card>
                                    </div>
                                )}
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
        ));
    };

    return (
        <div className="timeline-container" id="scrollableDiv">
            {customerProducts.rows && customerProducts.rows.length ? (
                <InfiniteScroll
                    dataLength={customerProducts.rows.length} //This is important field to render the next data
                    next={(e) => nextPage(e)}
                    hasMore={customerProducts.hasMore}
                    loader={<h4>Loading...</h4>}
                    scrollableTarget="scrollableDiv"
                    endMessage={
                        <p style={{ textAlign: "center" }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                >
                    {renderTimeLine(customerProducts.rows)}
                </InfiniteScroll>
            ) : (
                "No data found"
            )}
        </div>
    );
}

const mapStateToProps = (state) => {
    console.log("CUSTOMER PRODUCTS", state.customerProducts);
    return {
        customerProducts: state.customerProducts,
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            searchCustomerProducts,
        },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeLine);