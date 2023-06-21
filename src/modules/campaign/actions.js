import axios from "axios"
import { GET_CAMPAIGNS_COUNT_BY_SEGMENT, GET_CAMPAIGN_BY_ID, GET_CUSTOMER_CAMPAIGNS, GET_MHNG_ACCOUNT_LIST, SMS_SENDER_ID, VIBER_SENDER_ID, WHATSAPP_SENDER_ID } from "./config";
const { REACT_APP_API_BASE_URL } = process.env;

export const addCustomerCampaign = (data) => {
    return (dispatch) => {
        axios.post(`${REACT_APP_API_BASE_URL}/api/campaigns`, data)
            .then((response) => {
                dispatch(getCampaigns())
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export const getCampaigns = () => {
    return (dispatch) => {
        axios.get(`${REACT_APP_API_BASE_URL}/api/campaigns`)
            .then((response) => {
                dispatch({
                    type: GET_CUSTOMER_CAMPAIGNS,
                    payload: response.data.rows
                })
            })
    }
}

export const getCampaignsById = (id) => {
    return (dispatch) => {
        axios.get(`${REACT_APP_API_BASE_URL}/api/campaigns/${id}`)
            .then((response) => {
                dispatch({
                    type: GET_CAMPAIGN_BY_ID,
                    payload: response.data
                })
            })
    }
}

export const startCampaign = (id, typeObj, next) => {
    return (dispatch) => {
        axios.post(`${REACT_APP_API_BASE_URL}/api/campaigns/${id}/start`, typeObj)
            .then((response) => {
                dispatch({
                    type: GET_CUSTOMER_CAMPAIGNS,
                    payload: response.data.rows
                })
                if (typeof next === "function") {
                    next();
                }
            }).catch((err) => {
                if (typeof next === "function") {
                    next(err);
                }
            })
    }
}

export const stopCampaign = (id) => {
    return (dispatch) => {
        axios.post(`${REACT_APP_API_BASE_URL}/api/campaigns/${id}/stop`)
            .then((response) => {
                dispatch(getCampaigns())
            })
    }
}

export const pauseCampaign = (id) => {
    return (dispatch) => {
        axios.post(`${REACT_APP_API_BASE_URL}/api/campaigns/${id}/pause`)
            .then((response) => {
                dispatch(getCampaigns())
            })
    }
}

export const resumeCampaign = (id) => {
    return (dispatch) => {
        axios.post(`${REACT_APP_API_BASE_URL}/api/campaigns/${id}/resume`)
            .then((response) => {
                dispatch(getCampaigns())
            })
    }
}

export const deleteCampaign = (id) => {
    return (dispatch) => {
        axios.delete(`${REACT_APP_API_BASE_URL}/api/campaigns/${id}`)
            .then((response) => {
                dispatch(getCampaigns())
            })
    }
}

export const getCampaignsCountBySegment = (id) =>{
    return (dispatch) =>{
        axios.get(`${REACT_APP_API_BASE_URL}/api/campaigns/campaignCountBySegment?segmentId=${id}`)
        .then((response) =>{
            dispatch({
                type:GET_CAMPAIGNS_COUNT_BY_SEGMENT,
                payload:{id, count:response.data}
            })           
        })
    }
}

export const campaignActiveInactive = (data) =>{
    return (dispatch) =>{
        axios.get(`${REACT_APP_API_BASE_URL}/api/campaigns/campaignActiveInactive`, {params:data})
        .then((response) =>{
            dispatch(getCampaigns())           
        })
    }
}

export const getMhngAccountList = () =>{
    return (dispatch) =>{
        axios.get(`${REACT_APP_API_BASE_URL}/api/campaigns/mhngAccountList`)
        .then((response) =>{
            dispatch({
                type:GET_MHNG_ACCOUNT_LIST,
                payload:response.data
            })
        })
    }
}

export const getMhngSmsSenderIds = (params) =>{
    return (dispatch) =>{
        axios.get(`${REACT_APP_API_BASE_URL}/api/campaigns/getMhngSmsSenderIds`,{params:params})
        .then((response) =>{
            console.log("getMhngSmsSenderIds", response)
            dispatch({
                type:SMS_SENDER_ID,
                payload:response.data
            })
        })
    }
}

export const getMhngViberSenderIds = (params) =>{
    return (dispatch) =>{
        axios.get(`${REACT_APP_API_BASE_URL}/api/campaigns/getMhngViberSenderIds`,{params:params})
        .then((response) =>{
            dispatch({
                type:VIBER_SENDER_ID,
                payload:response.data
            })
        })
    }
}

export const getMhngWhatsAppSenderIds = (params) =>{
    return (dispatch) =>{
        axios.get(`${REACT_APP_API_BASE_URL}/api/campaigns/getMhngWhatsAppSenderIds`,{params:params})
        .then((response) =>{
            dispatch({
                type:WHATSAPP_SENDER_ID,
                payload:response.data
            })
        })
    }
}