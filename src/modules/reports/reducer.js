import { GET_SEARCH_LOG_REPORT,GET_SEARCH_SUMMARY_REPORT} from "./config";

const initialstate = {
    logReportData:[],
    summaryReportData:[]
}


const reducer = (state = initialstate,action) =>{
    switch(action.type){
        case GET_SEARCH_LOG_REPORT:
            return {
                ...state,
                logReportData:action.payload            
            }
            case GET_SEARCH_SUMMARY_REPORT:
            return {
                ...state,
                summaryReportData:action.payload            
            }


        default:
            return state;
    }
}

export default reducer;