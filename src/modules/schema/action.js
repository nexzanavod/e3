import axios from 'axios';
import {GET_CUSTOMER_SCHEMA, GET_EVENT_SCHEMA, GET_SCHEMA_DATA,GET_ALL_CUSTOMER_PRODUCTS_SCHEMA, GET_SCHEDULE_SCHEMA} from './config';
const {REACT_APP_API_BASE_URL} = process.env;

export const getSchema = () =>{
    return (dispatch) => {
        axios.get(`${REACT_APP_API_BASE_URL}/api/schema/schema`)
        .then((response) =>{
            dispatch({
                type:GET_SCHEMA_DATA,
                payload:response.data
            })
        })
    }
}

export const getCustomerSchema = () =>{
    return (dispatch)  => {
        axios.get(`${REACT_APP_API_BASE_URL}/api/schema/customerSchema`)
        .then((response) =>{
            dispatch({
                type:GET_CUSTOMER_SCHEMA,
                payload:response.data
            })
        })
    }
}

export const getEventSchema = () =>{
    return (dispatch)  => {
        axios.get(`${REACT_APP_API_BASE_URL}/api/schema/eventSchema`)
        .then((response) =>{
            dispatch({
                type:GET_EVENT_SCHEMA,
                payload:response.data
            })
        })
    }
}

export const getCustomerProductSchema = () =>{
    return (dispatch) => {
        axios.get(`${REACT_APP_API_BASE_URL}/api/schema/customerSubSchema`)
        .then((response) => {
            dispatch({
                type:GET_ALL_CUSTOMER_PRODUCTS_SCHEMA,
                payload:response.data
            })
        })
    }
}

export const getScheduleSchema = () =>{
    return (dispatch) => {
        axios.get(`${REACT_APP_API_BASE_URL}/api/schema/scheduleSchema`)
        .then((response) => {
            dispatch({
                type:GET_SCHEDULE_SCHEMA,
                payload:response.data
            })
        })
    }
}