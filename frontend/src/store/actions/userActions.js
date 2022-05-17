import {USER_LOGIN_FAIL,USER_LOGIN_REQUEST,SET_CURRENT_USER,USER_LOGOUT,USER_REGISTER_FAIL,USER_REGISTER_REQUEST} from "../constants/userConstants";
import axios from "axios";

export const login=(email,password)=>async(dispatch)=>{
    try{
       dispatch({
           type:USER_LOGIN_REQUEST
       })
       const config={
           headers:{
               'Content-Type':'application/json'
           }
       }
       const {data}=await axios.post("http://localhost:5000/api/auth/signin",{email,password},config);
       dispatch({
           type:SET_CURRENT_USER,
           payload:data
       })
       localStorage.setItem("userInfo",JSON.stringify(data))
    }catch(error){
        console.log("Error",error.response.data.error.message);
        dispatch({
            type:USER_LOGIN_FAIL,
            payload:error.response&&error.response.data.error.message?error.response.data.error.message:error.message
        })
    }
}
export const register=(username,email,password,profileImage)=>async(dispatch)=>{
    try{
       dispatch({
           type:USER_REGISTER_REQUEST
       })
       const config={
           headers:{
               'Content-Type':'application/json'
           }
       }
       const {data}=await axios.post("http://localhost:5000/api/auth/signup",{email,username,password,profileImage},config);
       dispatch({
           type:SET_CURRENT_USER,
           payload:data
       })
       localStorage.setItem("userInfo",JSON.stringify(data))
    }catch(error){
        dispatch({
            type:USER_REGISTER_FAIL,
            payload:error.response&&error.response.data.error.message?error.response.data.error.message:error.message
        })
    }
}

export const logout=async(dispatch)=>{
    localStorage.removeItem("userInfo");
    dispatch({
        type:USER_LOGOUT
    })
}