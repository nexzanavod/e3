import { GET_CUSTOMERS_BY_SEGMENT, GET_CUSTOMERS_COUNT_BY_SEGMENT, GET_SEGMENTS, GET_SEGMENTS_BY_ID} from "./config";

const initialstate = {
    segments:[],
    segmentDetail:[],
    customersBySegment:[],
    customersCountBySegment:{},
}

const reducer = (state = initialstate,action) =>{
    switch(action.type){
        case GET_SEGMENTS:
            return {
                ...state,
                segments:action.payload
            }
        case GET_SEGMENTS_BY_ID:
            return {
                ...state,
                segmentDetail:action.payload
            }
        case GET_CUSTOMERS_BY_SEGMENT:
            return {
                ...state,
                customersBySegment:action.payload
            }
        case GET_CUSTOMERS_COUNT_BY_SEGMENT:
            return {
                ...state,
                customersCountBySegment:{...state.customersCountBySegment,[action.payload.id]:action.payload.count}
            }
        default:
            return state;
    }
}

export default reducer;