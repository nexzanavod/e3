import axios from "axios";
import { GET_AUTOMATION, GET_AUTOMATION_BY_ID } from "./config";
const {REACT_APP_API_BASE_URL} = process.env;

export const insertAutomation = (data) =>{
    return (dispatch) =>{
        axios.post(`${REACT_APP_API_BASE_URL}/api/automations`,data)
        .then((response) =>{
            dispatch(getAutomation());
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}

export const getAutomation = () =>{
    return (dispatch) =>{
        axios.get(`${REACT_APP_API_BASE_URL}/api/automations`)
        .then((response) =>{
            dispatch({
                type:GET_AUTOMATION,
                payload:response.data.rows
            })
        })
    }
}

export const deleteAutomation = (id) =>{
    return (dispatch) =>{
        axios.delete(`${REACT_APP_API_BASE_URL}/api/automations/${id}`)
        .then((response) =>{
            dispatch(getAutomation())
        })
    }
}

export const getAutomationById = (id) =>{
    return (dispatch) =>{
        axios.get(`${REACT_APP_API_BASE_URL}/api/automations/${id}`)
        .then((response) =>{
            dispatch({
                type:GET_AUTOMATION_BY_ID,
                payload:response.data
            })
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}

export const updateAutomation = (id,data) =>{
    return (dispatch) =>{
        axios.put(`${REACT_APP_API_BASE_URL}/api/automations/${id}`,data)
        .then((response) =>{
            dispatch(getAutomation())
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}