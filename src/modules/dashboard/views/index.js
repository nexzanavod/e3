import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Page from "../../../components/Page";
import { getAllCustomer } from "../../customer/action";
import { Row, Col } from "reactstrap";
import Count from "../components/count";
import EventsBar from "../components/eventsBar";
import OngoingCampainBar from "../components/ongoingCampainBar";
import loadingGif from "../../../assets/gif/loadingif.gif"; 
const INITIAL_PAGE = 1;
const INITIAL_PAGESIZE = 10

function Dashboard({ customerData, getAllCustomer }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        getAllCustomer(INITIAL_PAGE,INITIAL_PAGESIZE);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching customer data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [getAllCustomer]);

  return (
    <Page>
      <Row>
        <Col md="5">
          <Row className="mb-3">
            <Col>
              {customerData && customerData===0 ? (
               <div>
                  <img src={loadingGif} alt="Loading" />
               <br></br>
               <h4>Please wait, Customers are Updating...</h4>
             </div>
                
              ) : (
                <Count value={customerData?.toLocaleString()} label={"Customers"} />
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              <EventsBar />
            </Col>
          </Row>
        </Col>
        <Col md="7">
          <OngoingCampainBar />
        </Col>
      </Row>
    </Page>
  );
}

const mapStateToProps = (state) => {
  return {
    customerData: state.customers.customers?.data?.total,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getAllCustomer,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);