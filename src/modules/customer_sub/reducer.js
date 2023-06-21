import { GET_ALL_CUSTOMER_PRODUCTS,SEARCH_CUSTOMER_PRODUCTS } from "./config";
import _ from "lodash";

const initialstate = {
    searchCustomerProducts:[]
}

const reducer = (state = {}, action) => {
    switch (action.type) {
        case SEARCH_CUSTOMER_PRODUCTS:
        case GET_ALL_CUSTOMER_PRODUCTS:
            const { offset, limit } = action.params;
            if (offset > 0) {
                state.rows = [...state.rows, ...action.payload];
                state.hasMore = action.payload.length >= limit;
                return _.cloneDeep(state);
            }
            return { rows: action.payload, hasMore: true };
        default:
            return state;
    }
}

export default reducer;