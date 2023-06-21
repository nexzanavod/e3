import axios from "axios";
import { GET_DASHBOARD_EVENTS,GET_DASHBOARD_CAMPAIGNS } from './config';
const {REACT_APP_API_BASE_URL} = process.env;

export const getDashboardEvents = (id, next) => {
    return (dispatch) => {
        axios.get(`${REACT_APP_API_BASE_URL}/api/events/getDashboardEvents`)
            .then((response) => {
                dispatch({
                    type: GET_DASHBOARD_EVENTS,
                    payload: response.data.data
                })
                 console.log("im here",response.data)
            })
    }
}

    export const getDashboardCampaigns = (id, next) => {
        return (dispatch) => {
            axios.get(`${REACT_APP_API_BASE_URL}/api/campaigns`)
                .then((response) => {
                    dispatch({
                        type: GET_DASHBOARD_CAMPAIGNS,
                        payload: response.data.data.rows
                    })
                     console.log("im here",response.data)
                })
        }
}
