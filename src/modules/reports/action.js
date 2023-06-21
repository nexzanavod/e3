import axios from 'axios';
import { GET_SEARCH_LOG_REPORT,GET_SEARCH_SUMMARY_REPORT } from "./config";
const {REACT_APP_API_BASE_URL} = process.env;

export const searchLogReport = (data) =>{
    console.log("data",data)
    return (dispatch) =>{
        axios.get(`${REACT_APP_API_BASE_URL}/api/campaigns/log-report`,{params:data})
        .then((response) =>{
            dispatch({
                type:GET_SEARCH_LOG_REPORT,
                payload:response.data
            }) 
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}

export const searchSummaryReport = (data) =>{
    console.log("data",data)
    return (dispatch) =>{
        axios.get(`${REACT_APP_API_BASE_URL}/api/campaigns/summery-report`,{params:data})
        .then((response) =>{
            dispatch({
                type:GET_SEARCH_SUMMARY_REPORT,
                payload:response.data
            }) 
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}