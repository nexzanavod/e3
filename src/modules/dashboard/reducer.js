import {  GET_DASHBOARD_EVENTS,GET_DASHBOARD_CAMPAIGNS } from "./config";

const initialstate = {
    dashboardEvents:[],
    dashboardCampaigns:[],
}

const reducer = (state = initialstate,action) =>{
    switch(action.type){
        case GET_DASHBOARD_EVENTS:
            return {
                ...state,
                dashboardEvents:action.payload
            }

            case GET_DASHBOARD_CAMPAIGNS:
            return {
                ...state,
                dashboardCampaigns:action.payload
            }
        

        default:
            return state;
    }
}

export default reducer;