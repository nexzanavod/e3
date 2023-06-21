import axios from 'axios';
import { GET_ALL_CUSTOMER_PRODUCTS,SEARCH_CUSTOMER_PRODUCTS } from './config';
const { REACT_APP_API_BASE_URL } = process.env;

export const getAllCustomerProducts = () => {
    return (dispatch) => {
        axios.get(`${REACT_APP_API_BASE_URL}/api/customerProducts/getAllCustomerProducts`) //change api url
            .then((response) => {
                dispatch({
                    type: GET_ALL_CUSTOMER_PRODUCTS,
                    payload: response.data
                })
            })
    }
}

export const insertCustomerProducts = (data) =>{
    return (dispatch) => {
        axios.post(`${REACT_APP_API_BASE_URL}/api/customerProducts`,data)
        .then((res) =>{
            dispatch(getAllCustomerProducts())
        })
    }
}

export const searchCustomerProducts = (params) => {
    params = {
        id: "",
        ...params
    };
    return (dispatch) => {
        axios.get(`${REACT_APP_API_BASE_URL}/api/customerProducts/searchCustomerProducts`, { params })
            .then((response) => {
                dispatch({
                    type: SEARCH_CUSTOMER_PRODUCTS,
                    payload: response.data,
                    params
                });
            })
    }
}
