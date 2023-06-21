import { GET_AUTOMATION, GET_AUTOMATION_BY_ID } from "./config"

const initialstate = {
    automations:[],
    automation:[]
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
                automation:actions.payload
            }
        default:
            return state;
    }
}

export default reducer;