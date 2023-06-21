import { createStore, applyMiddleware, compose } from 'redux';
import thunk from "redux-thunk";
import { combineReducers } from "redux";

import sampleData from "../modules/sample/reducer";
import customers from "../modules/customer/reducer";
import segments from "../modules/segment/reducer";
import campaigns from "../modules/campaign/reducer";
import automations from "../modules/automation/reducer";
import schema from "../modules/schema/reducer";
import auth from "../modules/auth/reducer";
import dashboard from "../modules/dashboard/reducer"
import event from "../modules/events/reducer";
import report from "../modules/reports/reducer"
import users from "../modules/user/reducer"
import customerProducts from "../modules/customer_sub/reducer"
import { reducer as toastr } from 'react-redux-toastr'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers({
        sampleData,
        customers:customers,
        customer:customers.customerProfile,
        customerEvent:customers.customerEvent,
        customerProducts:customerProducts,
        events:event,
        segments:segments,
        segment:segments.segmentDetail,
        customersBySegment:segments.customersBySegment,
        customersCountBySegment:segments.customersCountBySegment,
        campaignsCountBySegment:campaigns.campaignsCountBySegment,
        campaigns:campaigns,
        campaign:campaigns.campaign,
        automations:automations,
        schema:schema,
        customerSchema:schema.customerSchema,
        eventSchema:schema.eventSchema,
        dashboard:dashboard,
        report:report,
        users:users,
        auth,
        toastr,
        scheduleSchema:schema.scheduleSchema,
    }),
    composeEnhancers(
        applyMiddleware(
            thunk
        )
    )
);

export default store;
