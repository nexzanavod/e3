import { GET_CAMPAIGNS_COUNT_BY_SEGMENT, GET_CAMPAIGN_BY_ID, GET_CUSTOMER_CAMPAIGNS, GET_MHNG_ACCOUNT_LIST, SMS_SENDER_ID, VIBER_SENDER_ID, WHATSAPP_SENDER_ID } from "./config";

const initialstate = {
    campaigns:[],
    campaign:[],
    campaignsCountBySegment:{},
    mhngAccountList:[],
    sms_sender_id:[],
    viber_sender_id:[],
    whatsapp_sender_id:[]
}

const reducer = (state = initialstate,action) =>{
    switch(action.type){
        case GET_CUSTOMER_CAMPAIGNS:
            return {
                ...state,
                campaigns:action.payload           
            }
        case GET_CAMPAIGN_BY_ID:
            return {
                ...state,
                campaign:action.payload
            }
        case GET_CAMPAIGNS_COUNT_BY_SEGMENT:
            return {
                ...state,
                campaignsCountBySegment:{...state.campaignsCountBySegment,[action.payload.id]:action.payload.count}
            }
        case GET_MHNG_ACCOUNT_LIST:
            return {
                ...state,
                mhngAccountList:action.payload.data
            }
        case SMS_SENDER_ID:
            return {
                ...state,
                sms_sender_id:action.payload.data.sender_ids
            }
        case VIBER_SENDER_ID:
            return {
                ...state,
                viber_sender_id:action.payload.data.viber_service_ids
            }
        case WHATSAPP_SENDER_ID:
            return {
                ...state,
                whatsapp_sender_id:action.payload.data.whatsapp_ids
            }
        default:
            return state;
    }
}

export default reducer;