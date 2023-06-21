import { SEARCH_EVENTS, GET_ALL_EVENTS } from "./config";
import _ from "lodash";

const reducer = (state = {}, action) => {
    switch (action.type) {
        case SEARCH_EVENTS:
        case GET_ALL_EVENTS:
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