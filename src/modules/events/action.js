import axios from 'axios';
import { GET_CUSTOMER_BY_ID, SEARCH_EVENTS, GET_ALL_EVENTS } from './config';
const { REACT_APP_API_BASE_URL } = process.env;


export const getCustomerById = (id, next) => {
    return (dispatch) => {
        axios.get(`${REACT_APP_API_BASE_URL}/api/customers/${id}`)
            .then((response) => {
                dispatch({
                    type: GET_CUSTOMER_BY_ID,
                    payload: response.data
                })
                // next(response.data)
            })
    }
}

export const searchEvents = (params) => {
    params = {
        id: "",
        ...params
    };
    return (dispatch) => {
        axios.get(`${REACT_APP_API_BASE_URL}/api/events/searchEvents`, { params })
            .then((response) => {
                dispatch({
                    type: SEARCH_EVENTS,
                    payload: response.data,
                    params
                });
            })
    }
}


// export const searchEvents = (eventParams, offSet, searchEventsData, next) => {
//     const LIMIT = 15;
//     offSet = offSet === undefined ? 0 : offSet;
//     return (dispatch) => {
//         axios.get(`${REACT_APP_API_BASE_URL}/api/events/searchEvents?limit=${LIMIT}`, { params: eventParams })
//             .then((response) => {
//                 let data = { "data": response.data, "page": { "total": 300, "limit": LIMIT, "offSet": offSet } };
//                 let dataset = [];
//                 const dataInitial = { "data": [], "page": { "total": 0, "limit": 0, "offset": 0 } };
//                 if (data && data.data) {
//                     if (offSet > 0) {
//                         let datasets = searchEventsData.data.concat(data.data);
//                         data.data = datasets;
//                         dataset = data;
//                     } else {
//                         dispatch({
//                             type: SEARCH_EVENTS,
//                             payload: dataInitial
//                         });
//                         dataset = data;
//                     }
//                 }
//                 dispatch({
//                     type: SEARCH_EVENTS,
//                     payload: dataset
//                 })
//                 if (typeof next === 'function')
//                     next(response.data);
//             })
//     }
// }

export const getEvents = (eventParams, next) => {
    console.log("getEvents", eventParams)
    return (dispatch) => {
        axios.get(`${REACT_APP_API_BASE_URL}/api/events/getAllEvents`, { params: eventParams })
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

export const getAllEvents = (id, next) => {
    return (dispatch) => {
        axios.get(`${REACT_APP_API_BASE_URL}/api/events?sort=-time`)
            .then((response) => {
                dispatch({
                    type: GET_ALL_EVENTS,
                    payload: response.data.rows
                })
            })
    }
}