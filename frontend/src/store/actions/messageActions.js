import axios from 'axios';
import {GET_ALL_MESSAGES_FAIL,GET_ALL_MESSAGES_REQUEST,GET_ALL_MESSAGES_SUCCESS,CREATE_MESSAGE_FAIL,CREATE_MESSAGE_REQUEST,
    CREATE_MESSAGE_SUCCESS,DELETE_MESSAGE_FAIL,DELETE_MESSAGE_REQUEST,DELETE_MESSAGE_SUCCESS} from "../constants/messageConstants";

export const allMessages=(user)=>async(dispatch)=>{
    try{
        const {id,token}=user;
        dispatch({
            type:GET_ALL_MESSAGES_REQUEST
        })
        const config={
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
        const {data}=await axios.get("http://localhost:5000/api/users/"+id+"/messages",config);
        dispatch({
            type:GET_ALL_MESSAGES_SUCCESS,
            payload:data
        })
    }catch(error){
        dispatch({
            type:GET_ALL_MESSAGES_FAIL,
            payload:error.response&&error.response.data.error.message?error.response.data.error.message:error.message
        })
    }
}
export const addMessage=(user,text)=>async(dispatch)=>{
    try{
        const {id,token}=user;
        console.log("Idand tokens");
        dispatch({
            type:CREATE_MESSAGE_REQUEST
        })
        const config={
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token}`
            }
        }
        const {data}=await axios.post("http://localhost:5000/api/users/"+id+"/messages",{text},config);
        dispatch({
            type:CREATE_MESSAGE_SUCCESS,
            payload:data
        })
    }catch(error){
        dispatch({
            type:CREATE_MESSAGE_FAIL,
            payload:error.response&&error.response.data.error.message?error.response.data.error.message:error.message
        })
    }
}
export const removeMessage=(user,messageId)=>async(dispatch)=>{
    try{
        const {id,token}=user;
        dispatch({
            type:DELETE_MESSAGE_REQUEST
        })
        const config={
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
        const {data}=await axios.delete(`http://localhost:5000/api/users/${id}/messages/${messageId}`,config);
        dispatch({
            type:DELETE_MESSAGE_SUCCESS,
            payload:data
        })
    }catch(error){
        dispatch({
            type:DELETE_MESSAGE_FAIL,
            payload:error.response&&error.response.data.error.message?error.response.data.error.message:error.message
        })
    }
}