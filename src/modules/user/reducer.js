import { GET_AUTOMATION, GET_AUTOMATION_BY_ID,GET_USER } from "./config"

const initialstate = {
    automations:[],
    user:[]
}

const reducer = (state=initialstate, actions) =>{
    switch(actions.type){
        case GET_AUTOMATION:
            return {
                ...state,
                automations:actions.payload
            }
        case GET_AUTOMATION_BY_ID:
            return {
                ...state,
                user:actions.payload
            }
        case GET_USER:
            return {
                ...state,
                user:actions.payload
                }
        default:
            return state;
    }
}

export default reducer;