import { GET_CUSTOMER_SCHEMA, GET_EVENT_SCHEMA, GET_SCHEMA_DATA,GET_ALL_CUSTOMER_PRODUCTS_SCHEMA, GET_SCHEDULE_SCHEMA } from "./config";

const initialstate = {
    schema:[],
    customerSchema:[],
    eventSchema:[],
    customerProductSchema:[],
    scheduleSchema:[]
}

const reducer = (state = initialstate,action) =>{
    switch(action.type){
        case GET_SCHEMA_DATA:
            return {
                ...state,
                schema:action.payload
            }
        case GET_CUSTOMER_SCHEMA:
            return{
                ...state,
                customerSchema:action.payload
            }
        case GET_EVENT_SCHEMA:
            return{
                ...state,
                eventSchema:action.payload
            }
        case GET_ALL_CUSTOMER_PRODUCTS_SCHEMA:
            return {
                ...state,
                customerProductSchema:action.payload
            }
        case GET_SCHEDULE_SCHEMA:
            return {
                ...state,
                scheduleSchema:action.payload
            }
        default:
            return state;
    }
}

export default reducer;