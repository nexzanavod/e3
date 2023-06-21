import axios from 'axios';
import { GET_CUSTOMERS_BY_SEGMENT, GET_CUSTOMERS_COUNT_BY_SEGMENT, GET_SEGMENTS, GET_SEGMENTS_BY_ID, UPDATE_SEGMENT} from './config';
const {REACT_APP_API_BASE_URL} = process.env;


export const saveSegment = (data, next) => {
    console.log(data);
    if (data.id) {
        return updateSegment(data.id, data, next);
    } else {
        return addSegments(data, next);
    }
}
export const addSegments = (data, next) => {
    return (dispatch) => {
        axios.post(`${REACT_APP_API_BASE_URL}/api/segments`, data)
            .then(function (response) {
                dispatch(getSegments());
            })
            .catch(function (error) {
                console.log(error);
            }).finally(() => {
                next()
            });
    }
}

export const getSegmentById = (id) => {
    return (dispatch) => {
        axios.get(`${REACT_APP_API_BASE_URL}/api/segments/${id}`)
            .then((response) => {
                console.log("ACTIONS", response.data)
                dispatch({
                    type: GET_SEGMENTS_BY_ID,
                    payload: response.data
                })
            })
    }
}

export const updateSegment = (id, data, next) => {
    return (dispatch) => {
        axios.put(`${REACT_APP_API_BASE_URL}/api/segments/update/${id}`, data)
            .then((response) => {
                dispatch({
                    type: UPDATE_SEGMENT,
                    payload: response.data
                })
            }).finally(() => {
                dispatch(getSegments());
                next()
            });
    }
}

export const deleteSegment = (id) => {
    return (dispatch) => {
        axios.delete(`${REACT_APP_API_BASE_URL}/api/segments/${id}`)
            .then((response) => {
                dispatch(getSegments());
            });
    }
}

export const getSegments = () => {
    return (dispatch) => {
        axios.get(`${REACT_APP_API_BASE_URL}/api/segments`)
            .then((response) => {
                dispatch({
                    type: GET_SEGMENTS,
                    payload: response.data.rows
                })
            })
    }
}

export const getCustomersCountBySegment = (id) =>{
    return (dispatch) =>{
        axios.get(`${REACT_APP_API_BASE_URL}/api/segments/customers_count_by_segment/${id}`)
        .then((response) =>{
            dispatch({
                type:GET_CUSTOMERS_COUNT_BY_SEGMENT,
                payload:{id, count:response.data}
            })           
        })
    }
}

export const getCustomersBySegment = (id,page,pageSize,next) =>{
    return (dispatch) =>{
        axios.get(`${REACT_APP_API_BASE_URL}/api/segments/customers_by_segment/${id}?page=${page}&pageSize=${pageSize}`)
        .then((response) =>{
            dispatch({
                type:GET_CUSTOMERS_BY_SEGMENT,
                payload:response.data
            })
            if(typeof next == "function")
                next(response.data)
        })
    }
}

export const removeCustomerFromSegment = (params) =>{
    return (dispatch) =>{
        axios.post(`${REACT_APP_API_BASE_URL}/api/segments/remove_customer_from_segment`,params)
        .then((response) =>{
            dispatch(getSegments());
            if(params.segmentId)
                dispatch(getCustomersBySegment(params.segmentId))
        })
    }
}