import axios from "axios";
import { GET_AUTOMATION, GET_AUTOMATION_BY_ID,GET_USER } from "./config";
const {REACT_APP_API_BASE_URL} = process.env;

export const saveUsers = (id,data) => {
    if(id){
        return updateUser(id,data);
    }else{
        return insertUser(data);
    }
}



export const insertUser = (data) =>{
    return (dispatch) =>{
        axios.post(`${REACT_APP_API_BASE_URL}/api/users/`,data)
        .then((response) =>{
            dispatch(getAutomation());  //change function name to getUSers
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}


export const updateUser = (id,data) =>{
    console.log("data",data)
    return (dispatch) =>{
        axios.put(`${REACT_APP_API_BASE_URL}/api/users/${id}`,data)
        .then((response) =>{
            dispatch(getAutomation());   // change function name to getUSers
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}

export const getAutomation = () =>{
    return (dispatch) =>{
        axios.get(`${REACT_APP_API_BASE_URL}/api/users`)
        .then((response) =>{
            dispatch({
                type:GET_AUTOMATION,
                payload:response.data
            })
        })
    }
}

export const deleteAutomation = (id) =>{
    return (dispatch) =>{
        axios.delete(`${REACT_APP_API_BASE_URL}/api/users/${id}`)
        .then((response) =>{
            dispatch(getAutomation())
        })
    }
}

export const getUserById = (id) =>{
    return (dispatch) =>{
        axios.get(`${REACT_APP_API_BASE_URL}/api/users/${id}`)
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
        console.log('THIS',id,data)
        axios.put(`${REACT_APP_API_BASE_URL}/api/users/${id}`,data)
        .then((response) =>{
            dispatch(getAutomation())
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}

export const getUser = (userId) =>{
    return (dispatch) =>{
        axios.get(`${REACT_APP_API_BASE_URL}/api/users/${userId}`)
        .then((response) =>{
            dispatch({
                type:GET_USER,
                payload:response.data
            })
        })

    }
}
