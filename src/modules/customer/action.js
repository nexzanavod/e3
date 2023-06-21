import axios from 'axios';
import { GET_ALL_CUSTOMERS, GET_CUSTOMER_BY_ID, SEARCH_EVENTS,GET_CUSTOMER_EVENT } from './config';
const { REACT_APP_API_BASE_URL } = process.env;

export const getAllCustomer = (page,pageSize,searchTerm) => {
    return (dispatch) => {
        axios.get(`${REACT_APP_API_BASE_URL}/api/customers?page=${page}&pageSize=${pageSize}&searchTerm=${searchTerm}`) //change api url
            .then((response) => {
                dispatch({
                    type: GET_ALL_CUSTOMERS,
                    payload: response
                })
            })
    }
}

export const getCustomerById = (id, next) => {
    return (dispatch) => {
        axios.get(`${REACT_APP_API_BASE_URL}/api/customers/${id}`)
            .then((response) => {
                dispatch({
                    type: GET_CUSTOMER_BY_ID,
                    payload: response.data
                })
                if(typeof next == "function")
                    next(response.data)


            })
    }
}

export const searchEvents = (eventParams, next) => {
    console.log(eventParams)
    return (dispatch) => {
        axios.get(`${REACT_APP_API_BASE_URL}/api/customers/searchEvents`, { params: eventParams })
            .then((response) => {
                if (next) {
                    next(response.data);
                } else {
                    dispatch({
                        type: SEARCH_EVENTS,
                        payload: response.data
                    })
                }
            })
    }
}

export const updateCustomers = (identify, data,basicSegmentId) => {
    console.log("ACTION", identify);
    return (dispatch) => {
        axios.put(`${REACT_APP_API_BASE_URL}/api/customers/update/${identify}`, data)
            .then((response) => {
                dispatch(getAllCustomer())
            })
    }
}

export const insertEvents = (data) => {
    return (dispatch) => {
        axios.post(`${REACT_APP_API_BASE_URL}/api/events`, data)
            .then((response) => {
                dispatch(getAllCustomer())
            })
    }
}

export const getCustomerEvent = (id, next) => {
    return (dispatch) => {
        axios.get(`${REACT_APP_API_BASE_URL}/api/customers/${id}/events`)
            .then((response) => {
                dispatch({
                    type: GET_CUSTOMER_EVENT,
                    payload: response.data
                })
                // next(response.data)
            })
    }
}