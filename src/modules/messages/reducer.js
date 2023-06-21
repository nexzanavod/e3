import { GET_ALL_CUSTOMERS, GET_CUSTOMER_BY_ID, SEARCH_EVENTS,GET_CUSTOMER_EVENT } from "./config";

const initialstate = {
    customers:[],
    customerProfile:[],
    searchEvents:[],
    customerEvent:[]
}

const reducer = (state = initialstate,action) =>{
    switch(action.type){
        case GET_ALL_CUSTOMERS:
            return {
                ...state,
                customers:action.payload
            }
        case GET_CUSTOMER_BY_ID:
            return {
                ...state,
                customerProfile:action.payload
            }
        case SEARCH_EVENTS:
            return {
                ...state,
                searchEvents:action.payload            }
        case GET_CUSTOMER_EVENT:
            return {
                ...state,
                customerEvent:action.payload            }

        default:
            return state;
    }
}

export default reducer;